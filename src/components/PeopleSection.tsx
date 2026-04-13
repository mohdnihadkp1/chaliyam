import { useState, useEffect } from 'react';
import { PEOPLE } from '../data';
import { Phone, MessageCircle, Building, Camera, Wrench, Palmtree, Globe, Search } from 'lucide-react';

interface Person {
  id?: string;
  name: string;
  role: string;
  phone: string;
  image: string;
  category: string;
  website?: string;
}

export default function PeopleSection() {
  const [filter, setFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredPeople = PEOPLE.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Hello ${name}, I found your contact on Chaliyam Connect.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-yatra text-2xl md:text-[28px] mb-1.5 flex items-center gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Palmtree className="text-gold-light" size={28} />
            Special <span className="text-gold-light">Persons</span>
          </h2>
          <p className="text-slate-400 text-sm">
            പ്രധാന വ്യക്തികൾ — Key contacts and professionals in Chaliyam
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-white/10 bg-white/5 backdrop-blur-md text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'all', label: 'All', icon: null },
          { id: 'Govt', label: 'Govt & Officials', icon: <Building size={16} /> },
          { id: 'Media', label: 'Media & Photo', icon: <Camera size={16} /> },
          { id: 'Service', label: 'Services', icon: <Wrench size={16} /> },
          { id: 'Tourism', label: 'Tourism', icon: <Palmtree size={16} /> },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] cursor-pointer transition-all font-sans flex items-center gap-2
              ${filter === btn.id 
                ? 'bg-gold/20 text-gold-light border-gold/30 shadow-[0_0_15px_rgba(201,148,26,0.15)]' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-slate-200 hover:border-white/20'
              }`}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
        {filteredPeople.map((person: any, index) => (
          <div 
            key={person.id || index} 
            className="bg-white/5 backdrop-blur-md rounded-[14px] p-5 border border-white/10 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,148,26,0.1)]"
          >
            <img 
              src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`} 
              alt={person.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-sm mb-4"
            />
            <h3 className="text-lg font-semibold text-slate-200 mb-1">{person.name}</h3>
            <p className="text-sm text-gold-light font-medium mb-4">{person.role}</p>
            
            <div className="w-full mt-auto border-t border-white/10 pt-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-left">Contact Info</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-slate-200 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                  <Phone size={14} className="text-gold-light shrink-0" />
                  <span className="truncate">{person.phone}</span>
                </div>
                
                {person.website && (person.category === 'Govt' || person.category === 'Service') && (
                  <a 
                    href={person.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-2 rounded-lg border border-blue-500/20 transition-colors"
                  >
                    <Globe size={14} className="shrink-0" />
                    <span className="truncate">Official Website</span>
                  </a>
                )}
                
                <button 
                  onClick={() => handleWhatsApp(person.phone, person.name)}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-lg transition-colors font-medium text-sm shadow-sm mt-1"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
