import { useState, useEffect } from "react";
import StoriesSection from "./StoriesSection";
import { GridBannerAd, DealOfTheDay } from "./PromoBanners";
import {
 Map as MapIcon,
 Bus,
 Phone,
 Store,
 Briefcase,
 Search,
  CloudSun,
  ShoppingBag,
  ClipboardList,
  Truck,
 MapPin,
 Newspaper,
 Users,
 Camera,
  Star,
  Clock,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
interface WeatherData {
 current: { temperature_2m: number; weather_code: number };
}




const promoAds = [
  {
    id: 1,
    title: "Calicut Store",
    subtitle: "Fast & Fresh",
    desc: "Premium Local Products Delivered to Your Door",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    path: "/marketplace",
  },
  {
    id: 2,
    title: "Monsoon Sale - Electronics",
    subtitle: "Limited Time Offer",
    desc: "Up to 50% off on all home appliances.",
    cta: "View Offers",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 3,
    title: "Chaliyam Football Fest",
    subtitle: "Sports Event",
    desc: "Join the biggest local tournament this weekend.",
    cta: "Join Now",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    path: "/news",
  },
  {
    id: 4,
    title: "New Bakery Opened",
    subtitle: "Grand Opening",
    desc: "Freshly baked goods every morning.",
    cta: "Visit",
    image: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 5,
    title: "Weekend Seafood Market",
    subtitle: "Fresh Catch",
    desc: "Straight from the harbor to your plate.",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80",
    path: "/marketplace",
  },
  {
    id: 6,
    title: "Tech Gadgets Expo",
    subtitle: "Gadgets & More",
    desc: "Discover the latest tech in town.",
    cta: "See More",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 7,
    title: "Local Art Exhibition",
    subtitle: "Arts & Culture",
    desc: "Support local artists at the town square.",
    cta: "Get Directions",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    path: "/spots",
  },
  {
    id: 8,
    title: "Chaliyam Connect is Hiring",
    subtitle: "Join My Team",
    desc: "Build advanced tech zero lag or bugs with Mohd Nihad KP.",
    cta: "Contact Me",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    path: "mailto:mohdnihadkp@gmail.com",
  },
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 20) return "Good Evening";
  return "Good Night";
};

