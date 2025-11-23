const StatCard = ({ title, count, color, icon: Icon }) => {
  const colors = {
    red: "border-red-500 text-red-600 bg-red-50",
    yellow: "border-yellow-500 text-yellow-600 bg-yellow-50",
    blue: "border-blue-500 text-blue-600 bg-blue-50",
    green: "border-green-500 text-green-600 bg-green-50",
  };

  return (
    <div
      className={`p-5 rounded-lg shadow-sm border-l-4 flex items-center justify-between ${colors[color]}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase text-gray-600">{title}</p>
        <p className="text-3xl font-bold mt-1">{count}</p>
      </div>

      {Icon && (
        <div className="p-3 rounded-full bg-white shadow-sm">
          <Icon className={`text-2xl ${colors[color].split(" ")[1]}`} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
