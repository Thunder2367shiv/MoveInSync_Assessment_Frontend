import { useEffect, useState } from 'react';
import axios from 'axios';
import { Settings, Save, X, Edit2, AlertCircle, RefreshCw } from 'lucide-react';

const AdminRules = () => {
  const [rules, setRules] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [editForm, setEditForm] = useState({});

  const fetchRules = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/api/alerts/rules', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setRules(res.data.data))
      .catch(() => alert("Access Denied: Admin Only"));
  };

  useEffect(() => { fetchRules(); }, []);

  const handleEdit = (rule) => {
    setEditingId(rule._id);
    setEditForm({
      escalate_if_count: rule.escalate_if_count || '',
      window_mins: rule.window_mins || ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/alerts/rules/${id}`, editForm, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      alert("Configuration Updated Successfully");
      setEditingId(null);
      fetchRules(); 
    } catch (e) {
      alert("Update Failed: " + e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-300">
        <Settings className="text-slate-700" />
        <h2 className="text-xl font-bold text-slate-800">Rule Engine Configuration</h2>
      </div>

      <div className="grid gap-4">
        {rules.map(rule => (
           <div 
             key={rule._id} 
             className={`bg-white p-5 border shadow-sm transition-all ${editingId === rule._id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-300'}`}
           >
             
             <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-blue-800 text-lg">{rule.type}</h3>
                    {rule.type === 'DOCUMENT' ? 
                      <RefreshCw size={14} className="text-green-600"/> : 
                      <AlertCircle size={14} className="text-red-600"/>
                    }
                  </div>
                  <p className="text-xs text-gray-500 font-mono mt-1">ID: {rule._id}</p>
                </div>
                
                {editingId === rule._id ? (
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(rule._id)} className="flex items-center gap-1 bg-green-700 text-white px-3 py-1 rounded text-xs font-bold hover:bg-green-800 shadow-sm">
                      <Save size={14} /> SAVE
                    </button>
                    <button onClick={handleCancel} className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-bold hover:bg-gray-300">
                      <X size={14} /> CANCEL
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleEdit(rule)} className="flex items-center gap-1 text-blue-700 hover:text-white border border-blue-200 hover:bg-blue-600 px-3 py-1 rounded text-xs font-bold transition-colors">
                    <Edit2 size={14} /> EDIT CONFIG
                  </button>
                )}
             </div>

             <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
                
                {rule.type !== 'DOCUMENT' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Escalation Threshold</label>
                      {editingId === rule._id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            className="w-full p-2 border border-blue-400 rounded bg-white outline-none font-bold text-gray-800 focus:ring-2 focus:ring-blue-200"
                            value={editForm.escalate_if_count}
                            onChange={e => setEditForm({...editForm, escalate_if_count: e.target.value})}
                          />
                          <span className="text-xs text-gray-400">strikes</span>
                        </div>
                      ) : (
                        <div className="font-bold text-gray-800 text-lg">
                          {rule.escalate_if_count} <span className="text-xs font-normal text-gray-500">events</span>
                        </div>
                      )}
                      <p className="text-[10px] text-gray-400 mt-1">Triggers CRITICAL severity if exceeded.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Time Window</label>
                      {editingId === rule._id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            className="w-full p-2 border border-blue-400 rounded bg-white outline-none font-bold text-gray-800 focus:ring-2 focus:ring-blue-200"
                            value={editForm.window_mins}
                            onChange={e => setEditForm({...editForm, window_mins: e.target.value})}
                          />
                          <span className="text-xs text-gray-400">mins</span>
                        </div>
                      ) : (
                        <div className="font-bold text-gray-800 text-lg">
                          {rule.window_mins} <span className="text-xs font-normal text-gray-500">mins</span>
                        </div>
                      )}
                      <p className="text-[10px] text-gray-400 mt-1">Reset count after this duration.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Auto-Close Trigger Event</label>
                    <div className="flex items-center gap-2">
                      <code className="bg-green-100 text-green-800 px-3 py-2 rounded border border-green-200 font-mono text-sm block w-full">
                        {rule.auto_close_trigger}
                      </code>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 italic">
                      * This rule logic is event-based. Threshold editing is disabled.
                    </p>
                  </div>
                )}

             </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRules;