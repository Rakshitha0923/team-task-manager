function DashboardCards({ dashboard }) {
  const cards = [
    {
      title: "Total Tasks",
      value: dashboard.totalTasks,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Completed",
      value: dashboard.doneTasks,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Pending",
      value: dashboard.todoTasks,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Overdue",
      value: dashboard.overdueTasks || 0,
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color} text-white p-7 rounded-3xl shadow-xl hover:scale-[1.03] transition duration-300`}
        >
          <p className="text-lg opacity-90">
            {card.title}
          </p>

          <h1 className="text-5xl font-extrabold mt-5">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;