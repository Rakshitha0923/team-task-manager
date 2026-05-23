import User from "../models/User.js";
import Project from "../models/Project.js";

// create project
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      admin: req.user.id,
      members: [req.user.id],
    });
    await User.findByIdAndUpdate(req.user.id, {
  role: "Admin",
});

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// get all projects of logged in user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("members", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // only admin can add members
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only admin can add members",
      });
    }

    // avoid duplicates
    if (project.members.includes(userId)) {
      return res.status(400).json({
        message: "User already member",
      });
    }

    project.members.push(userId);

    await project.save();

    res.status(200).json({
      message: "Member added successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // only admin
    if (project.admin.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only admin can remove members",
      });
    }

    project.members = project.members.filter(
      (member) => member.toString() !== userId
    );

    await project.save();

    res.status(200).json({
      message: "Member removed successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};