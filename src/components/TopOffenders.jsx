const TopOffenders = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase">
        Top Offenders
      </h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 text-left">Driver</th>
            <th className="py-2 text-left">Driver Name</th>
            <th className="py-2 text-left">Risk Score</th>

          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d._id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-2 font-medium">{d.driverId}</td>
              <td className="py-2 font-medium">{d.name}</td>
              <td className="py-2">
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                  {d.activeAlertCount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopOffenders;
