import { useState, useRef, useEffect } from 'react';
import { BUSINESS_LISTINGS } from '../data';
import { MessageCircle, X, Search, Plus, Briefcase, MapPin, Upload, Store } from 'lucide-react';

export default function MarketplaceSection() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<typeof BUSINESS_LISTINGS[0] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset image index when opening a new item
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedItem]);

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
    <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        <div>
          <h2 className="font-yatra text-xl md:text-3xl mb-1 flex items-center gap-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Store className="text-gold-light w-6 h-6 md:w-7 md:h-7" />
            Marketplace
          </h2>
          <p className="text-slate-400 text-[11px] md:text-sm">
            Buy, sell, rent, and find local services in Chaliyam.
          </p>
        </div>
        <button 
          onClick={() => {
            setUploadedImages([]);
            setIsAddModalOpen(true);
          }}
          className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold transition-colors shadow-sm text-sm"
        >
          <Plus size={18} />
          Create Listing
        </button>
      </div>

      <div className="flex gap-2 md:gap-3 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 md:w-[18px] md:h-[18px]" />
          </div>
          <input 
            type="text" 
            placeholder="Search Marketplace" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs md:text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Pill Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {[
          { id: 'all', label: 'All Listings' },
          { id: 'sell', label: 'For Sale' },
          { id: 'buy', label: 'Wanted' },
          { id: 'rent', label: 'Rentals' },
          { id: 'service', label: 'Services' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => toggleCategory(btn.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-bold cursor-pointer transition-all whitespace-nowrap snap-start border
              ${selectedCategories.includes(btn.id)
                ? 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200 dark:border-indigo-500/30' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:border-white/10 hover:dark:bg-slate-700'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid Layout like FB Marketplace */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {filteredBusiness.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedItem(item)}
            className="flex flex-col cursor-pointer group"
          >
            <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden relative mb-2">
              {item.images && item.images.length > 0 ? (
                <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                  <Briefcase size={32} className="mb-2 opacity-50" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{item.typeLabel}</span>
                </div>
              )}
              
              {/* Type overlay at bottom-left inside image */}
              <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">
                {item.typeLabel}
              </div>
            </div>
            
            <div className="flex flex-col px-1">
              <span className="font-bold text-sm md:text-base text-gray-900 dark:text-white leading-tight mb-0.5">{item.price}</span>
              <span className="text-[13px] md:text-sm text-gray-700 dark:text-slate-300 line-clamp-1 mb-0.5">{item.title}</span>
              <span className="text-[11px] text-gray-500 dark:text-slate-500">Chaliyam • {item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredBusiness.length === 0 && (
        <div className="text-center py-10 text-slate-400">
          No listings found matching your criteria.
        </div>
      )}

      {/* Marketplace Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 dark:bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-white dark:bg-slate-900 md:border md:border-white/10 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-xl overflow-hidden shadow-2xl flex flex-col animate-[slideUp_0.3s_ease]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-gray-100 dark:border-white/10 shrink-0 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20">
              <span className="font-bold text-base text-gray-900 dark:text-white">Listing Details</span>
              <button 
                onClick={() => setSelectedItem(null)} 
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-slate-400 flex items-center justify-center hover:bg-gray-200 hover:dark:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-24">
              {/* Image Carousel */}
              <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-slate-950 relative group">
                {selectedItem.images && selectedItem.images.length > 0 ? (
                  <>
                    <img 
                      src={selectedItem.images[currentImageIndex]} 
                      alt={selectedItem.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    
                    {selectedItem.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedItem.images!.length - 1 : prev - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-black/80 transition-colors"
                        >
                          &larr;
                        </button>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => prev === selectedItem.images!.length - 1 ? 0 : prev + 1)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-black/80 transition-colors"
                        >
                          &rarr;
                        </button>
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                          {selectedItem.images.map((_, idx) => (
                            <button 
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white shadow-[0_0_2px_rgba(0,0,0,0.5)]' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-slate-500">
                    <Briefcase size={48} className="mb-2 opacity-30" />
                    <span className="text-sm font-medium">No Image Available</span>
                  </div>
                )}
              </div>
              
              {/* Core Details */}
              <div className="p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5">
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-1 leading-tight">{selectedItem.title}</h3>
                <div className="font-bold text-xl text-gray-900 dark:text-white mb-3">{selectedItem.price}</div>
                <div className="flex gap-2 text-sm text-gray-500 dark:text-slate-400 font-medium">
                  <span>Chaliyam</span>
                  <span>•</span>
                  <span>Listed {selectedItem.date}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5">
                <p className="text-base text-gray-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedItem.desc}</p>
              </div>
              
              {/* Location Map if available */}
              {selectedItem.lat && selectedItem.lng && (
                <div className="p-4 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-white/5">
                  <h4 className="font-bold text-base text-gray-900 dark:text-white mb-3">Location</h4>
                  <div className="w-full rounded-xl overflow-hidden h-[150px] relative border border-gray-200 dark:border-white/10 mb-2">
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
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.lng}`, '_blank')}
                    className="text-sm font-semibold text-indigo-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <MapPin size={16} /> Open in Google Maps
                  </button>
                </div>
              )}

              {/* Seller Info */}
              {(selectedItem.contactName || selectedItem.contactDesc) && (
                <div className="p-4 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-base text-gray-900 dark:text-white mb-3">Seller Details</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500 font-bold shrink-0">
                      {selectedItem.contactName ? selectedItem.contactName.charAt(0) : 'S'}
                    </div>
                    <div>
                      {selectedItem.contactName && <p className="font-bold text-base text-gray-900 dark:text-white">{selectedItem.contactName}</p>}
                      {selectedItem.contactDesc && <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-0.5">{selectedItem.contactDesc}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer */}
            <div className="fixed md:absolute bottom-0 left-0 right-0 p-4 pb-6 md:pb-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900 flex justify-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              <button 
                onClick={() => handleWhatsApp(selectedItem.contact, selectedItem.title)}
                className="w-full max-w-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbc5b] text-white font-bold py-3.5 rounded-xl transition-transform active:scale-95 shadow-md"
              >
                <MessageCircle size={20} />
                Send WhatsApp Message
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
