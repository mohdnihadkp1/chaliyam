import { useState } from 'react';
import { BUS_DATA } from '../data';
import { Search, MapPin, Bus, AlertCircle, ArrowDownUp } from 'lucide-react';

export default function BusSection() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'early' | 'late'>('early');

  const filteredBuses = BUS_DATA.filter(b => {
    const matchesFilter = filter === 'all' || b.route === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = b.name.toLowerCase().includes(q) || b.dest.toLowerCase().includes(q) || (b.via && b.via.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    // Basic time sorting Assuming HH:MM 24h format
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    const minutesA = timeA[0] * 60 + (timeA[1] || 0);
    const minutesB = timeB[0] * 60 + (timeB[1] || 0);
    return sortOrder === 'early' ? minutesA - minutesB : minutesB - minutesA;
  });

  return (
    <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <h2 className="font-yatra text-xl md:text-[28px] text-gold-light mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        <Bus className="text-gold-light w-6 h-6 md:w-7 md:h-7" />
        Private Bus <span className="text-gold">Timings</span>
      </h2>
      <p className="text-slate-400 text-xs md:text-sm mb-5 md:mb-8">
        ചാലിയം ബസ് ടൈംടേബിൾ — Private bus schedules from Chaliyam
      </p>

      <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3.5 mb-4 md:mb-6 flex items-center gap-2 md:gap-2.5 text-xs md:text-[13px] text-slate-300 backdrop-blur-md shadow-inner">
        <AlertCircle size={16} className="shrink-0 text-gold-light md:w-4 md:h-4" /> Timings are indicative. Please verify with bus operators for exact schedules. Timings may vary on holidays.
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-5">
        <div className="flex-1 relative flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-slate-400 md:w-[18px] md:h-[18px]" />
            </div>
            <input 
              type="text" 
              placeholder="Search destination, route, or bus..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-white/10 bg-white/5 text-xs md:text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500 backdrop-blur-md shadow-inner"
            />
          </div>
          <button
            onClick={() => setSortOrder(prev => prev === 'early' ? 'late' : 'early')}
            className="flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg md:rounded-xl text-slate-300 transition-colors text-xs md:text-sm font-medium backdrop-blur-md shrink-0"
            title="Sort by Time"
          >
            <ArrowDownUp size={16} className="text-gold-light" />
            <span className="hidden sm:inline">{sortOrder === 'early' ? 'Earliest' : 'Latest'}</span>
          </button>
        </div>
        
        <div className="flex gap-1.5 md:gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Routes' },
            { id: 'kozhikode', label: '→ Kozhikode' },
            { id: 'beypore', label: '→ Beypore' },
            { id: 'feroke', label: '→ Feroke' },
            { id: 'calicut', label: '→ Calicut Beach' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] cursor-pointer transition-all font-sans whitespace-nowrap backdrop-blur-md
                ${filter === btn.id 
                  ? 'bg-gold/20 text-gold-light border-gold/30 shadow-[0_0_15px_rgba(201,148,26,0.15)]' 
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-gold-light hover:border-white/20'
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filteredBuses.map((bus, index) => (
          <div key={index} className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,148,26,0.1)] hover:border-gold/30 backdrop-blur-md group">
            <div className="flex justify-between items-start mb-2 md:mb-3">
              <div>
                <h3 className="font-semibold text-base md:text-lg text-slate-200 group-hover:text-gold-light transition-colors">{bus.name}</h3>
                <p className="text-xs md:text-sm text-slate-400">{bus.dest}</p>
              </div>
              <span className="bg-gold/10 text-gold-light px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg font-bold text-xs md:text-sm shadow-sm border border-gold/20">
                {bus.time}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-white/5 text-slate-300 px-2.5 py-1 rounded text-xs font-medium mb-2 border border-white/10">
                {bus.freq}
              </span>
            </div>

            {bus.stops && bus.stops.length > 0 && (
              <div className="relative pt-2 pb-1">
                <div className="absolute top-4 left-2 right-2 h-[1px] bg-white/10 rounded-full"></div>
                <div className="flex justify-between relative z-10">
                  {bus.stops.map((stop, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${i === 0 || i === bus.stops!.length - 1 ? 'bg-gold' : 'bg-slate-500'}`}>
                        {i === 0 || i === bus.stops!.length - 1 ? <MapPin size={8} className="text-slate-900" /> : null}
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 max-w-[60px] text-center leading-tight">
                        {stop}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {filteredBuses.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No buses found matching your search criteria.
        </div>
      )}
    </div>
  );
}
