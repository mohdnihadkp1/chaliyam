import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Newspaper } from "lucide-react";

export default function AddNews() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "Event",
    title: "",
    date: "",
    desc: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New News/Event Submission*

*Type:* ${formData.type}
*Title:* ${formData.title}
*Date:* ${formData.date}
*Description:* ${formData.desc}

*Submitted by:* ${formData.name}`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    navigate("/news");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 font-sans animate-fade-in relative z-50">
      <div className="max-w-2xl mx-auto px-4 relative">
        <button 
          onClick={() => navigate("/news")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium bg-white px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md border border-slate-100 w-max"
        >
          <ArrowLeft size={18} /> Back to Events
        </button>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
              <Newspaper size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Submit Update</h1>
              <p className="text-slate-500 font-medium mt-1">Share news, events, or local notices</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="Event">Event</option>
                  <option value="News">News</option>
                  <option value="Notice">Notice</option>
                  <option value="Alert">Alert</option>
                  <option value="Sports">Sports</option>
                  <option value="Govt">Government</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Date</label>
                <input 
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Headline</label>
              <input 
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                placeholder="What's happening?"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
              <input 
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                placeholder="For verification purposes"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Details</label>
              <textarea 
                required
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner min-h-[120px] resize-none"
                placeholder="Give all the details..."
              />
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
