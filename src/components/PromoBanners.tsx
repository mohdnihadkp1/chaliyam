import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';

export function GridBannerAd({ image, title, subtitle, cta, path }: { image: string, title: string, subtitle: string, cta: string, path: string }) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(path)}
      className="relative w-full h-40 md:h-48 rounded-3xl overflow-hidden group cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[var(--color-outline)]"
    >
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-center p-5 md:p-6 text-white">
        <span className="text-[10px] md:text-sm font-bold text-emerald-400 uppercase tracking-widest drop-shadow mb-1">{subtitle}</span>
        <h3 className="text-xl md:text-2xl font-extrabold mb-3 drop-shadow leading-tight">{title}</h3>
        <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-400 transition-colors w-max">
          {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

export function DealOfTheDay() {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl overflow-hidden shadow-xl text-white relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Tag size={120} />
      </div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full mb-3">
            Deal of the Day
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight">
            50% Off Top Selling Electronics
          </h2>
          <p className="text-indigo-200 text-sm md:text-base font-medium mb-6">
            Upgrade your life with premium gadgets. Offer valid only for today.
          </p>
          <button 
            onClick={() => navigate('/directory')}
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-6 py-3 rounded-xl transition-colors active:scale-95 shadow-lg"
          >
            Claim Offer
          </button>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-indigo-800">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Electronics" />
          </div>
        </div>
      </div>
    </div>
  );
}
