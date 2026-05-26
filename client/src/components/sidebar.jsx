function Sidebar({
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="w-64 min-h-screen bg-[#0f172a] text-white p-6 flex flex-col justify-between shadow-2xl">

      <div>
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-wide">
            TaskFlow
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Team Management System
          </p>
        </div>

        <div className="flex flex-col gap-3">

          <button
            onClick={() =>
              setCurrentPage("dashboard")
            }
            className={`px-5 py-4 rounded-2xl text-left font-semibold transition ${
              currentPage === "dashboard"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              setCurrentPage("tasks")
            }
            className={`px-5 py-4 rounded-2xl text-left font-semibold transition ${
              currentPage === "tasks"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Tasks
          </button>

          <button
            onClick={() =>
              setCurrentPage("projects")
            }
            className={`px-5 py-4 rounded-2xl text-left font-semibold transition ${
              currentPage === "projects"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Projects
          </button>

          <button
            onClick={() =>
              setCurrentPage("team")
            }
            className={`px-5 py-4 rounded-2xl text-left font-semibold transition ${
              currentPage === "team"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Team
          </button>

          <button
            onClick={() =>
              setCurrentPage("analytics")
            }
            className={`px-5 py-4 rounded-2xl text-left font-semibold transition ${
              currentPage === "analytics"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="bg-slate-800 p-5 rounded-2xl">
        <p className="text-sm text-slate-400">
          Logged in as
        </p>

        <h3 className="font-bold text-lg mt-1">
          {localStorage.getItem("role") || "Member"}
        </h3>
      </div>
    </div>
  );
}

export default Sidebar;