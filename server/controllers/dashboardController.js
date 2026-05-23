import Task from "../models/Task.js";

export const getDashboardData = async (req, res) => {
  try {
    // total tasks
    const totalTasks = await Task.countDocuments();

    // tasks by status
    const todoTasks = await Task.countDocuments({
      status: "To Do",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const doneTasks = await Task.countDocuments({
      status: "Done",
    });

    // overdue tasks
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });

    // tasks per user
    const tasksPerUser = await Task.aggregate([
      {
        $group: {
          _id: "$assignedTo",
          totalTasks: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      overdueTasks,
      tasksPerUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};