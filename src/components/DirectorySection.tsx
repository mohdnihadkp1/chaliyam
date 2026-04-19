import { useState } from 'react';
import { DIRECTORY } from '../data';
import { Star, Fish, Utensils, Pill, Wrench, ShoppingCart, BookOpen, Scissors, Plug, IceCream, Phone as PhoneIcon, Store, Search, X, ShoppingBag } from 'lucide-react';
import DeliveryModal from './DeliveryModal';

export default function DirectorySection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof DIRECTORY[0] | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const toggleCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
      return;
    }

    setSelectedCategories(prev => {
      const newSelection = prev.filter(id => id !== 'all');
      if (newSelection.includes(categoryId)) {
        const filtered = newSelection.filter(id => id !== categoryId);
        return filtered.length === 0 ? ['all'] : filtered;
      } else {
        return [...newSelection, categoryId];
      }
    });
  };

  const filteredDirectory = DIRECTORY.filter(d => {
    const matchesFilter = selectedCategories.includes('all') || selectedCategories.includes(d.cat);
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(q) || 
                          d.desc.toLowerCase().includes(q) || 
                          d.catLabel.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const getDirectoryIcon = (cat: string, name: string) => {
    if (cat === 'fishing') return <Fish className="text-[#0277bd] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'food' && name.includes('Ice Cream')) return <IceCream className="text-[#e91e63] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'food') return <Utensils className="text-[#e65100] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'medical') return <Pill className="text-[#2e7d32] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'retail' && name.includes('Book')) return <BookOpen className="text-[#6a1b9a] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'retail') return <ShoppingCart className="text-[#f57c00] w-5 h-5 md:w-6 md:h-6" />;
    if (name.includes('Saloon')) return <Scissors className="text-[#455a64] w-5 h-5 md:w-6 md:h-6" />;
    if (name.includes('Electrical')) return <Plug className="text-[#fbc02d] w-5 h-5 md:w-6 md:h-6" />;
    if (name.includes('Mobile')) return <PhoneIcon className="text-[#1976d2] w-5 h-5 md:w-6 md:h-6" />;
    if (cat === 'service') return <Wrench className="text-[#607d8b] w-5 h-5 md:w-6 md:h-6" />;
    return <Store className="text-[#2d7a4f] w-5 h-5 md:w-6 md:h-6" />;
  };

  return (
    <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <div>
          <h2 className="font-yatra text-xl md:text-[28px] text-gold-light mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Store className="text-gold-light w-6 h-6 md:w-7 md:h-7" />
            Local <span className="text-gold">Directory</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            ചാലിയത്തിലെ ബിസിനസ് ഡയറക്ടറി — Find local shops and services near you
          </p>
        </div>
      </div>

      <div className="flex gap-2.5 md:gap-3 mb-4 md:mb-5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 md:w-[18px] md:h-[18px]" />
          </div>
          <input 
            type="text" 
            placeholder="Search businesses, shops, services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-white/10 bg-white/5 text-xs md:text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500 backdrop-blur-md shadow-inner"
          />
        </div>
      </div>

      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-5 flex-wrap overflow-x-auto pb-1 scrollbar-hide">
        {[
          { id: 'all', label: 'All' },
          { id: 'food', label: 'Food' },
          { id: 'medical', label: 'Medical' },
          { id: 'fishing', label: 'Fishing' },
          { id: 'retail', label: 'Retail' },
          { id: 'service', label: 'Services' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => toggleCategory(btn.id)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] cursor-pointer transition-all font-sans backdrop-blur-md whitespace-nowrap
              ${selectedCategories.includes(btn.id)
                ? 'bg-gold/20 text-gold-light border-gold/30 shadow-[0_0_15px_rgba(201,148,26,0.15)]' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-gold-light hover:border-white/20'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
        {filteredDirectory.map((item, index) => (
          <div 
            key={index}
            onClick={() => setSelectedItem(item)}
            className="bg-white/5 rounded-xl md:rounded-[14px] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,148,26,0.1)] hover:border-gold/30 backdrop-blur-md group cursor-pointer overflow-hidden pb-3"
          >
            {item.image ? (
              <div className="w-full h-28 md:h-36 bg-slate-800 shrink-0 mb-3 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full h-28 md:h-36 bg-slate-900/50 border-b border-white/5 flex items-center justify-center shrink-0 mb-3 shadow-inner group-hover:bg-white/5 transition-colors">
                {getDirectoryIcon(item.cat, item.name)}
              </div>
            )}
            
            <div className="px-3 w-full flex flex-col items-center flex-1 justify-between gap-1.5 md:gap-2">
              <h4 className="font-semibold text-xs md:text-sm text-slate-200 group-hover:text-gold-light transition-colors leading-tight w-full line-clamp-2">{item.name}</h4>
              <span className="text-[10px] md:text-xs text-gold-light bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full inline-block font-medium w-fit max-w-full truncate">
                {item.catLabel}
              </span>
              {item.rating && (
                <div className="flex items-center justify-center gap-1 text-[10px] md:text-xs font-medium text-slate-400 mt-auto bg-slate-900/50 px-2.5 py-1 rounded-lg">
                  <Star size={12} className="fill-gold text-gold" />
                  <span>{item.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Item Details Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedItem(null)}>
          <div className="bg-slate-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-[fadeUp_0.3s_ease] relative my-auto" onClick={e => e.stopPropagation()}>
            
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors bg-black/40 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full z-20">
              <X size={18} />
            </button>

            {selectedItem.image ? (
              <div className="w-full h-48 md:h-64 bg-slate-800 relative z-0">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              </div>
            ) : (
              <div className="w-full h-48 md:h-64 bg-gradient-to-b from-indigo-900/50 to-slate-900 relative z-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                  {getDirectoryIcon(selectedItem.cat, selectedItem.name)}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
            )}
            
            <div className="p-5 md:p-6 relative z-10 -mt-8">
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl md:text-3xl text-white mb-3 tracking-tight drop-shadow-md">{selectedItem.name}</h3>
                <div className="flex justify-center items-center gap-2.5 mb-4">
                  <span className="text-xs md:text-sm text-gold-light bg-gold/10 border border-gold/20 px-3 py-1 rounded-full font-medium shadow-inner">
                    {selectedItem.catLabel}
                  </span>
                  {selectedItem.rating && (
                    <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-white bg-white/10 border border-white/10 px-3 py-1 rounded-full shadow-inner">
                      <Star size={14} className="fill-gold text-gold" />
                      <span>{selectedItem.rating}</span>
                      <span className="text-slate-400 font-normal">({selectedItem.reviews})</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 shadow-inner">{selectedItem.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Master Order Button */}
      <button 
        onClick={() => setIsOrderModalOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-gold hover:bg-gold-light text-slate-900 font-bold px-5 py-3 md:px-6 md:py-4 rounded-full shadow-[0_4px_20px_rgba(201,148,26,0.4)] flex items-center justify-center gap-2.5 z-40 transition-transform hover:scale-105 active:scale-95 animate-[fadeUp_0.5s_ease]"
      >
        <ShoppingBag size={20} className="md:w-6 md:h-6" />
        <span className="text-sm md:text-base">Order Delivery</span>
      </button>

      {/* Reusable Simple Order Modal */}
      <DeliveryModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}
