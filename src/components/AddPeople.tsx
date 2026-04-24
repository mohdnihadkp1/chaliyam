import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, UploadCloud } from "lucide-react";

export default function AddPeople() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    category: "Professional",
    image: "",
    website: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`People Profile Submission: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nRole: ${formData.role}\nCategory: ${formData.category}\nPhone/Email: ${formData.phone}\nWebsite: ${formData.website}\nImage: ${formData.image}`
    );
    window.location.href = `mailto:mohdnihadkp@gmail.com?subject=${subject}&body=${body}`;
    navigate("/people");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 font-sans animate-fade-in relative z-50">
      <div className="max-w-2xl mx-auto px-4 relative">
        <button 
          onClick={() => navigate("/people")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium bg-white px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md border border-slate-100 w-max"
        >
          <ArrowLeft size={18} /> Back to Directory
        </button>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Submit Profile</h1>
              <p className="text-slate-500 font-medium mt-1">Get listed in the local professional directory</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="e.g. Dr. John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Role / Profession</label>
                <input 
                  required
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="e.g. Physician"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="Professional">Professional</option>
                  <option value="Tradesperson">Tradesperson</option>
                  <option value="Artist">Artist / Creative</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Public Servant">Public Servant</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Contact Info</label>
                <input 
                  required
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="Phone or Email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Website or Link (Optional)</label>
              <input 
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
              <div className="relative">
                <input 
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="https://images.unsplash.com/..."
                />
                <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_8px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_12px_25px_rgba(79,70,229,0.4)] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
            >
              Submit Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
