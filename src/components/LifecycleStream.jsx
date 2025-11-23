import { Circle, ArrowRight } from 'lucide-react';

const LifecycleStream = ({ alerts, onSelect }) => {
  
  const getSeverityStyle = (severity) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return 'text-white bg-red-600 border-red-700';
      case 'WARNING':
        return 'text-yellow-800 bg-yellow-300 border-yellow-400';
      case 'INFO':
        return 'text-blue-800 bg-blue-300 border-blue-400';
      default:
        return 'text-gray-800 bg-gray-300 border-gray-400';
    }
  };

  const getStatusColor = (status) => {
    return status === 'OPEN' || status === 'ESCALATED' ? 'fill-red-500 text-red-500' : 'fill-green-500 text-green-500';
  };

  return (
    <div className="bg-white border border-gray-300 shadow-sm h-[400px] flex flex-col">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
        <h3 className="font-bold text-gray-700 text-sm uppercase">Activity Stream</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {alerts.map(alert => (
          <div 
            key={alert._id} 
            onClick={() => onSelect(alert.alertId)} 
            className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer group transition-colors flex items-start gap-3"
          >
             <Circle size={8} className={`mt-1.5 ${getStatusColor(alert.status)}`} />
             
             <div className="flex-1">
               <div className="flex justify-between items-center mb-1">
                 <div className="flex items-center gap-2">
                   <span className="font-mono text-xs font-bold text-gray-700">{alert.driverId}</span>
                   
                   <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getSeverityStyle(alert.severity)}`}>
                     {alert.severity}
                   </span>
                 </div>
                 <span className="text-[10px] text-gray-400 font-mono">{new Date(alert.updatedAt).toLocaleTimeString()}</span>
               </div>
               
               <div className="text-sm">
                 <span className="font-medium text-gray-800">{alert.sourceType}</span>
                 <span className="mx-2 text-gray-300">|</span>
                 <span className={`text-xs font-bold uppercase ${alert.status === 'OPEN' ? 'text-red-600' : 'text-green-600'}`}>
                   {alert.status}
                 </span>
               </div>
             </div>
          </div>
        ))}
        {alerts.length === 0 && <div className="p-4 text-center text-gray-400 text-sm">No recent activity.</div>}
      </div>
    </div>
  );
};

export default LifecycleStream;