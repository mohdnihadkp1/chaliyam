import { useState, useEffect } from 'react';
import { Map as MapIcon, Camera, Bus, Phone, Store, Users, Newspaper, Briefcase, CloudRain, Wind, Waves, Sun, CloudSun, Droplets, AlertCircle, CloudLightning, Cloud, Snowflake, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=11.16&longitude=75.81&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto');
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
    if (code >= 45 && code <= 48) return "Fog";
    if (code >= 51 && code <= 55) return "Drizzle";
    if (code >= 61 && code <= 65) return "Rain";
    if (code >= 80 && code <= 82) return "Rain showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
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
      <div className="bg-gradient-to-b from-green-deep via-green-mid to-green-pale pt-[60px] px-6 pb-[80px] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,148,26,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(76,175,120,0.1)_0%,transparent_40%)]" />
        
        <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 text-gold-light px-4 py-1.5 rounded-full text-xs tracking-[1.5px] uppercase mb-5 relative z-10">
          <Waves size={14} /> Chaliyam • ചാലിയം
        </div>
        
        <h1 className="font-yatra text-[clamp(36px,6vw,68px)] text-white leading-[1.1] mb-2 relative z-10">
          Chaliyam <span className="text-gold-light">Connect</span>
        </h1>
        
        <p className="font-malayalam text-lg text-white/60 mb-5 relative z-10">നിങ്ങളുടെ നാടിന്റെ ഡിജിറ്റൽ കൂട്ടായ്മ</p>
        
        <p className="text-base text-white/75 max-w-[500px] mx-auto mb-8 leading-[1.7] relative z-10">
          Your community hub for Chaliyam — maps, bus timings, emergency contacts, local spots, businesses, and everything you need about our beautiful coastal village.
        </p>
        
        <div className="max-w-4xl mx-auto relative z-10 overflow-hidden rounded-2xl shadow-2xl border border-white/20">
          <div className="relative h-64 md:h-80 w-full bg-green-deep">
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
                <div className="absolute inset-0 bg-gradient-to-t from-green-deep/95 via-green-deep/50 to-transparent flex flex-col justify-end p-6 md:p-10 text-left">
                  <span className="inline-flex items-center gap-1.5 bg-gold text-green-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 w-fit">
                    {slide.icon} Feature
                  </span>
                  <h2 className="font-yatra text-2xl md:text-4xl text-white mb-2 transform transition-all duration-700 translate-y-0">{slide.title}</h2>
                  <p className="text-white/80 text-sm md:text-base max-w-2xl transform transition-all duration-700 delay-100 translate-y-0">{slide.desc}</p>
                </div>
              </div>
            ))}
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 right-6 md:right-10 flex gap-2 z-20">
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
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % adSlides.length)}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto pt-10 pb-6 px-6">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {quickActions.map((action) => (
            <div 
              key={action.id}
              onClick={() => navigate(action.path)}
              className="bg-white dark:bg-[#1a2e20] rounded-2xl p-5 text-center cursor-pointer border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] transition-transform duration-200 hover:-translate-y-1 flex flex-col items-center justify-center gap-3"
            >
              <div className="text-green-deep dark:text-gold-light">{action.icon}</div>
              <div className="font-semibold text-sm text-green-deep dark:text-gold-light">{action.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather & Sea Conditions (Merged into Home) */}
      <div className="max-w-7xl mx-auto py-6 px-6">
        <h2 className="font-yatra text-[28px] text-green-deep mb-1.5">
          Current <span className="text-gold">Weather & Sea</span>
        </h2>
        <p className="text-text-light text-sm mb-6">
          കാലാവസ്ഥ & മത്സ്യബന്ധന വിവരങ്ങൾ — Chaliyam coastal weather & fishing info
        </p>

        <div className="bg-gradient-to-br from-[#0f3320] via-[#1a4a2e] to-[#2d7a4f] rounded-[20px] p-8 text-white mb-6 relative overflow-hidden shadow-[0_8px_40px_rgba(26,74,46,0.4)]">
          <div className="absolute right-[30px] top-[20px] text-[80px] opacity-15">
            <Waves size={120} />
          </div>
          
          {loadingWeather ? (
            <div className="flex items-center justify-center h-32 relative z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-light"></div>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center gap-5 mb-5 relative z-10">
                <div className="font-yatra text-[64px] text-gold-light leading-none">
                  {Math.round(weather.current.temperature_2m)}°
                </div>
                <div>
                  <div className="text-lg opacity-90 flex items-center gap-2">
                    {getWeatherIcon(weather.current.weather_code, 20)} 
                    {getWeatherDescription(weather.current.weather_code)}
                  </div>
                  <div className="text-sm opacity-60 mt-1 flex items-center gap-1"><MapIcon size={14} /> Chaliyam, Kozhikode</div>
                  <div className="text-xs opacity-50 mt-1">Updated: Just now</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                <div className="bg-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                  <Droplets size={16} className="opacity-60 mb-1" />
                  <div className="text-[11px] opacity-60 mb-1">Humidity</div>
                  <div className="text-base font-semibold text-gold-light">{weather.current.relative_humidity_2m}%</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                  <Wind size={16} className="opacity-60 mb-1" />
                  <div className="text-[11px] opacity-60 mb-1">Wind</div>
                  <div className="text-base font-semibold text-gold-light">{weather.current.wind_speed_10m} km/h</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                  <Waves size={16} className="opacity-60 mb-1" />
                  <div className="text-[11px] opacity-60 mb-1">Sea Waves</div>
                  <div className="text-base font-semibold text-gold-light">1.2 m</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center flex flex-col items-center justify-center">
                  <Sun size={16} className="opacity-60 mb-1" />
                  <div className="text-[11px] opacity-60 mb-1">UV Index</div>
                  <div className="text-base font-semibold text-gold-light">High</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center relative z-10 py-8 text-white/70">
              Failed to load weather data.
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#1a2e20] rounded-2xl p-6 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)]">
          <h3 className="font-yatra text-xl text-green-deep dark:text-gold-light mb-4 flex items-center gap-2">
            <Waves size={20} /> Fishing Advisory — Tide Schedule
          </h3>
          
          <div className="bg-gradient-to-br from-gold-pale to-[#fff8e8] dark:from-gold-dark/20 dark:to-gold-dark/10 border border-gold/30 rounded-xl px-4 py-3.5 mb-4 flex items-center gap-2.5 text-[13px] text-gold-dark dark:text-gold-light">
            <AlertCircle size={16} className="shrink-0" /> Fishing conditions are moderate today. Coastal fishermen — check with the local fisheries department before heading out.
          </div>
          
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
            <div className="bg-green-pale dark:bg-[#0f2919] rounded-xl p-3.5 text-center">
              <div className="text-[11px] text-text-light uppercase tracking-wide">High Tide</div>
              <div className="text-lg font-bold text-green-deep dark:text-white">06:24 AM</div>
              <div className="text-[13px] text-gold-dark dark:text-gold-light font-semibold">1.8 m</div>
            </div>
            <div className="bg-green-pale dark:bg-[#0f2919] rounded-xl p-3.5 text-center">
              <div className="text-[11px] text-text-light uppercase tracking-wide">Low Tide</div>
              <div className="text-lg font-bold text-green-deep dark:text-white">12:41 PM</div>
              <div className="text-[13px] text-gold-dark dark:text-gold-light font-semibold">0.3 m</div>
            </div>
            <div className="bg-green-pale dark:bg-[#0f2919] rounded-xl p-3.5 text-center">
              <div className="text-[11px] text-text-light uppercase tracking-wide">High Tide</div>
              <div className="text-lg font-bold text-green-deep dark:text-white">06:58 PM</div>
              <div className="text-[13px] text-gold-dark dark:text-gold-light font-semibold">1.6 m</div>
            </div>
            <div className="bg-green-pale dark:bg-[#0f2919] rounded-xl p-3.5 text-center">
              <div className="text-[11px] text-text-light uppercase tracking-wide">Low Tide</div>
              <div className="text-lg font-bold text-green-deep dark:text-white">12:12 AM</div>
              <div className="text-[13px] text-gold-dark dark:text-gold-light font-semibold">0.2 m</div>
            </div>
          </div>

          <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent my-8 opacity-40"></div>

          <h3 className="font-yatra text-lg text-green-deep dark:text-gold-light mb-3.5 flex items-center gap-2"><CloudSun size={20} /> 7-Day Forecast</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2.5">
            {loadingWeather ? (
              <div className="col-span-full text-center py-4 text-text-light">Loading forecast...</div>
            ) : weather ? (
              weather.daily.time.map((date, index) => (
                <div key={index} className="bg-green-pale dark:bg-[#0f2919] rounded-xl p-3 text-center flex flex-col items-center justify-center">
                  <div className="text-[11px] text-text-light">{index === 0 ? 'TODAY' : getDayName(date)}</div>
                  <div className="text-green-deep dark:text-gold-light my-2">
                    {getWeatherIcon(weather.daily.weather_code[index], 24)}
                  </div>
                  <div className="font-bold text-green-deep dark:text-white">
                    {Math.round(weather.daily.temperature_2m_max[index])}°
                  </div>
                  <div className="text-[11px] text-text-light mt-0.5">
                    {Math.round(weather.daily.temperature_2m_min[index])}°
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-text-light">Forecast unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
