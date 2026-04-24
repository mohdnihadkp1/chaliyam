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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Marketplace Listing: ${formData.title}`);
    const body = encodeURIComponent(
      `Type: ${formData.type}\nTitle: ${formData.title}\nPrice: ${formData.price}\nDescription: ${formData.desc}\n\nContact Name: ${formData.name}\nPhone: ${formData.phone}\nImage: ${formData.image}`
    );
    window.location.href = `mailto:mohdnihadkp@gmail.com?subject=${subject}&body=${body}`;
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

        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
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
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Title</label>
                <input 
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="e.g. Used Bicycle"
                />
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
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Price (₹)</label>
                <input 
                  required
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="e.g. 5000"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="e.g. Nihad"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">WhatsApp Number</label>
              <input 
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Image URL</label>
              <div className="relative">
                <input 
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner"
                  placeholder="https://images.unsplash.com/..."
                />
                <UploadCloud className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <textarea 
                required
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#25D366] focus:bg-white placeholder:text-slate-400 font-medium transition-all shadow-inner min-h-[120px] resize-none"
                placeholder="Provide details about the item..."
              />
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
