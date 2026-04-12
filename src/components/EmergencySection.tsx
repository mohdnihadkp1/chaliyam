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
      <h2 className="font-yatra text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
        <Phone className="text-red-500" size={28} />
        Emergency <span className="text-gold">Contacts</span>
      </h2>
      <p className="text-text-light text-sm mb-8">
        അടിയന്തര ബന്ധപ്പെടേണ്ട നമ്പരുകൾ — Always available, always ready
      </p>

      <div className="bg-[#fff3e0] border border-[#ffb74d] text-[#e65100] rounded-xl px-4 py-3.5 mb-6 flex items-center gap-2.5 text-[13px]">
        <AlertTriangle size={16} className="shrink-0" /> In case of life-threatening emergency, call 112 (National Emergency Number) immediately.
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        {EMERGENCY.map((contact, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-[#1a2e20] rounded-2xl p-5 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] flex flex-col gap-2.5 transition-transform duration-200 hover:-translate-y-1 relative overflow-hidden group"
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                backgroundColor: 
                  contact.type === 'police' ? '#1565c0' :
                  contact.type === 'ambulance' ? '#c62828' :
                  contact.type === 'fire' ? '#e65100' :
                  contact.type === 'hospital' ? '#2e7d32' :
                  contact.type === 'coast' ? '#0277bd' :
                  contact.type === 'women' ? '#6a1b9a' : '#2d7a4f'
              }}
            />
            <div className="mb-1">{getEmergencyIcon(contact.type)}</div>
            <div className="font-semibold text-[15px] text-text-dark dark:text-white">{contact.name}</div>
            <div className="text-xs text-text-light">{contact.sub}</div>
            <div className="font-yatra text-xl text-green-deep dark:text-gold-light">{contact.number}</div>
            {contact.alt && (
              <div className="text-xs text-text-light">Alt: {contact.alt}</div>
            )}
            <a 
              href={`tel:${contact.number}`}
              className="mt-auto flex items-center justify-center gap-1.5 p-2.5 rounded-xl border-none bg-green-deep dark:bg-gold text-white dark:text-[#1a2e20] text-[13px] font-semibold cursor-pointer no-underline transition-colors font-sans hover:bg-green-mid dark:hover:bg-gold-light"
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
