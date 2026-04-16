import { useState, useEffect } from 'react';
import { Map as MapIcon, Camera, Bus, Phone, Store, Users, Newspaper, Briefcase, CloudRain, Wind, Waves, Sun, CloudSun, Droplets, AlertCircle, CloudLightning, Cloud, Snowflake, ChevronLeft, ChevronRight, MapPin, ShoppingBag, Compass, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DeliveryModal from './DeliveryModal';

interface WeatherData {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=11.16&longitude=75.81&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  const quickActions = [
    { id: 'map', path: '/map', label: 'Village Map', icon: <MapIcon size={32} /> },
    { id: 'spots', path: '/spots', label: 'Popular Spots', icon: <Camera size={32} /> },
    { id: 'bus', path: '/bus', label: 'Bus Timings', icon: <Bus size={32} /> },
    { id: 'emergency', path: '/emergency', label: 'Emergency', icon: <Phone size={32} /> },
    { id: 'directory', path: '/directory', label: 'Directory', icon: <Store size={32} /> },
    { id: 'people', path: '/people', label: 'Special Persons', icon: <Users size={32} /> },
    { id: 'news', path: '/news', label: 'News & Events', icon: <Newspaper size={32} /> },
    { id: 'business', path: '/business', label: 'Business', icon: <Briefcase size={32} /> },
  ];

  const getWeatherIcon = (code: number, size: number = 24) => {
    if (code === 0) return <Sun size={size} />;
    if (code >= 1 && code <= 3) return <CloudSun size={size} />;
    if (code >= 45 && code <= 48) return <Cloud size={size} />;
    if (code >= 51 && code <= 67) return <CloudRain size={size} />;
    if (code >= 71 && code <= 77) return <Snowflake size={size} />;
    if (code >= 80 && code <= 82) return <CloudRain size={size} />;
    if (code >= 95 && code <= 99) return <CloudLightning size={size} />;
    return <Sun size={size} />;
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code === 45) return "Fog";
    if (code === 48) return "Depositing rime fog";
    if (code === 51) return "Light drizzle";
    if (code === 53) return "Moderate drizzle";
    if (code === 55) return "Dense drizzle";
    if (code === 56) return "Light freezing drizzle";
    if (code === 57) return "Dense freezing drizzle";
    if (code === 61) return "Slight rain";
    if (code === 63) return "Moderate rain";
    if (code === 65) return "Heavy rain";
    if (code === 66) return "Light freezing rain";
    if (code === 67) return "Heavy freezing rain";
    if (code === 71) return "Slight snow fall";
    if (code === 73) return "Moderate snow fall";
    if (code === 75) return "Heavy snow fall";
    if (code === 77) return "Snow grains";
    if (code === 80) return "Slight rain showers";
    if (code === 81) return "Moderate rain showers";
    if (code === 82) return "Violent rain showers";
    if (code === 85) return "Slight snow showers";
    if (code === 86) return "Heavy snow showers";
    if (code === 95) return "Thunderstorm";
    if (code === 96) return "Thunderstorm with slight hail";
    if (code === 99) return "Thunderstorm with heavy hail";
    return "Unknown";
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const adSlides = [
    {
      title: "Interactive Village Map",
      desc: "Explore Chaliyam with our custom map. Find popular spots, emergency contacts, and transport hubs easily.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200",
      icon: <MapIcon size={16} />
    },
    {
      title: "Live Bus Timings",
      desc: "Never miss a ride. Get accurate schedules for buses to Kozhikode, Feroke, and Beypore.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
      icon: <Bus size={16} />
    },
    {
      title: "Local Business Directory",
      desc: "Support local. Discover shops, services, and fresh catch directly from Chaliyam's merchants.",
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=1200",
      icon: <Store size={16} />
    },
    {
      title: "Community News & Events",
      desc: "Stay connected. Get the latest updates, festival announcements, and local alerts in real-time.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1200",
      icon: <Newspaper size={16} />
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-slate-950 pt-[30px] md:pt-[40px] px-4 md:px-8 pb-[30px] md:pb-[50px] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,148,26,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(76,175,120,0.1)_0%,transparent_40%)]" />
        
        <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-gold-light px-3 py-1 rounded-full text-[10px] tracking-[1.5px] uppercase mb-3 md:mb-4 relative z-10">
          <Waves size={12} /> Chaliyam • ചാലിയം
        </div>
        
        <h1 className="font-yatra text-[clamp(28px,5vw,56px)] leading-[1.1] mb-1.5 relative z-10 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Chaliyam <span className="text-gold-light">Connect</span>
        </h1>
        
        <p className="font-malayalam text-sm md:text-base text-slate-400 mb-3 md:mb-4 relative z-10">നിങ്ങളുടെ നാടിന്റെ ഡിജിറ്റൽ കൂട്ടായ്മ</p>
        
        <p className="text-[11px] md:text-sm text-slate-300 max-w-[450px] mx-auto mb-5 md:mb-6 leading-[1.6] relative z-10">
          Your community hub for Chaliyam — maps, bus timings, emergency contacts, local spots, businesses, and everything you need about our village.
        </p>
        
        <div className="max-w-4xl mx-auto relative z-10 overflow-hidden rounded-xl shadow-2xl border border-white/10">
          <div className="relative h-36 md:h-64 w-full bg-slate-900">
            {adSlides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent flex flex-col justify-end p-4 md:p-8 text-left">
                  <span className="inline-flex items-center gap-1 bg-gold/20 text-gold-light border border-gold/30 text-[9px] md:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 w-fit backdrop-blur-md">
                    {slide.icon} Feature
                  </span>
                  <h2 className="font-yatra text-lg md:text-3xl text-white mb-1 transform transition-all duration-700 translate-y-0">{slide.title}</h2>
                  <p className="text-slate-300 text-[10px] md:text-sm max-w-2xl transform transition-all duration-700 delay-100 translate-y-0 line-clamp-1 md:line-clamp-2">{slide.desc}</p>
                </div>
              </div>
            ))}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 right-4 md:right-8 flex gap-1.5 z-20">
              {adSlides.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-gold w-6' : 'bg-white/50 hover:bg-white/80 w-2'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + adSlides.length) % adSlides.length)}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % adSlides.length)}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto pt-4 md:pt-6 pb-2 px-3 md:px-8">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
          {quickActions.map((action) => (
            <div 
              key={action.id}
              onClick={() => navigate(action.path)}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 md:p-4 flex flex-col items-center justify-center gap-1.5 md:gap-2 cursor-pointer hover:scale-[1.02] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(201,148,26,0.15)] transition-all duration-300"
            >
              <div className="text-gold-light scale-[0.65] md:scale-90">{action.icon}</div>
              <div className="font-semibold text-[9px] md:text-xs text-slate-200 text-center leading-tight">{action.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Brief Ordering Feature */}
      <div className="max-w-7xl mx-auto pt-2 pb-2 md:pb-4 px-3 md:px-8">
        <div className="bg-white/5 border border-gold/20 rounded-xl p-3 md:p-5 backdrop-blur-md shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 relative z-10 w-full">
            <div className="flex items-start gap-3 md:gap-4 flex-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/20 rounded-xl flex items-center justify-center text-gold-light border border-gold/30 shrink-0 mt-1">
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="font-yatra text-lg md:text-xl text-white mb-1.5 leading-tight">
                  Order Anything in Chaliyam!
                </h3>
                <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed mb-2">
                  Need items from the village shops? Just tell us what you need in one simple form!
                </p>
                <div className="text-[10px] md:text-xs text-slate-400 bg-slate-900/50 p-2 md:p-2.5 rounded-lg border border-white/5 inline-block shadow-inner w-full md:w-auto">
                  <strong>Instructions:</strong> Click order, list your items and shops, add your address, and send via WhatsApp.
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOrderModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-slate-900 px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold shadow-md transition-colors whitespace-nowrap shrink-0 text-sm md:text-base border border-gold/50"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Calicut Store Promo Button */}
      <div className="max-w-7xl mx-auto pb-4 md:pb-6 px-3 md:px-8">
        <div 
          onClick={() => navigate('/store')}
          className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-900 dark:via-indigo-800 dark:to-slate-900 border border-indigo-400/30 dark:border-indigo-500/30 rounded-xl p-3 md:p-5 flex items-center justify-between cursor-pointer hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden relative"
        >
          {/* Subtle flare effect */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/20 blur-3xl rounded-full group-hover:bg-white/30 transition-all duration-500"></div>
          <div className="absolute bottom-0 left-20 w-40 h-20 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-400/30 transition-all duration-500"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 dark:bg-white/5 rounded-xl flex items-center justify-center text-white backdrop-blur-md border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <ShoppingBag size={26} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h3 className="font-yatra text-xl md:text-2xl text-white mb-0.5 md:mb-1 group-hover:text-indigo-100 transition-colors">
                Calicut Store
              </h3>
              <p className="text-white/80 dark:text-indigo-200/80 text-xs md:text-sm font-medium tracking-wide">
                Premium Multi-Category E-Commerce Website
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center text-white/90 dark:text-white/70 group-hover:text-white transition-colors bg-white/10 dark:bg-white/5 px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-sm group-hover:bg-white/20">
            <span className="hidden sm:inline text-sm font-bold mr-2 uppercase tracking-wider">Shop Now</span>
            <span className="sm:hidden text-xs font-bold mr-1 uppercase">Shop</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Platform Features & Ideas Advertisement */}
      <div className="max-w-7xl mx-auto pb-4 md:pb-6 px-3 md:px-8">
        <h2 className="font-yatra text-lg md:text-2xl mb-2 md:mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Explore Our <span className="text-indigo-600 dark:text-gold-light">Vision</span>
        </h2>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {/* Card 1 */}
          <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-2.5 md:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center md:items-start md:text-left">
            <div className="absolute -right-6 -top-6 w-16 h-16 md:w-24 md:h-24 bg-indigo-50 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-100 dark:group-hover:bg-white/10 transition-colors duration-500"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-50 dark:bg-gold/10 rounded-lg flex items-center justify-center text-indigo-600 dark:text-gold-light mb-1.5 md:mb-3 relative z-10 border border-indigo-100 dark:border-gold/20 shrink-0">
              <Compass size={24} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-[10px] md:text-[13px] font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 relative z-10 leading-tight">Future Ideas</h3>
            <p className="text-[8px] md:text-[11px] text-gray-500 dark:text-slate-300 leading-tight md:leading-snug relative z-10 line-clamp-2 md:line-clamp-none">
              Innovating local AI insights & seamless interactions.
            </p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-2.5 md:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center md:items-start md:text-left">
            <div className="absolute -bottom-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-blue-50 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1.5 md:mb-3 relative z-10 border border-blue-100 dark:border-blue-500/30 shrink-0">
              <Zap size={24} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-[10px] md:text-[13px] font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 relative z-10 leading-tight">Core Functions</h3>
            <p className="text-[8px] md:text-[11px] text-gray-500 dark:text-slate-300 leading-tight md:leading-snug relative z-10 line-clamp-2 md:line-clamp-none">
              Track live weather, transit schedules & businesses.
            </p>
          </div>
          
          {/* Card 3 */}
          <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl p-2.5 md:p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col items-center text-center md:items-start md:text-left">
            <div className="absolute -left-6 -bottom-6 w-16 h-16 md:w-24 md:h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-50 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-1.5 md:mb-3 relative z-10 border border-emerald-100 dark:border-emerald-500/30 shrink-0">
              <ShieldCheck size={24} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h3 className="text-[10px] md:text-[13px] font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 relative z-10 leading-tight">Premium Auth</h3>
            <p className="text-[8px] md:text-[11px] text-gray-500 dark:text-slate-300 leading-tight md:leading-snug relative z-10 line-clamp-2 md:line-clamp-none">
              Intelligent capabilities & offline navigation.
            </p>
          </div>
        </div>
      </div>

      {/* Weather & Sea Conditions (Merged into Home) */}
      <div className="max-w-7xl mx-auto pb-4 md:pb-6 px-3 md:px-8">
        <h2 className="font-yatra text-lg md:text-2xl mb-1 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Current <span className="text-gold-light">Weather & Sea</span>
        </h2>
        <p className="text-slate-400 text-[10px] md:text-xs mb-3 md:mb-4">
          കാലാവസ്ഥ & മത്സ്യബന്ധന വിവരങ്ങൾ
        </p>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-[20px] p-4 md:p-6 text-white mb-3 md:mb-5 relative overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(201,148,26,0.1)] transition-all duration-300">
          <div className="absolute right-[10px] md:right-[30px] top-[10px] md:top-[20px] text-[60px] md:text-[80px] opacity-10">
            <Waves size={120} className="w-20 h-20 md:w-32 md:h-32" />
          </div>
          
          {loadingWeather ? (
            <div className="flex items-center justify-center h-32 relative z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-light"></div>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center gap-4 md:gap-5 mb-4 md:mb-5 relative z-10">
                <div className="font-yatra text-[48px] md:text-[64px] text-gold-light leading-none">
                  {Math.round(weather.current.temperature_2m)}°
                </div>
                <div>
                  <div className="text-base md:text-lg opacity-90 flex items-center gap-1.5 md:gap-2">
                    {getWeatherIcon(weather.current.weather_code, 18)} 
                    {getWeatherDescription(weather.current.weather_code)}
                  </div>
                  <div className="text-[11px] md:text-sm opacity-60 mt-1 flex items-center gap-1"><MapPin size={12} className="md:w-[14px] md:h-[14px]" /> Chaliyam, Kozhikode</div>
                  <div className="text-[10px] md:text-xs opacity-50 mt-0.5 md:mt-1">Updated: Just now</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 md:gap-4 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors shadow-inner">
                  <Droplets size={14} className="opacity-60 mb-1 md:w-4 md:h-4" />
                  <div className="text-[9px] md:text-[11px] opacity-60 mb-0.5 md:mb-1">Humidity</div>
                  <div className="text-sm md:text-base font-semibold text-gold-light">{weather.current.relative_humidity_2m}%</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors shadow-inner">
                  <Wind size={14} className="opacity-60 mb-1 md:w-4 md:h-4" />
                  <div className="text-[9px] md:text-[11px] opacity-60 mb-0.5 md:mb-1">Wind</div>
                  <div className="text-sm md:text-base font-semibold text-gold-light">{weather.current.wind_speed_10m} <span className="text-[10px] md:text-xs">km/h</span></div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors shadow-inner">
                  <Waves size={14} className="opacity-60 mb-1 md:w-4 md:h-4" />
                  <div className="text-[9px] md:text-[11px] opacity-60 mb-0.5 md:mb-1">Waves</div>
                  <div className="text-sm md:text-base font-semibold text-gold-light">1.2 m</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 text-center flex flex-col items-center justify-center hover:bg-white/10 transition-colors shadow-inner">
                  <Sun size={14} className="opacity-60 mb-1 md:w-4 md:h-4" />
                  <div className="text-[9px] md:text-[11px] opacity-60 mb-0.5 md:mb-1">UV Index</div>
                  <div className="text-sm md:text-base font-semibold text-gold-light">{weather.daily.uv_index_max && weather.daily.uv_index_max.length > 0 ? Math.round(weather.daily.uv_index_max[0]) : 'N/A'}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center relative z-10 py-8 text-white/70">
              Failed to load weather data.
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 md:p-5 border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(201,148,26,0.1)] transition-all duration-300">
          <h3 className="font-yatra text-base md:text-lg text-gold-light mb-2.5 md:mb-3 flex items-center gap-1.5">
            <Waves size={16} className="md:w-5 md:h-5" /> Tide Schedule
          </h3>
          
          <div className="bg-gold/10 border border-gold/20 rounded-lg px-2.5 py-2 mb-3 flex items-center gap-2 text-[10px] md:text-xs text-gold-light shadow-inner leading-snug">
            <AlertCircle size={12} className="shrink-0" /> Conditions are moderate today.
          </div>
          
          <div className="grid grid-cols-4 gap-1.5 md:gap-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 md:p-2 text-center shadow-inner">
              <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wide">High</div>
              <div className="text-[11px] md:text-sm font-bold text-slate-200">06:24 AM</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 md:p-2 text-center shadow-inner">
              <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wide">Low</div>
              <div className="text-[11px] md:text-sm font-bold text-slate-200">12:41 PM</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 md:p-2 text-center shadow-inner">
              <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wide">High</div>
              <div className="text-[11px] md:text-sm font-bold text-slate-200">06:58 PM</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-1.5 md:p-2 text-center shadow-inner">
              <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-wide">Low</div>
              <div className="text-[11px] md:text-sm font-bold text-slate-200">12:12 AM</div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent my-4 md:my-5 opacity-40"></div>

          <h3 className="font-yatra text-sm md:text-base text-gold-light mb-2.5 flex items-center gap-1.5"><CloudSun size={14} className="md:w-4 md:h-4" /> 7-Day Forecast</h3>
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar snap-x">
            {loadingWeather ? (
              <div className="w-full text-center py-4 text-slate-400 text-sm">Loading forecast...</div>
            ) : weather ? (
              weather.daily.time.map((date, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl p-2 md:p-3 min-w-[75px] md:min-w-[90px] flex flex-col items-center justify-center snap-center shrink-0 hover:bg-white/10 transition-colors shadow-inner">
                  <div className="text-[9px] md:text-[11px] font-semibold text-slate-300 mb-1.5 md:mb-2">{index === 0 ? 'TODAY' : getDayName(date)}</div>
                  <div className="text-gold-light mb-1.5 md:mb-2 scale-75 md:scale-100">
                    {getWeatherIcon(weather.daily.weather_code[index], 24)}
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                    <span className="font-bold text-gold-light">{Math.round(weather.daily.temperature_2m_max[index])}°</span>
                    <span className="text-slate-400">{Math.round(weather.daily.temperature_2m_min[index])}°</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-4 text-slate-400 text-sm">Forecast unavailable</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Reusable Simple Order Modal */}
      <DeliveryModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </div>
  );
}
