import { useEffect, useState } from 'react';
import axios from 'axios';

import StatCard from '../components/StatCard';
import TopOffenders from '../components/TopOffenders';
import TrendChart from '../components/TrendChart';
import AlertModal from '../components/AlertModal';
import AutoClosedLog from '../components/AutoClosedLog';
import LifecycleStream from '../components/LifecycleStream';

const Dashboard = () => {
  const [data, setData] = useState({ stats: {}, top: [], history: [], closed: [], stream: [] });
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [range, setRange] = useState('7d'); 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const base = 'http://localhost:4000/api';
      
      const [s, t, h, c, r] = await Promise.all([
        axios.get(`${base}/dashboard/stats`, { headers }),
        axios.get(`${base}/dashboard/top-offenders`, { headers }),
        axios.get(`${base}/dashboard/history?range=${range}`, { headers }),
        axios.get(`${base}/dashboard/auto-closed`, { headers }),
        axios.get(`${base}/alerts/recent`, { headers })
      ]);

      setData({ 
        stats: s.data.data || {}, 
        top: t.data.data || [], 
        history: h.data.data || [], 
        closed: c.data.data || [], 
        stream: r.data.data || [] 
      });
      setLoading(false);
    } catch (e) { console.error(e); setLoading(false); }
  };

  useEffect(() => { 
    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval);
  }, [range]); 

  if (loading && !data.stats) return <div className="p-10 text-center">Loading System...</div>;

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Critical Alerts" count={data.stats?.totalCritical || 0} color="red" />
        <StatCard title="Warnings" count={data.stats?.totalWarning || 0} color="yellow" />
        <StatCard title="Info Events" count={data.stats?.totalInfo || 0} color="blue" />
        <StatCard title="Resolved" count={data.stats?.autoClosedCount || 0} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="lg:col-span-2 space-y-4">
           
           <div className="bg-white p-3 border border-gray-300 shadow-sm flex justify-between items-center">
             <h3 className="font-bold text-gray-700 text-sm uppercase">Alert Volume Trend</h3>
             <div className="flex bg-gray-100 p-1 rounded border border-gray-200">
               <button 
                 onClick={() => setRange('7d')}
                 className={`px-4 py-1 text-xs font-bold rounded transition-all ${range === '7d' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Last 7 Days
               </button>
               <button 
                 onClick={() => setRange('12w')}
                 className={`px-4 py-1 text-xs font-bold rounded transition-all ${range === '12w' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Last 12 Weeks
               </button>
             </div>
           </div>

           <TrendChart history={data.history} range={range} />
           
           <TopOffenders data={data.top} />
        </div>

        <div className="space-y-4">
           <LifecycleStream alerts={data.stream} onSelect={setSelectedAlert} />
           <AutoClosedLog logs={data.closed} onSelect={setSelectedAlert} />
        </div>
      </div>

      <AlertModal 
        alertId={selectedAlert} 
        onClose={() => setSelectedAlert(null)} 
        onUpdate={fetchData} 
      />
    </div>
  );
};

export default Dashboard;