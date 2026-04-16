import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Camera, Bus, Phone, Store, Newspaper, ClipboardList, Menu, X, Moon, Sun, Info, Users, Download, Palmtree, ShoppingBag, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const activeSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'store', path: '/store', label: 'Store', icon: ShoppingBag },
    { id: 'directory', path: '/directory', label: 'Directory', icon: Store },
    { id: 'spots', path: '/spots', label: 'Spots', icon: Camera },
    { id: 'bus', path: '/bus', label: 'Bus', icon: Bus },
    { id: 'news', path: '/news', label: 'News', icon: Newspaper },
  ];

  const moreNavItems = [
    { id: 'business', path: '/business', label: 'Business', icon: ClipboardList },
    { id: 'people', path: '/people', label: 'People', icon: Users },
    { id: 'map', path: '/map', label: 'Map', icon: MapIcon },
    { id: 'emergency', path: '/emergency', label: 'Emergency', icon: Phone },
  ];

  const allNavItems = [...navItems, ...moreNavItems];

  return (
    <>
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-4 md:px-6 sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[64px] md:h-[76px] gap-4">
          
          {/* Logo brand */}
          <Link 
            to="/"
            className="flex items-center gap-3 no-underline text-left group shrink-0"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-gold-light shadow-sm group-hover:shadow-md transition-all">
              <Palmtree size={22} className="md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-yatra text-xl md:text-2xl text-gray-900 dark:text-gold-light leading-none tracking-wide md:bg-gradient-to-r md:from-indigo-600 md:to-purple-600 md:dark:from-white md:dark:via-slate-200 md:dark:to-slate-400 bg-clip-text md:text-transparent">Chaliyam</span>
              <span className="text-[10px] md:text-[11px] text-gray-500 dark:text-slate-400 tracking-widest uppercase mt-1 font-medium">Connect • KL85</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-gold-light shadow-sm' 
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-gold-light'
                    }`}
                >
                  <item.icon size={16} className={isActive ? "text-indigo-600 dark:text-gold-light" : "opacity-70"} />
                  {item.label}
                </Link>
              )
            })}

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                  ${moreNavItems.some(i => i.id === activeSection) || isMoreDropdownOpen
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-gold-light shadow-sm' 
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-gold-light'
                  }`}
              >
                More
                <ChevronDown size={16} className={`transition-transform duration-300 ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-2 animate-[fadeUp_0.2s_ease] z-50">
                  {moreNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors no-underline
                          ${isActive 
                            ? 'bg-indigo-50 text-indigo-700 dark:bg-white/10 dark:text-gold-light' 
                            : 'text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-gold-light'
                          }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isActive ? 'bg-indigo-100 dark:bg-gold/20' : 'bg-gray-100 dark:bg-slate-800'}`}>
                          <item.icon size={16} className={isActive ? "text-indigo-600 dark:text-gold-light" : "text-gray-500 dark:text-slate-400"} />
                        </div>
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 dark:bg-gold text-white dark:text-slate-900 hover:bg-indigo-700 dark:hover:bg-gold-light transition-all text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Download size={16} />
                Install App
              </button>
            )}

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-gold-light transition-all text-sm font-semibold"
            >
              <Info size={16} />
              About
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gold-light/10 text-gray-600 dark:text-gold-light hover:bg-gray-200 dark:hover:bg-gold-light/20 flex items-center justify-center transition-colors cursor-pointer border border-transparent dark:border-gold/20 shrink-0"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="xl:hidden fixed inset-0 top-[70px] bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div 
        className={`lg:hidden fixed right-0 top-[64px] md:top-[76px] bottom-0 w-[85vw] sm:w-[320px] bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_40px_rgba(0,0,0,0.5)] z-40 flex flex-col p-6 transition-transform duration-300 ease-in-out pb-24 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 mb-8">
          <div className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-2 ml-2">Navigation</div>
          {allNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 p-3 rounded-xl no-underline transition-all duration-200
                ${activeSection === item.id 
                  ? 'bg-indigo-50 dark:bg-white/10 text-indigo-700 dark:text-gold-light border border-indigo-100 dark:border-white/10 shadow-sm' 
                  : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-gold-light'
                }`}
            >
              <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-indigo-100 dark:bg-gold/20' : 'bg-gray-100 dark:bg-slate-800'}`}>
                <item.icon size={20} className={activeSection === item.id ? 'text-indigo-600 dark:text-gold-light' : 'text-gray-500 dark:text-slate-400'} />
              </div>
              <span className="text-base font-semibold">{item.label}</span>
            </Link>
          ))}
          
          <div className="h-px w-full bg-gray-200 dark:bg-white/10 my-4" />
          
          <button
            onClick={() => { setIsAboutModalOpen(true); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-4 p-3 rounded-xl no-underline transition-all duration-200 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-gold-light text-left"
          >
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800">
              <Info size={20} className="text-gray-500 dark:text-slate-400" />
            </div>
            <span className="text-base font-semibold">About Us</span>
          </button>

          {deferredPrompt && (
            <button
              onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-4 p-3 rounded-xl no-underline transition-all duration-200 text-indigo-700 dark:text-gold-light bg-indigo-50 dark:bg-gold/10 hover:bg-indigo-100 dark:hover:bg-gold/20 text-left border border-indigo-200 dark:border-gold/20 mt-2 shadow-sm"
            >
              <div className="p-2 rounded-lg bg-indigo-200 dark:bg-gold/20">
                <Download size={20} className="text-indigo-700 dark:text-gold-light" />
              </div>
              <span className="text-base font-bold">Install App</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl pt-1.5 pb-safe-bottom z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.15)]">
        <div className="flex justify-around items-end pb-1.5 pr-1 pl-1 relative">
          {navItems.slice(0, 5).map((item, index) => {
            const isActive = activeSection === item.id;
            const isCenter = index === 2;

            if (isCenter) {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex flex-col items-center justify-center relative -top-5 w-14"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(79,70,229,0.3)] dark:shadow-[0_8px_30px_rgba(201,148,26,0.3)] transition-transform active:scale-95 border-4 border-white dark:border-slate-950 flex-shrink-0 animate-[bounce_3s_infinite] ${isActive ? 'bg-indigo-700 dark:bg-gold-light text-white dark:text-slate-900' : 'bg-indigo-600 dark:bg-gold text-white dark:text-slate-900'}`}>
                    <item.icon size={24} className={isActive ? 'scale-110 drop-shadow-md' : ''} />
                  </div>
                  <span className={`text-[10px] font-bold tracking-wide absolute -bottom-5 w-full text-center ${isActive ? 'text-indigo-600 dark:text-gold-light' : 'text-gray-500 dark:text-slate-400'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-end gap-1 bg-transparent border-none cursor-pointer font-sans transition-all px-2 py-1 no-underline rounded-xl w-14
                  ${isActive 
                    ? 'text-indigo-600 dark:text-gold-light scale-[1.05]' 
                    : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
              >
                <item.icon size={22} className={isActive ? 'drop-shadow-sm mb-0.5' : 'mb-0.5'} />
                <span className="text-[10px] font-semibold tracking-wide whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setIsAboutModalOpen(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease] relative" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200/50 dark:bg-white/5 text-gray-500 dark:text-slate-400 hover:bg-gray-300 dark:hover:bg-white/10 hover:text-red-500 transition-colors border border-transparent dark:border-white/10 z-10"
            >
              <X size={18} />
            </button>
            <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-gold-light shadow-sm">
                  <Palmtree size={24} />
                </div>
                <div>
                  <h3 className="font-yatra text-2xl text-gray-900 dark:text-gold-light">About Us</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400">Community Platform</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                Chaliyam Connect is a dedicated community platform designed to bring the people of Chaliyam closer together. Our mission is to provide a centralized hub for local information, essential services, and community updates.
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                From bus timings and emergency contacts to local news and a business directory, we aim to make daily life in Chaliyam more connected and convenient.
              </p>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                <h5 className="font-bold text-gray-900 dark:text-slate-200 mb-1">Developers & Contributors</h5>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">
                  Built with ❤️ for the community by <a href="https://mohdnihadkp.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-gold-light hover:underline font-bold">mohdnihadkp</a>.
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Have suggestions? Contact us via the News section or reach out to our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
