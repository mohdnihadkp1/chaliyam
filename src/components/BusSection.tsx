import { useState } from"react";
import { BUS_DATA } from"../data";
import { Search, MapPin, Bus, AlertCircle, ArrowDownUp } from"lucide-react";
export default function BusSection() {
 const [filter, setFilter] = useState("all");
 const [searchQuery, setSearchQuery] = useState("");
 const [sortOrder, setSortOrder] = useState<"early" |"late">("early");
 const filteredBuses = BUS_DATA.filter((b) => {
 const matchesFilter = filter ==="all" || b.route === filter;
 const q = searchQuery.toLowerCase();
 const matchesSearch =
 b.name.toLowerCase().includes(q) ||
 b.dest.toLowerCase().includes(q) ||
 (b.via && b.via.toLowerCase().includes(q));
 return matchesFilter && matchesSearch;
 }).sort((a, b) => {
 /* Basic time sorting Assuming HH:MM 24h format */ const timeA = a.time
 .split(":")
 .map(Number);
 const timeB = b.time.split(":").map(Number);
 const minutesA = timeA[0] * 60 + (timeA[1] || 0);
 const minutesB = timeB[0] * 60 + (timeB[1] || 0);
 return sortOrder ==="early" ? minutesA - minutesB : minutesB - minutesA;
 });
 return (
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 
 <h2 className="font-yatra text-lg sm:text-xl md:text-[28px] text-black mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3">
 
 <Bus className="text-[var(--color-primary)] w-6 h-6 md:w-7 md:h-7" />
 Private Bus
 <span className="text-[var(--color-primary)]">Timings</span>
 </h2>
 <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm mb-5 md:mb-8">
 
 ചാലിയം ബസ് ടൈംടേബിൾ — Private bus schedules from Chaliyam
 </p>
 <div className="bg-[var(--color-surface-variant)] border border-[var(--color-outline)] rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3.5 mb-4 md:mb-6 flex items-center gap-2 md:gap-2.5 text-xs md:text-[13px] text-[var(--color-on-surface-variant)] backdrop-blur-md shadow-inner">
 
 <AlertCircle
 size={16}
 className="shrink-0 text-[var(--color-primary)] md:w-4 md:h-4"
 />
 Timings are indicative. Please verify with bus operators for exact
 schedules. Timings may vary on holidays.
 </div>
 <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-5">
 
 <div className="flex-1 relative flex gap-2">
 
 <div className="relative flex-1">
 
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 
 <Search
 size={16}
 className="text-[var(--color-on-surface-variant)] md:w-[18px] md:h-[18px]"
 />
 </div>
 <input
 type="text"
 placeholder="Search destination, route, or bus..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface-variant)] text-xs md:text-sm font-sans text-[var(--color-on-surface)] outline-none transition-colors focus:border-[var(--color-primary)] focus:bg-white/10 placeholder:text-slate-500 backdrop-blur-md shadow-inner"
 />
 </div>
 <button
 onClick={() =>
 setSortOrder((prev) => (prev ==="early" ?"late" :"early"))
 }
 className="flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 bg-[var(--color-surface-variant)] hover:bg-white/10 border border-[var(--color-outline)] rounded-lg md:rounded-xl text-[var(--color-on-surface-variant)] transition-colors text-xs md:text-sm font-medium backdrop-blur-md shrink-0"
 title="Sort by Time"
 >
 
 <ArrowDownUp
 size={16}
 className="text-[var(--color-primary)]"
 />
 <span className="hidden sm:inline">
 {sortOrder ==="early" ?"Earliest" :"Latest"}
 </span>
 </button>
 </div>
 <div className="flex gap-1.5 md:gap-2 flex-wrap">
 
 {[
 { id:"all", label:"All Routes" },
 { id:"kozhikode", label:"→ Kozhikode" },
 { id:"beypore", label:"→ Beypore" },
 { id:"feroke", label:"→ Feroke" },
 { id:"calicut", label:"→ Calicut Beach" },
 ].map((btn) => (
 <button
 key={btn.id}
 onClick={() => setFilter(btn.id)}
 className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] cursor-pointer transition-all font-sans whitespace-nowrap backdrop-blur-md ${filter === btn.id ?"bg-[var(--color-primary-container)] text-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_15px_rgba(201,148,26,0.15" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border-[var(--color-outline)] hover:bg-white/10 hover:text-[var(--color-primary)] hover:border-white/20"}`}
 >
 
 {btn.label}
 </button>
 ))}
 </div>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
 
 {filteredBuses.map((bus, index) => (
 <div
 key={index}
 className="bg-[var(--color-surface-variant)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--color-outline)] shadow-[0_4px_24px_rgba(0,0,0,0.2 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,148,26,0.1 hover:border-[var(--color-primary)] backdrop-blur-md group"
 >
 
 <div className="flex justify-between items-start mb-2 md:mb-3">
 
 <div>
 
 <h3 className="font-semibold text-base md:text-lg text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
 {bus.name}
 </h3>
 <p className="text-xs md:text-sm text-[var(--color-on-surface-variant)]">
 {bus.dest}
 </p>
 </div>
 <span className="bg-[var(--color-primary-container)] text-[var(--color-primary)] px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg font-bold text-xs md:text-sm shadow-sm border border-gold/20">
 
 {bus.time}
 </span>
 </div>
 <div className="mb-4">
 
 <span className="inline-block bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] px-2.5 py-1 rounded text-xs font-medium mb-2 border border-[var(--color-outline)]">
 
 {bus.freq}
 </span>
 </div>
 {bus.stops && bus.stops.length > 0 && (
 <div className="relative pt-2 pb-1">
 
 <div className="absolute top-4 left-2 right-2 h-[1px] bg-white/10 rounded-full"></div>
 <div className="flex justify-between relative z-10">
 
 {bus.stops.map((stop, i) => (
 <div key={i} className="flex flex-col items-center gap-1">
 
 <div
 className={`w-4 h-4 rounded-full border-2 border-slate-900 flex items-center justify-center ${i === 0 || i === bus.stops!.length - 1 ?"bg-[var(--color-primary)]" :"bg-slate-500"}`}
 >
 
 {i === 0 || i === bus.stops!.length - 1 ? (
 <MapPin size={8} className="text-slate-900" />
 ): null}
 </div>
 <span className="text-[10px] font-medium text-[var(--color-on-surface-variant)] max-w-[60px] text-center leading-tight">
 
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
 <div className="text-center py-10 text-[var(--color-on-surface-variant)]">
 
 No buses found matching your search criteria.
 </div>
 )}
 </div>
 );
}
