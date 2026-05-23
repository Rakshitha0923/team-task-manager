import Task from "../models/Task.js";

// create task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      project,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get tasks
export const getTasks = async (req, res) => {
  try {
    let tasks;

if (req.user.role === "Admin") {
  tasks = await Task.find()
    .populate("project", "name")
    .populate("assignedTo", "name email");
} else {
  tasks = await Task.find({
    assignedTo: req.user.id,
  })
    .populate("project", "name")
    .populate("assignedTo", "name email");
}

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // member can update only assigned task
    if (
      req.user.role !== "Admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "You can update only your assigned tasks",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // only admin can delete
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        message: "Only admin can delete tasks",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
