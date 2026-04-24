import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPinned, AlertTriangle } from "lucide-react";

export default function ReportMap() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: "",
    desc: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Map Update Suggestion");
    const body = encodeURIComponent(
      `Location: ${formData.location}\nDescription: ${formData.desc}`
    );
    window.location.href = `mailto:mohdnihadkp@gmail.com?subject=${subject}&body=${body}`;
    navigate("/map");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 font-sans animate-fade-in relative z-50">
      <div className="max-w-2xl mx-auto px-4 relative">
        <button 
          onClick={() => navigate("/map")}
          className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors mb-6 font-medium bg-white px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md border border-slate-100 w-max"
        >
          <ArrowLeft size={18} /> Back to Map
        </button>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Report Map Issue</h1>
              <p className="text-slate-500 font-medium mt-1">Found something incorrect or missing on the map?</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                <MapPinned size={16} className="text-slate-400" /> Location Name or Coordinates
              </label>
              <input 
                required
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                placeholder="e.g. Near Chaliyam Beach details..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Issue Description</label>
              <textarea 
                required
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner min-h-[160px] resize-none"
                placeholder="Describe what's wrong or what needs to be added..."
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_12px_25px_rgba(239,68,68,0.4)] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