export default function Home() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [randomizedPromoAds, setRandomizedPromoAds] = useState(promoAds);
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % randomizedPromoAds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [randomizedPromoAds.length]);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch (e) {}
    }
    
    setRandomizedPromoAds([...promoAds].sort(() => 0.5 - Math.random()));
    
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=11.16&longitude=75.81&current=temperature_2m,weather_code&timezone=Asia%2FKolkata"
        );
        if (!response.ok) return;
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        // Silently ignore weather block issues to prevent console errors
      }
    };
    fetchWeather();
  }, []);
 const handleSearch = (e: React.FormEvent | string) => {
 if (typeof e !== 'string') e.preventDefault();
 const query = typeof e === 'string' ? e : searchQuery;
 if (!query.trim()) return;
 const newHistory = [query, ...searchHistory.filter((h) => h !== query)].slice(0, 5);
 setSearchHistory(newHistory);
 localStorage.setItem("searchHistory", JSON.stringify(newHistory));
 setShowHistory(false);
 /* Assuming we have a global search route or directory filtering */ navigate(
 `/directory?search=${encodeURIComponent(query)}`,
 );
 };
 const primaryActions = [
 {
 id:"bus",
 path:"/bus",
 label:"Bus Timings",
 icon: Bus,
 color:
"bg-[var(--color-primary-container)] text-[var(--color-primary)]",
 },
 {
 id:"directory",
 path:"/directory",
 label:"Directory",
 icon: Store,
 color:"bg-emerald-50 text-emerald-600",
 },
 {
 id:"marketplace",
 path:"/marketplace",
 label:"Marketplace",
 icon: Briefcase,
 color:"bg-amber-50 text-amber-600",
 },
 {
 id:"map",
 path:"/map",
 label:"Village Map",
 icon: MapIcon,
 color:"bg-blue-50 text-blue-600",
 },
 ];
 const secondaryActions = [
    { id: "news", path: "/news", label: "News & Events", icon: Newspaper, tag: null },
    { id: "tasks", path: "/tasks", label: "My Tasks", icon: ClipboardList, tag: "New" },
    { id: "people", path: "/people", label: "Special Persons", icon: Users, tag: null },
    { id: "spots", path: "/spots", label: "Popular Spots", icon: Camera, tag: null },
    { id: "promo", path: "/marketplace", label: "Local Deals", icon: Star, tag: "Featured", customColor: "bg-amber-50 text-amber-600" },
  ];
  return (
  <div className="w-full pb-24 md:pb-8 min-h-screen animate-fade-in relative">
  {""}
  {/* Top Section with Search */}{""}
  <div className="bg-[var(--color-primary)] text-[var(--color-on-primary)] pt-5 px-4 md:px-8 pb-8 rounded-b-[32px] md:rounded-b-[40px] shadow-sm relative overflow-hidden">
  {""}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)]_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.1)_0%,transparent_40%" />{""}
  <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-4">
  {""}
  <div className="flex items-center justify-between">
  {""}
  <div>
  {""}
  <h1 className="font-yatra text-2xl md:text-4xl mb-1 tracking-wide">
  {""}
  {getGreeting()},{""}
  <span className="text-[var(--color-secondary)] ml-2">
  Chaliyam
  </span>{""}
  </h1>{""}
  <p className="text-[var(--color-on-primary)] opacity-80 text-sm md:text-base font-medium flex items-center gap-1.5">
  {""}
  <MapPin size={14} /> Chaliyam, Kozhikode{""}
  </p>{""}
  </div>{""}
  {weather && (
  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20">
  {""}
  <CloudSun
  size={20}
  className="text-[var(--color-secondary)]"
  />{""}
  <span className="font-bold">
  {Math.round(weather.current.temperature_2m)}°
  </span>{""}
  </div>
  )}{""}
  </div>{""}
  <div className="relative mt-2">
  <form onSubmit={handleSearch} className="relative z-20">
  {""}
  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
  {""}
  <Search
  size={22}
  className="text-[var(--color-on-surface-variant)]"
  />{""}
  </div>{""}
  <input
  type="text"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onFocus={() => setShowHistory(true)}
  onBlur={() => setTimeout(() => setShowHistory(false), 200)}
  placeholder="Search for shops, people, buses..."
  className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white text-[var(--color-on-surface)] shadow-xl placeholder:text-[var(--color-on-surface-variant)] font-medium text-base outline-none focus:ring-4 focus:ring-white/30 transition-all"
  />{""}
  <button
  type="submit"
  className="md:hidden hidden active:scale-95 transition-all duration-150"
  tabIndex={-1}
  />{""}
  </form>{""}
   {showHistory && searchHistory.length > 0 && (
     <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl overflow-hidden z-[60] text-[var(--color-on-surface)] border-2 lg:border border-[var(--color-outline)]">
       <div className="py-2">
         <div className="px-4 py-2 flex items-center justify-between">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Searches</span>
           <button 
             onClick={(e) => {
               e.stopPropagation();
               setSearchHistory([]);
               localStorage.removeItem("searchHistory");
             }}
             className="text-xs text-[var(--color-primary)] hover:text-indigo-600 font-medium cursor-pointer"
           >
             Clear All
           </button>
         </div>
         {searchHistory.map((item, index) => (
           <div 
             key={index} 
             className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
             onClick={() => {
               setSearchQuery(item);
               handleSearch(item);
             }}
           >
             <div className="flex items-center gap-3">
               <Clock size={16} className="text-slate-400" />
               <span className="font-medium text-[15px] text-slate-700">{item}</span>
             </div>
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 const newHist = searchHistory.filter((_, i) => i !== index);
                 setSearchHistory(newHist);
                 localStorage.setItem("searchHistory", JSON.stringify(newHist));
               }}
               className="text-slate-400 hover:text-[var(--color-danger)] transition-colors p-1"
             >
               <X size={14} />
             </button>
           </div>
         ))}
       </div>
     </div>
   )}
  </div>{""}

  {/* Stories Section inserted inside header for better visual flow */}
  <div className="-mx-4 md:-mx-8">
    <StoriesSection />
  </div>

  </div>{""}
  </div>{""}
 
      
      
      
      {/* Advanced Calicut Store Dedicated Slide (Long Slide) */}
      <div className="max-w-7xl mx-auto pt-4 md:pt-6 px-4 md:px-8 -mt-6 relative z-30 mb-6 md:mb-8 animate-fade-in-up">
        <div className="group relative w-full flex flex-col md:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 lg:border border-[var(--color-outline)] transition-all duration-500 hover:shadow-indigo-500/20">
          
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-36 md:h-auto md:min-h-[300px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80" 
              alt="Calicut Store" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/40" />
            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-md px-2.5 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest rounded-full shadow-sm">
              Official Marketplace
            </div>
          </div>

          {/* Content Section */}
          <div className="relative w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col justify-center bg-slate-900 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,1)_0%,transparent_50%)]" />
            
            <div className="relative z-10 flex flex-col items-start h-full justify-center">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-6 md:w-8 h-[2px] bg-indigo-500"></div>
                <span className="text-indigo-400 font-bold text-[10px] md:text-xs tracking-widest uppercase">Premium Local Hub</span>
              </div>
              
              <h2 className="text-xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-4 tracking-tight leading-tight">
                Calicut <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Store</span>
              </h2>
              
              <p className="text-slate-300 text-xs md:text-base font-medium mb-4 md:mb-8 leading-relaxed max-w-md">
                Your one-stop destination for the freshest produce, finest local crafts, and premium groceries. 
                Experience the authentic taste and culture of Chaliyam with our hyper-local, fast delivery service bringing the market to your doorstep.
              </p>
              
              <button 
                onClick={() => navigate('/store')}
                className="bg-white hover:bg-indigo-50 text-slate-900 font-bold py-2.5 px-6 md:py-3.5 md:px-8 rounded-full flex items-center justify-center gap-2 md:gap-3 transition-all active:scale-[0.98] shadow-xl hover:shadow-indigo-500/30 text-sm md:text-base"
              >
                Explore collection
                <div className="bg-indigo-100 p-1 md:p-1.5 rounded-full text-indigo-600">
                  <Star size={14} className="md:w-4 md:h-4 w-3.5 h-3.5" fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Carousel (Top Slot) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 mb-6">
        <div className="relative w-full h-40 md:h-56 rounded-2xl overflow-hidden shadow-lg border-2 lg:border border-[var(--color-outline)] cursor-pointer active:scale-[0.98] transition-transform duration-300 group">
          {randomizedPromoAds.map((ad, index) => (
            <div 
              key={ad.id} 
              onClick={() => {
                if (ad.path.startsWith('mailto:')) {
                  window.location.href = ad.path;
                } else {
                  navigate(ad.path);
                }
              }}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentAdIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-center p-5 md:p-8">
                <span className="text-emerald-400 font-bold text-[10px] md:text-xs tracking-wider uppercase mb-1 drop-shadow-sm">{ad.subtitle}</span>
                <h2 className="text-white font-extrabold text-xl md:text-3xl mb-1 tracking-tight drop-shadow-md">{ad.title}</h2>
                <p className="text-slate-200 text-xs md:text-base font-medium mb-3 md:mb-4 max-w-[180px] md:max-w-xs drop-shadow">{ad.desc}</p>
                <div className="bg-[var(--color-primary)] hover:bg-indigo-700 text-white font-bold text-xs md:text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full w-max shadow-md shadow-indigo-600/30 transition-all active:scale-95">
                  {ad.cta}
                </div>
              </div>
            </div>
          ))}
          {/* Indicators */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
            {randomizedPromoAds.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentAdIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Home Delivery Guide Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="bg-slate-50 border-2 lg:border border-slate-200 rounded-3xl p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex-1">
              <h3 className="font-yatra text-xl text-slate-800 mb-2">How to Order</h3>
              <p className="text-sm text-slate-500 font-medium mb-5">Same day delivery in Chaliyam & nearby areas.</p>
              
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm z-10">
                    <ShoppingBag size={18} className="text-blue-600" />
                  </div>
                  <div className="text-[10px] font-bold text-blue-600 text-center">Browse</div>
                </div>
                <div className="flex-1 h-[2px] bg-slate-200 mt-5 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full hidden sm:block bg-slate-200"></div>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center shadow-sm z-10 relative">
                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    <ClipboardList size={18} className="text-violet-600" />
                  </div>
                  <div className="text-[10px] font-bold text-violet-600 text-center">Form</div>
                </div>
                <div className="flex-1 h-[2px] bg-slate-200 mt-5"></div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-sm z-10">
                    <Truck size={18} className="text-emerald-600" />
                  </div>
                  <div className="text-[10px] font-bold text-emerald-600 text-center">Delivery</div>
                </div>
              </div>
            </div>

          <div className="md:w-auto w-full flex items-center">
            <button 
              onClick={() => navigate('/order')}
              className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-800/20 transition-all active:scale-95"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Grid Menu (Primary)] */}{""}
 <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-6 relative z-20">
 {""}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
 {""}
 {primaryActions.map((action) => (
 <div
 key={action.id}
 onClick={() => navigate(action.path)}
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer hover:shadow-md transition-all duration-300 group shadow-sm active:scale-95"
 >
 {""}
 <div
 className={`p-3 md:p-4 rounded-3xl ${action.color} group-hover:scale-110 transition-transform duration-300`}
 >
 {""}
 <action.icon className="w-7 h-7 md:w-9 md:h-9" strokeWidth={2} />{""}
 </div>{""}
 <div className="font-bold text-xs md:text-base text-[var(--color-on-surface)] text-center tracking-wide">
 {action.label}
 </div>{""}
 </div>
 ))}{""}
 </div>{""}
 </div>{""}
 
  <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8">
    <DealOfTheDay />
  </div>

 {/* Emergency Single Button (Red highlight) */}{""}
 <div className="max-w-7xl mx-auto pt-4 px-4 md:px-8">
 {""}
 <div
 onClick={() => navigate("/emergency")}
 className="bg-red-50 border-2 lg:border border-red-200 rounded-2xl md:rounded-3xl p-4 md:p-5 flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-300 group shadow-sm active:scale-95"
 >
 {""}
 <div className="flex items-center gap-3 md:gap-4">
 {""}
 <div className="bg-[var(--color-danger)] text-white p-2.5 md:p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
 {""}
 <Phone className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.5} />{""}
 </div>{""}
 <div>
 {""}
 <h3 className="font-bold text-base md:text-lg text-red-900">
 Emergency Numbers
 </h3>{""}
 <p className="text-[10px] md:text-xs text-red-700/80 font-medium">
 Police, Hospital, Ambulance & Fire
 </p>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 {/* Secondary Actions (More)] */}{""}
 <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8">
 {""}
 <h3 className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-3 ml-1">
 Explore More
 </h3>{""}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {""}
 {secondaryActions.map((action) => (
 <div
 key={action.id}
 onClick={() => navigate(action.path)}
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--color-surface-variant)] transition-colors active:scale-95 relative"
 >
 {""}
 <div className={`p-2 rounded-xl ${action.customColor || 'text-[var(--color-on-surface-variant)]'}`}>
 {""}
 <action.icon size={28} strokeWidth={1.5} />{""}
 </div>{""}
 <div className="font-semibold text-xs text-[var(--color-on-surface)] text-center leading-tight">
                {action.label}
              </div>
              {action.tag && (
                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                  {action.tag}
                </div>
              )}{""}
 </div>
 ))}{""}
 </div>{""}
 </div>{""}

  <div className="max-w-7xl mx-auto pt-8 px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    <GridBannerAd 
      image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" 
      subtitle="Local Farmers" 
      title="Fresh Vegetables" 
      cta="Shop Now" 
      path="/directory" 
    />
    <GridBannerAd 
      image="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80" 
      subtitle="Authentic Gifts" 
      title="Handcrafted Souvenirs" 
      cta="Explore" 
      path="/directory" 
    />
  </div>

    </div>
  );
}
