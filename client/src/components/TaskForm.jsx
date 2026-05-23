function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  projects,
  selectedProject,
  setSelectedProject,
  users,
  assignedUser,
  setAssignedUser,
  createTask,
  dueDate,
setDueDate,
}) {
  return (
  <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8">

    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Create New Task
      </h2>

      <p className="text-gray-500 mt-2">
        Organize and assign tasks to your team
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      {/* LEFT SIDE */}
      <div className="flex flex-col gap-5">

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Task Title
          </label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Project
          </label>

          <select
            value={selectedProject}
            onChange={(e) =>
              setSelectedProject(e.target.value)
            }
            className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Assign User
          </label>

          <select
            value={assignedUser}
            onChange={(e) =>
              setAssignedUser(e.target.value)
            }
            className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-5">

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Task Description
          </label>

          <textarea
            placeholder="Describe the task..."
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows="5"
            className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
  <label className="text-sm font-semibold text-gray-600">
    Due Date
  </label>

  <input
    type="date"
    value={dueDate}
    onChange={(e) =>
      setDueDate(e.target.value)
    }
    className="mt-2 w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
  />
</div>

      </div>

    </div>

    <button
      onClick={createTask}
      className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition duration-300"
    >
      Create Task
    </button>

  </div>
);
}

export default TaskForm;