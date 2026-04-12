import { useState, useEffect } from 'react';
import { PEOPLE } from '../data';
import { Phone, MessageCircle, Edit, X, Plus, Users, Building, Camera, Wrench, Palmtree, Globe, Info, Search } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, onSnapshot } from 'firebase/firestore';

interface Person {
  id?: string;
  name: string;
  role: string;
  phone: string;
  image: string;
  category: string;
  userId?: string;
  website?: string;
}

export default function PeopleSection() {
  const [filter, setFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const [dynamicPeople, setDynamicPeople] = useState<Person[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<Person>({
    name: '',
    role: '',
    phone: '',
    image: '',
    category: 'Service',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showCTA, setShowCTA] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    // Listen to dynamic people from Firestore
    const unsubscribe = onSnapshot(collection(db, 'people'), (snapshot) => {
      const peopleData: Person[] = [];
      snapshot.forEach((doc) => {
        peopleData.push({ id: doc.id, ...doc.data() } as Person);
      });
      setDynamicPeople(peopleData);
    }, (error) => {
      console.error("Error fetching people:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && isEditModalOpen) {
      // Load user's existing profile if they have one
      const loadUserProfile = async () => {
        try {
          const docRef = doc(db, 'people', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as Person);
          } else {
            setFormData({
              name: user.displayName || '',
              role: '',
              phone: '',
              image: user.photoURL || '',
              category: 'Service',
              website: '',
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };
      loadUserProfile();
    }
  }, [user, isEditModalOpen]);

  const allPeople = [...PEOPLE, ...dynamicPeople] as Person[];
  const filteredPeople = allPeople.filter(p => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
  const userHasProfile = dynamicPeople.some(p => p.id === user?.uid);

  const handleWhatsApp = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = `Hello ${name}, I found your contact on Chaliyam Connect.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'people', user.uid), {
        ...formData,
        userId: user.uid,
        updatedAt: new Date().toISOString()
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-6 md:py-10 px-4 md:px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-yatra text-2xl md:text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
            <Users className="text-gold" size={28} />
            Special <span className="text-gold">Persons</span>
          </h2>
          <p className="text-text-light text-sm">
            പ്രധാന വ്യക്തികൾ — Key contacts and professionals in Chaliyam
          </p>
        </div>
        {user && (
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            {userHasProfile ? <Edit size={18} /> : <Plus size={18} />}
            {userHasProfile ? 'Edit My Profile' : 'Create Profile'}
          </button>
        )}
      </div>

      {user && !userHasProfile && showCTA && (
        <div className="bg-green-pale dark:bg-[#0f2919] border border-green-deep/20 dark:border-gold/20 rounded-xl p-4 mb-8 flex items-start justify-between gap-4 relative shadow-sm">
          <div className="flex gap-3">
            <div className="bg-green-deep/10 dark:bg-gold/10 p-2 rounded-full shrink-0 h-fit">
              <Info size={20} className="text-green-deep dark:text-gold-light" />
            </div>
            <div>
              <h4 className="font-semibold text-text-dark dark:text-white mb-1">Join the Community Directory</h4>
              <p className="text-sm text-text-light mb-3">Create your community profile to be listed here. Help others find your services or contact you easily.</p>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="text-sm font-medium text-white bg-green-deep hover:bg-green-mid px-4 py-2 rounded-lg transition-colors"
              >
                Create Your Community Profile
              </button>
            </div>
          </div>
          <button onClick={() => setShowCTA(false)} className="text-text-light hover:text-red-500 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-text-light" />
          </div>
          <input 
            type="text" 
            placeholder="Search by name or role..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold placeholder:text-text-light/70 dark:placeholder:text-text-light/50"
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
                ? 'bg-green-deep text-white border-green-deep' 
                : 'bg-white dark:bg-[#1a2e20] text-text-mid dark:text-text-light border-green-deep/20 dark:border-gold/20 hover:bg-green-deep dark:hover:bg-[#2d7a4f] hover:text-white hover:border-green-deep'
              }`}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
        {filteredPeople.map((person, index) => (
          <div 
            key={person.id || index} 
            className="bg-white dark:bg-[#1a2e20] rounded-2xl p-5 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] flex flex-col items-center text-center transition-transform duration-250 hover:-translate-y-1"
          >
            <img 
              src={person.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`} 
              alt={person.name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-green-pale dark:border-[#0f2919] shadow-sm mb-4"
            />
            <h3 className="text-lg font-semibold text-text-dark dark:text-white mb-1">{person.name}</h3>
            <p className="text-sm text-gold-dark dark:text-gold-light font-medium mb-4">{person.role}</p>
            
            <div className="w-full mt-auto border-t border-green-deep/10 dark:border-gold/10 pt-4">
              <h4 className="text-xs font-semibold text-text-light uppercase tracking-wider mb-3 text-left">Contact Info</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-text-dark dark:text-white bg-gray-50 dark:bg-[#0f2919] px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
                  <Phone size={14} className="text-green-deep dark:text-gold-light shrink-0" />
                  <span className="truncate">{person.phone}</span>
                </div>
                
                {person.website && (person.category === 'Govt' || person.category === 'Service') && (
                  <a 
                    href={person.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900/30 transition-colors"
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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f2919] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-green-deep/10 dark:border-gold/10">
              <h3 className="font-semibold text-lg text-green-deep dark:text-gold-light">
                {dynamicPeople.some(p => p.id === user?.uid) ? 'Edit Profile' : 'Create Profile'}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-text-light hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Role / Profession</label>
                <input 
                  required
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                  placeholder="E.g., Electrician, Photographer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Category</label>
                <select 
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="Govt">Govt & Officials</option>
                  <option value="Media">Media & Photo</option>
                  <option value="Service">Services</option>
                  <option value="Tourism">Tourism</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Profile Image URL (Optional)</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1.5">Website URL (Optional)</label>
                <input 
                  type="url" 
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-text-dark dark:text-white focus:outline-none focus:border-gold"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <button 
                type="submit"
                disabled={isSaving}
                className="w-full bg-gold hover:bg-gold-dark text-white py-3 rounded-xl font-medium transition-colors mt-2 disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
