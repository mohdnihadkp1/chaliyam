import { useState } from 'react';
import { BUS_DATA } from '../data';
import { Search, MapPin, Bus, AlertCircle } from 'lucide-react';

export default function BusSection() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuses = BUS_DATA.filter(b => {
    const matchesFilter = filter === 'all' || b.route === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = b.name.toLowerCase().includes(q) || b.dest.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <h2 className="font-yatra text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
        <Bus className="text-gold" size={28} />
        Private Bus <span className="text-gold">Timings</span>
      </h2>
      <p className="text-text-light text-sm mb-8">
        ചാലിയം ബസ് ടൈംടേബിൾ — Private bus schedules from Chaliyam
      </p>

      <div className="bg-gradient-to-br from-gold-pale to-[#fff8e8] dark:from-gold-dark/20 dark:to-gold-dark/10 border border-gold/30 rounded-xl px-4 py-3.5 mb-6 flex items-center gap-2.5 text-[13px] text-gold-dark dark:text-gold-light">
        <AlertCircle size={16} className="shrink-0" /> Timings are indicative. Please verify with bus operators for exact schedules. Timings may vary on holidays.
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-5">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-light" />
          </div>
          <input 
            type="text" 
            placeholder="Search by bus name or destination..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold placeholder:text-text-light/70 dark:placeholder:text-text-light/50"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
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
              className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] cursor-pointer transition-all font-sans whitespace-nowrap
                ${filter === btn.id 
                  ? 'bg-green-deep text-white border-green-deep' 
                  : 'bg-white dark:bg-[#1a2e20] text-text-mid dark:text-text-light border-green-deep/20 dark:border-gold/20 hover:bg-green-deep dark:hover:bg-[#2d7a4f] hover:text-white hover:border-green-deep'
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBuses.map((bus, index) => (
          <div key={index} className="bg-white dark:bg-[#1a2e20] rounded-2xl p-5 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] transition-transform duration-200 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-text-dark dark:text-white">{bus.name}</h3>
                <p className="text-sm text-text-light">{bus.dest}</p>
              </div>
              <span className="bg-gold-pale dark:bg-gold-dark/20 text-gold-dark dark:text-gold-light px-3 py-1.5 rounded-lg font-bold text-sm shadow-sm border border-gold/10">
                {bus.time}
              </span>
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-green-pale dark:bg-[#0f2919] text-green-deep dark:text-gold-light px-2.5 py-1 rounded text-xs font-medium mb-2">
                {bus.freq}
              </span>
            </div>

            {bus.stops && bus.stops.length > 0 && (
              <div className="relative pt-2 pb-1">
                <div className="absolute top-4 left-2 right-2 h-0.5 bg-green-deep/20 dark:bg-gold/20 rounded-full"></div>
                <div className="flex justify-between relative z-10">
                  {bus.stops.map((stop, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-4 h-4 rounded-full border-2 border-white dark:border-[#1a2e20] flex items-center justify-center ${i === 0 || i === bus.stops!.length - 1 ? 'bg-green-deep dark:bg-gold' : 'bg-green-mid dark:bg-gold-light'}`}>
                        {i === 0 || i === bus.stops!.length - 1 ? <MapPin size={8} className="text-white dark:text-[#1a2e20]" /> : null}
                      </div>
                      <span className="text-[10px] font-medium text-text-mid dark:text-text-light max-w-[60px] text-center leading-tight">
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
        <div className="text-center py-10 text-text-light">
          No buses found matching your search criteria.
        </div>
      )}
    </div>
  );
}
