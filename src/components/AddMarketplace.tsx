import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, UploadCloud } from "lucide-react";

export default function AddMarketplace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Sell",
    price: "",
    desc: "",
    phone: "",
    name: "",
    image: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    else if (formData.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";

    if (!formData.price.trim()) newErrors.price = "Price is required.";
    else if (isNaN(Number(formData.price))) newErrors.price = "Price must be a valid number.";

    if (!formData.name.trim()) newErrors.name = "Your name is required.";

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) newErrors.phone = "WhatsApp number is required.";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a valid phone number.";

    if (formData.image && !formData.image.match(/^https?:\/\/.+/)) {
      newErrors.image = "Please enter a valid URL starting with http:// or https://";
    }

    if (!formData.desc.trim()) newErrors.desc = "Description is required.";
    else if (formData.desc.trim().length < 10) newErrors.desc = "Description must be at least 10 characters.";

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
    const message = `*New Marketplace Listing*

*Type:* ${formData.type}
*Title:* ${formData.title}
*Price:* ${formData.price}
*Description:* ${formData.desc}

*Contact Name:* ${formData.name}
*Phone:* ${formData.phone}
*Image:* ${formData.image}`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    navigate("/marketplace");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-24 font-sans animate-fade-in relative z-50">
      <div className="max-w-2xl mx-auto px-4 relative">
        <button 
          onClick={() => navigate("/marketplace")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium bg-white px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-md border border-slate-100 w-max"
        >
          <ArrowLeft size={18} /> Back to Marketplace
        </button>

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 lg:border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center text-[#25D366] shadow-inner">
              <ShoppingBag size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">Post an Ad</h1>
              <p className="text-slate-500 font-medium mt-1">Sell, buy, or rent items in Chaliyam</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Title</label>
                <input 
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="e.g. Used Bicycle"
                />
                {errors.title && <span className="text-red-500 text-xs ml-1 mt-1">{errors.title}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white font-medium transition-all shadow-inner appearance-none cursor-pointer"
                >
                  <option value="Sell">Sell Something</option>
                  <option value="Buy">Want to Buy</option>
                  <option value="Rent">Available for Rent</option>
                  <option value="Job">Job Offer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Price (₹)</label>
                <input 
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.price ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="e.g. 5000"
                />
                {errors.price && <span className="text-red-500 text-xs ml-1 mt-1">{errors.price}</span>}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="e.g. Nihad"
                />
                {errors.name && <span className="text-red-500 text-xs ml-1 mt-1">{errors.name}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp Number</label>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <span className="text-red-500 text-xs ml-1 mt-1">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-slate-700 ml-1">Image URL</label>
              <div className="relative">
                <input 
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${errors.image ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner`}
                  placeholder="https://images.unsplash.com/..."
                />
                <UploadCloud className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.image ? 'text-red-400' : 'text-slate-400'}`} size={20} />
              </div>
              {errors.image && <span className="text-red-500 text-xs ml-1">{errors.image}</span>}
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <textarea 
                value={formData.desc}
                onChange={(e) => handleChange('desc', e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border-2 ${errors.desc ? 'border-red-500 focus:border-red-500' : 'border-slate-100 focus:border-[#25D366]'} bg-slate-50 text-slate-800 focus:outline-none focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner min-h-[120px] resize-none`}
                placeholder="Provide details about the item..."
              />
              {errors.desc && <span className="text-red-500 text-xs ml-1 mt-1">{errors.desc}</span>}
            </div>

            <button 
              type="submit"
              className="mt-4 w-full bg-[#25D366] hover:bg-[#1fbc5b] text-white font-extrabold py-4 rounded-2xl transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_25px_rgba(37,211,102,0.4)] hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
            >
              Post Ad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
