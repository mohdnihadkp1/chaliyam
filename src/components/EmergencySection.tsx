import { EMERGENCY } from '../data';
import { Phone, Shield, Ambulance, Hospital, Flame, LifeBuoy, User, AlertTriangle } from 'lucide-react';

export default function EmergencySection() {
  const getEmergencyIcon = (type: string) => {
    switch(type) {
      case 'police': return <Shield size={28} className="text-[#1565c0] md:w-8 md:h-8" />;
      case 'ambulance': return <Ambulance size={28} className="text-[#c62828] md:w-8 md:h-8" />;
      case 'hospital': return <Hospital size={28} className="text-[#2e7d32] md:w-8 md:h-8" />;
      case 'fire': return <Flame size={28} className="text-[#e65100] md:w-8 md:h-8" />;
      case 'coast': return <LifeBuoy size={28} className="text-[#0277bd] md:w-8 md:h-8" />;
      case 'women': return <User size={28} className="text-[#6a1b9a] md:w-8 md:h-8" />;
      default: return <AlertTriangle size={28} className="text-[#2d7a4f] md:w-8 md:h-8" />;
    }
  };

  return (
    <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <h2 className="font-yatra text-xl md:text-[28px] text-gold-light mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        <Phone className="text-red-500 w-6 h-6 md:w-7 md:h-7" />
        Emergency <span className="text-gold">Contacts</span>
      </h2>
      <p className="text-slate-400 text-xs md:text-sm mb-5 md:mb-8">
        അടിയന്തര ബന്ധപ്പെടേണ്ട നമ്പരുകൾ — Always available, always ready
      </p>

      <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg md:rounded-xl px-3 py-2.5 md:px-4 md:py-3.5 mb-4 md:mb-6 flex items-center gap-2 md:gap-2.5 text-xs md:text-[13px] backdrop-blur-md shadow-inner">
        <AlertTriangle size={16} className="shrink-0 md:w-4 md:h-4" /> In case of life-threatening emergency, call 112 (National Emergency Number) immediately.
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
        {EMERGENCY.map((contact, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-xl md:rounded-2xl p-2.5 sm:p-4 md:p-5 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,148,26,0.1)] hover:border-gold/30 relative overflow-hidden group backdrop-blur-md"
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1 opacity-80"
              style={{
                backgroundColor: 
                  contact.type === 'police' ? '#3b82f6' :
                  contact.type === 'ambulance' ? '#ef4444' :
                  contact.type === 'fire' ? '#f97316' :
                  contact.type === 'hospital' ? '#22c55e' :
                  contact.type === 'coast' ? '#0ea5e9' :
                  contact.type === 'women' ? '#a855f7' : '#eab308'
              }}
            />
            <div className="mb-0 sm:mb-1 bg-slate-900/50 w-fit p-1 sm:p-1.5 md:p-2 rounded-lg md:rounded-xl border border-white/5 shadow-inner scale-75 sm:scale-100 origin-left">{getEmergencyIcon(contact.type)}</div>
            <div className="font-semibold text-xs sm:text-sm md:text-[15px] text-slate-200 group-hover:text-gold-light transition-colors leading-[1.1] md:leading-tight line-clamp-2 md:line-clamp-none h-auto md:h-fit">{contact.name}</div>
            <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-400 line-clamp-1">{contact.sub}</div>
            <div className="font-yatra text-sm sm:text-lg md:text-xl text-gold-light mt-auto">{contact.number}</div>
            {contact.alt && (
              <div className="text-[8px] sm:text-[10px] md:text-xs text-slate-500 truncate">Alt: {contact.alt}</div>
            )}
            <a 
              href={`tel:${contact.number}`}
              className="mt-1 sm:mt-auto flex items-center justify-center gap-1 md:gap-1.5 p-1.5 sm:p-2 md:p-2.5 rounded-lg md:rounded-xl border border-white/10 bg-white/5 text-slate-300 text-[10px] sm:text-xs md:text-[13px] font-semibold cursor-pointer no-underline transition-colors font-sans hover:bg-gold/20 hover:text-gold-light hover:border-gold/30"
            >
              <Phone size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden sm:inline">Call Now</span><span className="sm:hidden">Call</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
