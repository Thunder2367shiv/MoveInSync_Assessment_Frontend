import { useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa';

const AutoClosedLog = ({ logs, onSelect }) => {
  const [filter, setFilter] = useState("24h");

  const filtered = logs.filter((log) => {
    const time = new Date(log.updatedAt).getTime();
    const limit = filter === "24h" ? 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000;
    return Date.now() - time < limit;
  });

  return (
    <div className="bg-white border rounded p-4 h-[400px] flex flex-col">
      
      <div className="flex justify-between items-center mb-3 pb-2 border-b">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <FaCheckDouble className="text-green-600" />
          Resolution Log
        </h3>

        <div className="flex text-xs">
          <button
            onClick={() => setFilter("24h")}
            className={`px-2 py-1 border rounded-l ${
              filter === "24h" ? "bg-gray-200" : "bg-white"
            }`}
          >
            24H
          </button>

          <button
            onClick={() => setFilter("7d")}
            className={`px-2 py-1 border rounded-r ${
              filter === "7d" ? "bg-gray-200" : "bg-white"
            }`}
          >
            7D
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {filtered.map((log) => (
          <div
            key={log._id}
            onClick={() => onSelect(log.alertId)}
            className={`p-2 border rounded cursor-pointer text-xs ${
              log.status === "RESOLVED"
                ? "bg-blue-50 border-blue-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            <div className="flex justify-between mb-1">
              <span>{log.driverId}</span>
              <span
                className={`font-semibold ${
                  log.status === "RESOLVED" ? "text-blue-700" : "text-green-700"
                }`}
              >
                {log.status}
              </span>
            </div>

            <div className="flex justify-between text-[10px] text-gray-600">
              <span>{log.sourceType}</span>
              <span>{new Date(log.updatedAt).toLocaleTimeString()}</span>
            </div>

            <p className="text-[10px] mt-1 italic text-gray-500">
              {log.autoCloseReason}
            </p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-10">
            No resolutions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AutoClosedLog;
