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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required.";
    else if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";

    if (!formData.role.trim()) newErrors.role = "Role / Profession is required.";

    if (!formData.phone.trim()) newErrors.phone = "Contact info is required.";
    else if (formData.phone.trim().length < 10) newErrors.phone = "Please enter a valid phone number or email.";

    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = "Please enter a valid URL starting with http:// or https://";
    }

    if (formData.image && !formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = "Please enter a valid URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const message = `*New Profile Submission*

*Name:* ${formData.name}
*Role:* ${formData.role}
*Category:* ${formData.category}
*Phone/Email:* ${formData.phone}
*Website:* ${formData.website || 'N/A'}
*Image:* ${formData.image || 'N/A'}`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
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

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 lg:border border-slate-100">
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
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="e.g. Dr. John Doe"
                />
                {errors.name && <span className="text-red-500 text-xs ml-1 mt-1">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Role / Profession</label>
                <input 
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.role ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="e.g. Physician"
                />
                {errors.role && <span className="text-red-500 text-xs ml-1 mt-1">{errors.role}</span>}
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
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Contact Info</label>
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="Phone or Email"
                />
                {errors.phone && <span className="text-red-500 text-xs ml-1 mt-1">{errors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-slate-700 ml-1">Website or Link (Optional)</label>
              <input 
                type="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.website ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                placeholder="https://yourwebsite.com"
              />
              {errors.website && <span className="text-red-500 text-xs ml-1 mt-1">{errors.website}</span>}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-slate-700 ml-1">Profile Image URL</label>
              <div className="relative">
                <input 
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${errors.image ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-indigo-500'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="https://images.unsplash.com/..."
                />
                <UploadCloud className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.image ? 'text-red-400' : 'text-slate-400'}`} size={20} />
              </div>
              {errors.image && <span className="text-red-500 text-xs ml-1">{errors.image}</span>}
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
