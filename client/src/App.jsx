import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] =
  useState("Medium");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedProject, setSelectedProject] =
    useState("");

  const [assignedUser, setAssignedUser] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState("dashboard");

    const [search, setSearch] = useState("");
const [filterStatus, setFilterStatus] =
  useState("All");

  const token = localStorage.getItem("token");
  
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchDashboard();
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "https://team-task-manager-unqk.onrender.com/api/dashboard",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://team-task-manager-unqk.onrender.com/api/tasks",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://team-task-manager-unqk.onrender.com/api/projects",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data);

      if (response.data.length > 0) {
        setSelectedProject(
          response.data[0]._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://team-task-manager-unqk.onrender.com/api/users",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);

      if (response.data.length > 0) {
        setAssignedUser(
          response.data[0]._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        "https://team-task-manager-unqk.onrender.com/api/tasks",
        {
          title,
          description,
          dueDate,
          priority,
          project: selectedProject,
          assignedTo: assignedUser,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      fetchTasks();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (
    taskId,
    status
  ) => {
    try {
      await axios.put(
        `https://team-task-manager-unqk.onrender.com/api/tasks/${taskId}`,
        { status },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
      "https://team-task-manager-unqk.onrender.com/api/tasks/${taskId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
      fetchDashboard();
    } catch (error) {
      console.log(error);
    }
  };
  const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    filterStatus === "All"
      ? true
      : task.status === filterStatus;

  return matchesSearch && matchesStatus;
});

  if (!token) {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    );
  }

  const user = JSON.parse(
  localStorage.getItem("user")
);

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100">

      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {currentPage === "dashboard" && (
            <DashboardCards dashboard={dashboard} />
          )}

          {currentPage === "tasks" && (
            <>
              {user?.role === "Admin" && (
  <div className="mt-10">
    <TaskForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      priority={priority}
      setPriority={setPriority}
      projects={projects}
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      users={users}
      assignedUser={assignedUser}
      setAssignedUser={setAssignedUser}
      createTask={createTask}
      dueDate={dueDate}
setDueDate={setDueDate}
    />
  </div>
)}

              <div className="mt-12">

                <div className="flex items-center justify-between mb-8">

                  <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                      Tasks
                    </h1>

                    <p className="text-gray-500 mt-2">
                      Manage and track all tasks
                    </p>
                  </div>

                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">

  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="border border-gray-300 p-4 rounded-2xl w-full md:w-[350px]"
  />

  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
    className="border border-gray-300 p-4 rounded-2xl w-full md:w-[220px]"
  >
    <option>All</option>
    <option>To Do</option>
    <option>In Progress</option>
    <option>Done</option>
  </select>

</div>

                <div className="grid gap-8">

                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask}
                    />
                  ))}

                </div>
              </div>
            </>
          )}

          {currentPage === "projects" && (
            <div className="mt-12">

              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Projects
              </h1>

              <div className="grid md:grid-cols-2 gap-6">

                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
                  >
                    <h2 className="text-2xl font-bold text-indigo-700">
                      {project.name}
                    </h2>

                    <p className="text-gray-500 mt-3">
                      Active project workspace
                    </p>
                  </div>
                ))}

              </div>
            </div>
          )}

          {currentPage === "team" && (
            <div className="mt-12">

              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Team Members
              </h1>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-5">
                      {user.name?.charAt(0)}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {user.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Team Member
                    </p>
                  </div>
                ))}

              </div>
            </div>
          )}
      

          {currentPage === "analytics" && (
            <div className="mt-12">

              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Analytics
              </h1>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <p className="text-gray-500">
                    Completion Rate
                  </p>

                  <h2 className="text-5xl font-bold text-green-600 mt-4">
                    {dashboard.totalTasks > 0
                      ? Math.round(
                          (dashboard.doneTasks /
                            dashboard.totalTasks) *
                            100
                        )
                      : 0}
                    %
                  </h2>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <p className="text-gray-500">
                    Pending Tasks
                  </p>

                  <h2 className="text-5xl font-bold text-yellow-500 mt-4">
                    {dashboard.todoTasks}
                  </h2>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg">
                  <p className="text-gray-500">
                    Overdue Tasks
                  </p>

                  <h2 className="text-5xl font-bold text-red-500 mt-4">
                    {dashboard.overdueTasks}
                  </h2>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;