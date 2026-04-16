import { useState, useEffect } from 'react';
import { PEOPLE } from '../data';
import { Phone, MessageCircle, Building, Camera, Wrench, Palmtree, Globe, Search, Plus, X } from 'lucide-react';

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
  const [sortBy, setSortBy] = useState('name-asc');
  
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    category: 'Service',
    image: '',
    website: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const filteredPeople = PEOPLE.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Hello ${name}, I found your contact on Chaliyam Connect.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    }
    
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits).';
    }
    
    if (formData.image.trim() && !/^https?:\/\/.+\..+/.test(formData.image.trim())) {
      newErrors.image = 'Please enter a valid image URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = `*New Profile Submission for Chaliyam Connect*\n\n*Name:* ${formData.name}\n*Role:* ${formData.role}\n*Category:* ${formData.category}\n*Phone:* ${formData.phone}\n*Website:* ${formData.website || 'N/A'}\n*Image URL:* ${formData.image || 'N/A'}`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    
    setIsSubmitModalOpen(false);
    setFormData({ name: '', role: '', phone: '', category: 'Service', image: '', website: '' });
    setErrors({});
  };

  return (
    <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-5 md:mb-8">
        <div>
          <h2 className="font-yatra text-xl md:text-[28px] mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Palmtree className="text-gold-light w-6 h-6 md:w-7 md:h-7" />
            Special <span className="text-gold-light">Persons</span>
          </h2>
          <p className="text-slate-400 text-xs md:text-sm">
            പ്രധാന വ്യക്തികൾ — Key contacts and professionals in Chaliyam
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gold/20 hover:bg-gold/30 border border-gold/30 text-gold-light px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-colors shadow-sm backdrop-blur-md text-sm md:text-base"
        >
          <Plus size={18} />
          Submit Profile
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 mb-4 md:mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-400 md:w-[18px] md:h-[18px]" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name, role, or category..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-[1.5px] border-white/10 bg-white/5 backdrop-blur-md text-xs md:text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 placeholder:text-slate-500"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-[1.5px] border-white/10 bg-slate-900 text-xs md:text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 appearance-none cursor-pointer min-w-[140px] md:min-w-[160px] shadow-inner"
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 flex-wrap">
        {[
          { id: 'all', label: 'All', icon: null },
          { id: 'Govt', label: 'Govt & Officials', icon: <Building size={14} className="md:w-4 md:h-4" /> },
          { id: 'Media', label: 'Media & Photo', icon: <Camera size={14} className="md:w-4 md:h-4" /> },
          { id: 'Service', label: 'Services', icon: <Wrench size={14} className="md:w-4 md:h-4" /> },
          { id: 'Tourism', label: 'Tourism', icon: <Palmtree size={14} className="md:w-4 md:h-4" /> },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border-[1.5px] text-xs md:text-[13px] cursor-pointer transition-all font-sans flex items-center gap-1.5 md:gap-2
              ${filter === btn.id 
                ? 'bg-gold/20 text-gold-light border-gold/30 shadow-[0_0_15px_rgba(201,148,26,0.15)]' 
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-slate-200 hover:border-white/20'
              }`}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {filteredPeople.map((person: any, index) => (
          <div 
            key={person.id || index} 
            className="bg-white/5 backdrop-blur-md rounded-xl md:rounded-[14px] p-4 md:p-5 border border-white/10 shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,148,26,0.1)]"
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
                
                <div className="flex gap-2 mt-1">
                  <button 
                    onClick={() => handleWhatsApp(person.phone, person.name)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-lg transition-colors font-medium text-sm shadow-sm"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => {
                      setFormData({
                        name: person.name,
                        role: person.role,
                        phone: person.phone,
                        category: person.category,
                        image: person.image || '',
                        website: person.website || ''
                      });
                      setIsSubmitModalOpen(true);
                    }}
                    className="px-3 flex items-center justify-center bg-white/10 hover:bg-white/20 text-slate-200 py-2 rounded-lg transition-colors font-medium text-sm border border-white/10"
                    title="Edit Profile"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredPeople.length === 0 && (
          <div className="col-span-full py-10 text-center text-slate-400">
            No people found matching your search.
          </div>
        )}
      </div>

      {/* Submit Profile Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-slate-800 to-slate-900">
              <h3 className="font-semibold text-lg text-gold-light">Submit Profile</h3>
              <button onClick={() => { setIsSubmitModalOpen(false); setErrors({}); }} className="text-slate-400 hover:text-red-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitProfile} className="p-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-gold/50'} bg-slate-800 text-slate-200 focus:outline-none placeholder:text-slate-500`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Role / Profession <span className="text-red-400">*</span></label>
                <input 
                  required
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500"
                  placeholder="E.g., Electrician, Photographer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Phone Number <span className="text-red-400">*</span></label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    if (errors.phone) setErrors({...errors, phone: ''});
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-gold/50'} bg-slate-800 text-slate-200 focus:outline-none placeholder:text-slate-500`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Category <span className="text-red-400">*</span></label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 appearance-none"
                >
                  <option value="Govt">Govt & Officials</option>
                  <option value="Media">Media & Photo</option>
                  <option value="Service">Services</option>
                  <option value="Tourism">Tourism</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Profile Image URL</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({...formData, image: e.target.value});
                    if (errors.image) setErrors({...errors, image: ''});
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border ${errors.image ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-gold/50'} bg-slate-800 text-slate-200 focus:outline-none placeholder:text-slate-500`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && <p className="text-red-400 text-xs mt-1.5">{errors.image}</p>}
                <p className="text-xs text-slate-500 mt-1.5">Optional. Provide a direct link to your photo.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Website URL (Optional)</label>
                <input 
                  type="url" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-slate-800 text-slate-200 focus:outline-none focus:border-gold/50 placeholder:text-slate-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/90 hover:bg-[#25D366] border border-[#25D366]/50 text-white py-3 rounded-xl font-medium transition-colors mt-2 shadow-[0_0_15px_rgba(37,211,102,0.2)]"
              >
                <MessageCircle size={20} />
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
