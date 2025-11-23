import { useState } from 'react';
import axios from 'axios';
import { Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

const SimulatorPage = () => {
  const [driverId, setDriverId] = useState('');
  const [type, setType] = useState('OVERSPEED');
  const [driverName, setDriverName] = useState('');
  
  // Specific State Fields
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [location, setLocation] = useState('');
  const [speed, setSpeed] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const getSeverityForType = (selectedType) => {
    if (selectedType === 'DOCUMENT') return 'WARNING';
    return 'INFO';
  };

  const handleIngest = async () => {
    if (!driverId) return setStatus("Error: Driver ID is required");
    setLoading(true);
    
    const autoSeverity = getSeverityForType(type);

    let metadata = {
      driverId: driverId,
      driverName: driverName || "Unknown Driver",
      timestamp: new Date().toISOString()
    };

    if (type === 'OVERSPEED') {
      metadata = { 
        ...metadata, 
        vehicleNumber: vehicleNumber || "N/A", 
        speed: speed ? Number(speed) : 0, 
        speedLimit: 80, 
        location: location || "Unknown Location" 
      };
    } else if (type === 'FEEDBACK_NEGATIVE') {
      metadata = { 
        ...metadata, 
        comment: feedback || "No comment provided",
        rating: 1 
      };
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/alerts/ingest', {
        sourceType: type,
        severity: autoSeverity,
        metadata: metadata
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      setStatus(`Success: Created ${type} for ${driverId}`);
    } catch (e) { setStatus("Error: Failed to create alert"); }
    setLoading(false);
  };

  const handleFix = async () => {
    if (!driverId) return setStatus("Error: Driver ID is required");
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/alerts/event', {
        driverId: driverId,
        eventType: "DOCUMENT_RENEWAL"
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      setStatus(`Success: Triggered fix for ${driverId}`);
    } catch (e) { setStatus("Error: Failed to send event"); }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-300 shadow-sm">
      
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-300 flex items-center gap-2">
        <Zap size={20} className="text-slate-600"/>
        <h2 className="font-bold text-lg text-slate-700">Sensor Data Simulator</h2>
      </div>

      <div className="p-6 space-y-6">
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Driver ID <span className="text-red-500">*</span></label>
            <input 
              className="w-full p-2 border border-gray-400 focus:border-blue-600 outline-none font-mono text-sm"
              placeholder="e.g. D005"
              value={driverId}
              onChange={e => setDriverId(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Driver Name</label>
            <input 
              className="w-full p-2 border border-gray-400 focus:border-blue-600 outline-none text-sm"
              placeholder="Full Name"
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Alert Type</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="w-full p-2 border border-gray-400 bg-white outline-none text-sm"
          >
            <option value="OVERSPEED">Overspeed Event</option>
            <option value="DOCUMENT">Document Expiry</option>
            <option value="FEEDBACK_NEGATIVE">Negative Feedback</option>
          </select>
        </div>

        {type === 'OVERSPEED' && (
          <div className="p-4 bg-blue-50 border border-blue-100 rounded grid grid-cols-2 gap-4">
            <div className="col-span-2 text-xs font-bold text-blue-700 uppercase mb-1">Vehicle Telemetry</div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Current Speed (km/h)</label>
              <input type="number" className="w-full p-2 border border-gray-300 outline-none text-sm" placeholder="0" value={speed} onChange={e => setSpeed(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Location</label>
              <input className="w-full p-2 border border-gray-300 outline-none text-sm" placeholder="Coordinates / Highway" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1">Vehicle Number</label>
              <input className="w-full p-2 border border-gray-300 outline-none text-sm" placeholder="KA-01-AB-1234" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value.toUpperCase())} />
            </div>
          </div>
        )}

        {type === 'FEEDBACK_NEGATIVE' && (
          <div className="p-4 bg-yellow-50 border border-yellow-100 rounded">
            <div className="text-xs font-bold text-yellow-700 uppercase mb-2">Customer Feedback</div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Complaint Details</label>
            <textarea 
              className="w-full p-2 border border-gray-300 outline-none text-sm h-20 resize-none" 
              placeholder="Describe the incident..." 
              value={feedback} 
              onChange={e => setFeedback(e.target.value)}
            />
          </div>
        )}

        {type === 'DOCUMENT' && (
          <div className="p-4 bg-gray-100 border border-gray-200 rounded text-center text-sm text-gray-500 italic">
            No extra telemetry data needed for Document Expiry.
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleIngest} 
            disabled={loading} 
            className="flex-1 bg-red-700 text-white font-bold py-2 px-4 hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <AlertTriangle size={18} /> Generate Alert
          </button>
          
          <button 
            onClick={handleFix} 
            disabled={loading} 
            className="flex-1 bg-green-700 text-white font-bold py-2 px-4 hover:bg-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} /> Simulate Document Fix
          </button>
        </div>

        {status && (
          <div className={`p-3 text-sm font-mono border ${status.includes('Error') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
            {status}
          </div>
        )}

      </div>
    </div>
  );
};

export default SimulatorPage;