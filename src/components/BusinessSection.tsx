import { useState, useRef, useEffect } from 'react';
import { BUSINESS_LISTINGS } from '../data';
import { MessageCircle, X, Search, Plus, Briefcase, MapPin, Upload } from 'lucide-react';

export default function BusinessSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof BUSINESS_LISTINGS[0] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

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

  const filteredBusiness = BUSINESS_LISTINGS.filter(c => {
    const matchesFilter = selectedCategories.includes('all') || selectedCategories.includes(c.type);
    const q = searchQuery.toLowerCase();
    const matchesSearch = c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handleWhatsApp = (contact: string, title: string) => {
    const cleanPhone = contact.replace(/[^0-9]/g, '');
    const message = `Hello, I saw your listing "${title}" on Chaliyam Connect and I am interested.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages: string[] = [];
    const remainingSlots = 3 - uploadedImages.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type');
    const title = formData.get('title');
    const desc = formData.get('desc');
    const price = formData.get('price');
    const contactName = formData.get('contactName');
    const contactDesc = formData.get('contactDesc');
    const contactPhone = formData.get('contactPhone');
    
    const message = `*New Listing Request*\n\n*Type:* ${type}\n*Title:* ${title}\n*Description:* ${desc}\n*Price:* ${price}\n*Contact Name:* ${contactName}\n*About:* ${contactDesc || 'N/A'}\n*Phone:* ${contactPhone}\n*Images:* ${uploadedImages.length > 0 ? 'Attached' : 'None'}`;
    
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsAddModalOpen(false);
    setUploadedImages([]);
  };

  return (
    <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-yatra text-2xl md:text-3xl mb-1.5 flex items-center gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Briefcase className="text-gold-light" size={28} />
            Local <span className="text-gold-light">Business</span>
          </h2>
          <p className="text-slate-400 text-sm">
            ചാലിയം ബിസിനസ് — Buy, sell, rent, and find services in Chaliyam
          </p>
        </div>
        <button 
          onClick={() => {
            setUploadedImages([]);
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 border border-gold/30 text-gold-light px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm backdrop-blur-md"
        >
          <Plus size={18} />
          Add New Listing
        </button>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search listings by title or description..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-white/10 bg-white/5 backdrop-blur-md text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { id: 'all', label: 'All' },
          { id: 'sell', label: 'For Sale' },
          { id: 'buy', label: 'Wanted' },
          { id: 'rent', label: 'Rent' },
          { id: 'service', label: 'Services' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => toggleCategory(btn.id)}
            className={`px-4 py-2 rounded-full border-[1.5px] text-[13px] cursor-pointer transition-all font-sans backdrop-blur-md
              ${selectedCategories.includes(btn.id)
                ? 'bg-gold/20 text-gold-light border-gold/30 shadow-[0_0_15px_rgba(201,148,26,0.15)]' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBusiness.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedItem(item)}
            className="bg-white/5 backdrop-blur-md rounded-[14px] overflow-hidden border border-white/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,148,26,0.1)] cursor-pointer flex flex-col"
          >
            {item.images && item.images.length > 0 && (
              <div className="w-full h-32 bg-slate-900 overflow-hidden">
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="bg-slate-900/50 px-4 py-3 flex justify-between items-center border-b border-white/5">
              <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded border
                ${item.type === 'sell' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                ${item.type === 'buy' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                ${item.type === 'rent' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                ${item.type === 'service' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
              `}>
                {item.typeLabel}
              </span>
              <span className="text-[11px] text-slate-400">{item.date}</span>
            </div>
            <div className="px-4 py-3.5 flex-1 flex flex-col">
              <h4 className="font-semibold text-sm mb-1.5 text-slate-200">{item.title}</h4>
              <p className="text-[13px] text-slate-400 mb-2.5 line-clamp-2 flex-1">{item.desc}</p>
              <div className="font-yatra text-lg text-gold-light">{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredBusiness.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No listings found matching your criteria.
        </div>
      )}

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease] max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0">
              <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-1 rounded border
                ${selectedItem.type === 'sell' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                ${selectedItem.type === 'buy' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                ${selectedItem.type === 'rent' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : ''}
                ${selectedItem.type === 'service' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
              `}>
                {selectedItem.typeLabel}
              </span>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-red-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto">
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 snap-x">
                  {selectedItem.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${selectedItem.title} - ${idx + 1}`} className="h-48 w-auto object-cover rounded-xl shrink-0 snap-center border border-white/10" />
                  ))}
                </div>
              )}
              
              <h3 className="font-semibold text-xl text-slate-200 mb-2">{selectedItem.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{selectedItem.date}</p>
              <p className="text-base text-slate-300 mb-6 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">{selectedItem.desc}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="font-yatra text-2xl text-gold-light">{selectedItem.price}</div>
                {selectedItem.lat && selectedItem.lng && (
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.lng}`, '_blank')}
                    className="flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/20"
                  >
                    <MapPin size={16} />
                    View on Google Maps
                  </button>
                )}
              </div>

              {selectedItem.lat && selectedItem.lng && (
                <div className="mb-6 rounded-xl overflow-hidden border border-white/10 h-48 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src={`https://maps.google.com/maps?q=${selectedItem.lat},${selectedItem.lng}&z=15&output=embed`}
                  ></iframe>
                </div>
              )}

              {(selectedItem.contactName || selectedItem.contactDesc) && (
                <div className="mb-6 border-t border-white/10 pt-4">
                  <h4 className="text-sm font-semibold text-slate-200 mb-2">Contact Person</h4>
                  {selectedItem.contactName && <p className="text-base font-medium text-gold-light">{selectedItem.contactName}</p>}
                  {selectedItem.contactDesc && <p className="text-sm text-slate-400 mt-1">{selectedItem.contactDesc}</p>}
                </div>
              )}
              
              <button 
                onClick={() => handleWhatsApp(selectedItem.contact, selectedItem.title)}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3.5 rounded-xl transition-colors font-medium text-base shadow-md"
              >
                <MessageCircle size={20} />
                Contact via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Listing Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease] max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-white/10 shrink-0 bg-gradient-to-r from-slate-800 to-slate-900">
              <h3 className="font-semibold text-lg text-gold-light">Add New Listing</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-red-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-5 flex flex-col gap-4 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Listing Type</label>
                <select name="type" required className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 appearance-none">
                  <option value="sell">For Sale</option>
                  <option value="buy">Wanted</option>
                  <option value="rent">Rent</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Title</label>
                <input name="title" required type="text" placeholder="E.g., Used Bicycle for Sale" className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Description</label>
                <textarea name="desc" required rows={3} placeholder="Provide details about your listing..." className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 resize-none placeholder:text-slate-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Price</label>
                <input name="price" required type="text" placeholder="E.g., ₹ 5,000 or Contact for Price" className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500" />
              </div>

              <div className="border-t border-white/10 pt-4 mt-2">
                <h4 className="text-sm font-semibold text-slate-200 mb-3">Contact Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">Contact Name</label>
                    <input name="contactName" required type="text" placeholder="Your Name" className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">About You (Optional)</label>
                    <input name="contactDesc" type="text" placeholder="E.g., Local fisherman, Property owner" className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-1.5">WhatsApp Contact Number</label>
                    <input name="contactPhone" required type="tel" placeholder="+91 98765 43210" className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-slate-200">Images (Max 3)</label>
                  <span className="text-xs text-slate-400">{uploadedImages.length}/3 uploaded</span>
                </div>
                
                {uploadedImages.length < 3 && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/20 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors mb-3"
                  >
                    <Upload size={24} className="text-gold-light mb-2" />
                    <span className="text-sm text-slate-400">Click to upload images</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                  </div>
                )}

                {uploadedImages.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10">
                        <img src={img} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-gold hover:bg-gold-light text-white py-3 rounded-xl font-medium transition-colors mt-4 shrink-0">
                Submit Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
