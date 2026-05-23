import { useState } from "react";
const user = JSON.parse(
  localStorage.getItem("user")
);
function TaskCard({
  task,
  updateTaskStatus,
  deleteTask,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [editedTitle, setEditedTitle] =
    useState(task.title);

  const [
    editedDescription,
    setEditedDescription,
  ] = useState(task.description);

  const saveEdit = () => {
    task.title = editedTitle;
    task.description = editedDescription;

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="flex-1">

          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) =>
                  setEditedTitle(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-3 rounded-xl mb-4"
              />

              <textarea
                value={editedDescription}
                onChange={(e) =>
                  setEditedDescription(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-3 rounded-xl"
                rows="4"
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                {task.title}
              </h2>

              <p className="text-gray-500 mt-3">
                {task.description}
              </p>
            </>
          )}

          <p className="text-sm text-red-500 mt-2 font-medium">
  Due: {new Date(task.dueDate).toLocaleDateString()}
</p>

          <div className="flex flex-wrap gap-3 mt-5">

            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              {task.priority}
            </span>

            <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold">
              {task.project?.name}
            </span>

            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              {task.assignedTo?.name}
            </span>

          </div>
        </div>

        <div className="flex flex-wrap gap-3">

         <div className="flex gap-2">

  <button
    onClick={() =>
      updateTaskStatus(task._id, "To Do")
    }
    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
      task.status === "To Do"
        ? "bg-blue-600 text-white"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    To Do
  </button>

  <button
    onClick={() =>
      updateTaskStatus(task._id, "In Progress")
    }
    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
      task.status === "In Progress"
        ? "bg-yellow-500 text-white"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    In Progress
  </button>

  <button
    onClick={() =>
      updateTaskStatus(task._id, "Done")
    }
    className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
      task.status === "Done"
        ? "bg-green-600 text-white"
        : "bg-green-100 text-green-700"
    }`}
  >
    Done
  </button>

</div>

          {user?.role === "Admin" && (
  <>
    {isEditing ? (
      <button
        onClick={saveEdit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() =>
          setIsEditing(true)
        }
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold"
      >
        Edit
      </button>
    )}

    <button
      onClick={() =>
        deleteTask(task._id)
      }
      className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold"
    >
      Delete
    </button>
  </>
)}
              

        </div>
      </div>
    </div>
  );
}

export default TaskCard;