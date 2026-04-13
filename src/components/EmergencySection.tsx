import { EMERGENCY } from '../data';
import { Phone, Shield, Ambulance, Hospital, Flame, LifeBuoy, User, AlertTriangle } from 'lucide-react';

export default function EmergencySection() {
  const getEmergencyIcon = (type: string) => {
    switch(type) {
      case 'police': return <Shield size={32} className="text-[#1565c0]" />;
      case 'ambulance': return <Ambulance size={32} className="text-[#c62828]" />;
      case 'hospital': return <Hospital size={32} className="text-[#2e7d32]" />;
      case 'fire': return <Flame size={32} className="text-[#e65100]" />;
      case 'coast': return <LifeBuoy size={32} className="text-[#0277bd]" />;
      case 'women': return <User size={32} className="text-[#6a1b9a]" />;
      default: return <AlertTriangle size={32} className="text-[#2d7a4f]" />;
    }
  };

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <h2 className="font-yatra text-[28px] text-gold-light mb-1.5 flex items-center gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        <Phone className="text-red-500" size={28} />
        Emergency <span className="text-gold">Contacts</span>
      </h2>
      <p className="text-slate-400 text-sm mb-8">
        അടിയന്തര ബന്ധപ്പെടേണ്ട നമ്പരുകൾ — Always available, always ready
      </p>

      <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3.5 mb-6 flex items-center gap-2.5 text-[13px] backdrop-blur-md shadow-inner">
        <AlertTriangle size={16} className="shrink-0" /> In case of life-threatening emergency, call 112 (National Emergency Number) immediately.
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {EMERGENCY.map((contact, index) => (
          <div 
            key={index} 
            className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col gap-2.5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,148,26,0.1)] hover:border-gold/30 relative overflow-hidden group backdrop-blur-md"
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
            <div className="mb-1 bg-slate-900/50 w-fit p-2 rounded-xl border border-white/5 shadow-inner">{getEmergencyIcon(contact.type)}</div>
            <div className="font-semibold text-[15px] text-slate-200 group-hover:text-gold-light transition-colors">{contact.name}</div>
            <div className="text-xs text-slate-400">{contact.sub}</div>
            <div className="font-yatra text-xl text-gold-light">{contact.number}</div>
            {contact.alt && (
              <div className="text-xs text-slate-500">Alt: {contact.alt}</div>
            )}
            <a 
              href={`tel:${contact.number}`}
              className="mt-auto flex items-center justify-center gap-1.5 p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-[13px] font-semibold cursor-pointer no-underline transition-colors font-sans hover:bg-gold/20 hover:text-gold-light hover:border-gold/30"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
