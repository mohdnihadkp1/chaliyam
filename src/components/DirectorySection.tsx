import { useState } from 'react';
import { DIRECTORY } from '../data';
import { Star, Fish, Utensils, Pill, Wrench, ShoppingCart, BookOpen, Scissors, Plug, IceCream, Phone as PhoneIcon, Store, Search, Truck, X } from 'lucide-react';

export default function DirectorySection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<{name: string, catLabel: string} | null>(null);
  
  const [deliveryForm, setDeliveryForm] = useState({
    items: '',
    address: '',
    phone: ''
  });

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
    if (cat === 'fishing') return <Fish size={24} className="text-[#0277bd]" />;
    if (cat === 'food' && name.includes('Ice Cream')) return <IceCream size={24} className="text-[#e91e63]" />;
    if (cat === 'food') return <Utensils size={24} className="text-[#e65100]" />;
    if (cat === 'medical') return <Pill size={24} className="text-[#2e7d32]" />;
    if (cat === 'retail' && name.includes('Book')) return <BookOpen size={24} className="text-[#6a1b9a]" />;
    if (cat === 'retail') return <ShoppingCart size={24} className="text-[#f57c00]" />;
    if (name.includes('Saloon')) return <Scissors size={24} className="text-[#455a64]" />;
    if (name.includes('Electrical')) return <Plug size={24} className="text-[#fbc02d]" />;
    if (name.includes('Mobile')) return <PhoneIcon size={24} className="text-[#1976d2]" />;
    if (cat === 'service') return <Wrench size={24} className="text-[#607d8b]" />;
    return <Store size={24} className="text-[#2d7a4f]" />;
  };

  const handleDeliveryRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShop) return;

    const teamWhatsAppNumber = "919846750898"; // Chaliyam Connect Team Number
    const message = `*New Delivery Request!*\n\n*Shop:* ${selectedShop.name}\n*Items Needed:*\n${deliveryForm.items}\n\n*Delivery Address:*\n${deliveryForm.address}\n*Contact Phone:* ${deliveryForm.phone}\n\n_Note: I agree to pay the small delivery fee upon arrival._`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${teamWhatsAppNumber}?text=${encodedMessage}`, '_blank');
    
    setDeliveryModalOpen(false);
    setDeliveryForm({ items: '', address: '', phone: '' });
  };

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-yatra text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
            <Store className="text-gold" size={28} />
            Local <span className="text-gold">Directory</span>
          </h2>
          <p className="text-text-light text-sm">
            ചാലിയത്തിലെ ബിസിനസ് ഡയറക്ടറി — Find businesses and services near you
          </p>
        </div>
        
        <div className="bg-gold-pale dark:bg-gold-dark/20 border border-gold/30 rounded-xl px-4 py-3 flex items-center gap-3 max-w-md">
          <div className="bg-gold/20 p-2 rounded-full shrink-0">
            <Truck size={20} className="text-gold-dark dark:text-gold-light" />
          </div>
          <p className="text-xs text-gold-dark dark:text-gold-light leading-relaxed">
            <strong>Need something delivered?</strong> Choose a shop below and request delivery. Our team will buy and deliver the goods to your home for a small fee!
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-light" />
          </div>
          <input 
            type="text" 
            placeholder="Search businesses, shops, services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold placeholder:text-text-light/70 dark:placeholder:text-text-light/50"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
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
            className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] cursor-pointer transition-all font-sans
              ${selectedCategories.includes(btn.id)
                ? 'bg-green-deep text-white border-green-deep' 
                : 'bg-white dark:bg-[#1a2e20] text-text-mid dark:text-text-light border-green-deep/20 dark:border-gold/20 hover:bg-green-deep dark:hover:bg-[#2d7a4f] hover:text-white hover:border-green-deep'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {filteredDirectory.map((item, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-[#1a2e20] rounded-[14px] p-4 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex gap-3.5 items-start mb-4">
              <div className="w-11 h-11 rounded-xl bg-green-pale dark:bg-[#0f2919] flex items-center justify-center shrink-0">
                {getDirectoryIcon(item.cat, item.name)}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-text-dark dark:text-white mb-1">{item.name}</h4>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] text-gold-dark dark:text-gold-light bg-gold-pale dark:bg-gold-dark/20 px-2 py-0.5 rounded inline-block font-medium">
                    {item.catLabel}
                  </span>
                  {item.rating && (
                    <div className="flex items-center gap-1 text-[11px] font-medium text-text-mid dark:text-text-light">
                      <Star size={12} className="fill-gold text-gold" />
                      <span>{item.rating}</span>
                      <span className="opacity-60">({item.reviews})</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-text-light">{item.desc}</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setSelectedShop({ name: item.name, catLabel: item.catLabel });
                setDeliveryModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-green-deep/5 hover:bg-green-deep/10 dark:bg-gold/10 dark:hover:bg-gold/20 text-green-deep dark:text-gold-light text-xs font-semibold transition-colors border border-green-deep/10 dark:border-gold/20"
            >
              <Truck size={14} />
              Request Delivery
            </button>
          </div>
        ))}
      </div>

      {/* Delivery Request Modal */}
      {deliveryModalOpen && selectedShop && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2e20] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-green-deep/10 dark:border-gold/10">
              <h3 className="font-semibold text-lg text-text-dark dark:text-white flex items-center gap-2">
                <Truck size={20} className="text-green-deep dark:text-gold-light" />
                Request Delivery
              </h3>
              <button onClick={() => setDeliveryModalOpen(false)} className="text-text-light hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="bg-green-pale dark:bg-[#0f2919] p-3 rounded-xl mb-5 border border-green-deep/10 dark:border-gold/10">
                <p className="text-xs text-text-light mb-1">Ordering from:</p>
                <p className="font-semibold text-green-deep dark:text-gold-light">{selectedShop.name}</p>
              </div>

              <form onSubmit={handleDeliveryRequest} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Items to Buy</label>
                  <textarea 
                    required
                    rows={3} 
                    placeholder="E.g., 1kg Sugar, 2 packets of milk, 1 bread..." 
                    value={deliveryForm.items}
                    onChange={(e) => setDeliveryForm({...deliveryForm, items: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2919] text-text-dark dark:text-white outline-none focus:border-green-500 resize-none text-sm"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Delivery Address</label>
                  <textarea 
                    required
                    rows={2} 
                    placeholder="Your home address in Chaliyam..." 
                    value={deliveryForm.address}
                    onChange={(e) => setDeliveryForm({...deliveryForm, address: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2919] text-text-dark dark:text-white outline-none focus:border-green-500 resize-none text-sm"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Contact Phone</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="Your phone number" 
                    value={deliveryForm.phone}
                    onChange={(e) => setDeliveryForm({...deliveryForm, phone: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2919] text-text-dark dark:text-white outline-none focus:border-green-500 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-xs text-text-light mb-4 text-center">
                    By clicking submit, you will be redirected to WhatsApp to send this request to our delivery team. A small delivery fee will apply.
                  </p>
                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <PhoneIcon size={18} />
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
