import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHistory, FaCar, FaHashtag, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const AlertModal = ({ alertId, onClose, onUpdate }) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(alertId) axios.get(`http://localhost:4000/api/alerts/${alertId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setData(res.data.data));
  }, [alertId]);

  const resolve = async () => {
    if(!confirm("Manually resolve this alert?")) return;
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:4000/api/alerts/${alertId}/resolve`, {}, { headers: { Authorization: `Bearer ${token}` } });
    onUpdate(); onClose();
  };

  if (!alertId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-[500px] max-w-full overflow-hidden border border-gray-200">
        
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
           <h2 className="font-bold font-mono text-lg tracking-wide flex items-center gap-2">
             <FaHashtag className="text-slate-400"/> DETAILS
           </h2>
           <button onClick={onClose} className="text-2xl leading-none hover:text-red-400 transition">&times;</button>
        </div>

        {data ? (
          <div className="p-6">
            
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
               <div>
                 <p className="text-xs text-gray-500 font-bold uppercase mb-1">Alert Type</p>
                 <h1 className="text-2xl font-bold text-blue-600">{data.sourceType}</h1>
               </div>
               <div className="text-right">
                 <p className="text-xs text-gray-500 font-bold uppercase mb-1">Driver ID</p>
                 <p className="font-mono font-bold text-lg text-gray-800 bg-gray-100 px-2 rounded">{data.driverId}</p>
               </div>
            </div>

            <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                <FaHistory /> Lifecycle Timeline
              </h3>
              
              <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:h-full before:w-[2px] before:bg-slate-200">
                
                <div className="relative flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500 z-10 mt-1 ring-4 ring-white"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Alert Opened</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {new Date(data.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {data.severity === 'CRITICAL' && (
                  <div className="relative flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 z-10 mt-1 ring-4 ring-white"></div>
                    <div>
                      <p className="text-sm font-bold text-red-700">Escalated to Critical</p>
                      <p className="text-xs text-slate-500">Triggered by Rule Engine</p>
                    </div>
                  </div>
                )}

                <div className="relative flex items-start gap-3">
                  <div className={`w-4 h-4 rounded-full z-10 mt-1 ring-4 ring-white ${data.status === 'OPEN' ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Current Status: <span className="uppercase">{data.status}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {new Date(data.updatedAt).toLocaleString()} 
                      {data.status !== 'OPEN' && (
                        <span className="ml-2 text-slate-400">
                          (Duration: {Math.round((new Date(data.updatedAt) - new Date(data.createdAt)) / 60000)} mins)
                        </span>
                      )}
                    </p>
                    {data.autoCloseReason && (
                      <p className="text-xs text-green-700 mt-1 bg-green-50 p-1 rounded border border-green-100 inline-block">
                        Reason: {data.autoCloseReason}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-400 font-bold uppercase mb-2">Technical Metadata</p>
              <div className="bg-slate-900 text-slate-300 p-3 rounded text-xs font-mono border border-slate-700 overflow-x-auto">
                 <pre>{JSON.stringify(data.metadata, null, 2)}</pre>
              </div>
            </div>

            {(data.status === 'OPEN' || data.status === 'ESCALATED') && (
               <button onClick={resolve} className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition shadow-sm uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                 <FaExclamationCircle /> Mark as Resolved
               </button>
            )}
          </div>
        ) : <div className="p-12 text-center text-gray-400">Loading Details...</div>}
      </div>
    </div>
  );
};

export default AlertModal;