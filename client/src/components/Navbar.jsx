function Navbar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shadow-sm">

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Welcome back, manage your tasks efficiently
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          
        </div>

        <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-xl"
>
  Logout
</button>

        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          T
        </div>
      </div>
    </div>
  );
}

export default Navbar;