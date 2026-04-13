import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Camera, Bus, Phone, Store, Newspaper, ClipboardList, Menu, X, Moon, Sun, Info, Users, Download, Palmtree } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();

  const activeSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

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
    { id: 'map', path: '/map', label: 'Map', icon: MapIcon },
    { id: 'spots', path: '/spots', label: 'Spots', icon: Camera },
    { id: 'bus', path: '/bus', label: 'Bus', icon: Bus },
    { id: 'emergency', path: '/emergency', label: 'Emergency', icon: Phone },
    { id: 'directory', path: '/directory', label: 'Directory', icon: Store },
    { id: 'people', path: '/people', label: 'People', icon: Users },
    { id: 'news', path: '/news', label: 'News', icon: Newspaper },
    { id: 'business', path: '/business', label: 'Business', icon: ClipboardList },
  ];

  return (
    <>
      <header className="bg-slate-950/80 backdrop-blur-md px-6 sticky top-0 z-50 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px]">
          <Link 
            to="/"
            className="flex items-center gap-3 no-underline text-left"
          >
            <div className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gold-light shadow-[0_4px_20px_rgba(201,148,26,0.15)] backdrop-blur-md">
              <Palmtree size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-yatra text-xl text-gold-light leading-none tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Chaliyam Connect</span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase mt-1">ചാലിയം • Kozhikode</span>
            </div>
          </Link>

          <nav className="hidden xl:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`bg-transparent border-none px-3 py-2 rounded-lg cursor-pointer font-sans text-[13px] font-medium transition-all flex items-center gap-1.5 no-underline
                  ${activeSection === item.id 
                    ? 'bg-white/10 text-gold-light border-b-2 border-gold rounded-b-none' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-gold-light'
                  }`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-slate-900 hover:bg-gold-light transition-all text-sm font-medium shadow-[0_0_15px_rgba(201,148,26,0.2)]"
              >
                <Download size={16} />
                Install App
              </button>
            )}

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-gold-light transition-all text-sm font-medium backdrop-blur-md"
            >
              <Info size={16} />
              About
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-gold-light transition-all cursor-pointer backdrop-blur-md"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              className="xl:hidden text-slate-300 bg-transparent border-none p-2 hover:text-gold-light transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`xl:hidden fixed inset-0 top-[70px] bg-slate-950/95 backdrop-blur-xl z-40 flex flex-col p-6 transition-all duration-300 ease-in-out pb-24 overflow-y-auto ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3 mb-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-200
                ${activeSection === item.id 
                  ? 'bg-white/10 text-gold-light border border-white/10 shadow-inner scale-[1.02]' 
                  : 'text-slate-300 hover:bg-white/5 hover:text-gold-light hover:scale-[1.02]'
                }`}
            >
              <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-gold/10' : 'bg-white/5'}`}>
                <item.icon size={22} className={activeSection === item.id ? 'text-gold-light' : 'text-slate-400'} />
              </div>
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={() => { setIsAboutModalOpen(true); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-200 text-slate-300 hover:bg-white/5 hover:text-gold-light hover:scale-[1.02] text-left"
          >
            <div className="p-2 rounded-lg bg-white/5">
              <Info size={22} className="text-slate-400" />
            </div>
            <span className="text-lg font-medium">About Us</span>
          </button>

          {deferredPrompt && (
            <button
              onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-200 text-gold-light hover:bg-white/5 hover:scale-[1.02] text-left border border-gold/20"
            >
              <div className="p-2 rounded-lg bg-gold/10">
                <Download size={22} className="text-gold-light" />
              </div>
              <span className="text-lg font-medium">Install App</span>
            </button>
          )}
        </div>
        
        <div className="mt-auto border-t border-white/10 pt-6">
          {/* Auth section removed */}
        </div>
      </div>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-md border-t border-white/10 pt-2 pb-safe-bottom z-50 shadow-[0_-4px_30px_rgba(0,0,0,0.15)]">
        <div className="flex justify-around pb-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer font-sans transition-colors px-2 py-1 no-underline
                ${activeSection === item.id ? 'text-gold-light' : 'text-slate-500'}`}
            >
              <item.icon size={20} />
              <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gold-light shadow-inner">
                  <Palmtree size={24} />
                </div>
                <h3 className="font-yatra text-2xl text-gold-light">About Us</h3>
              </div>
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors border border-white/10"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gold-light mb-3">Chaliyam Connect</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Chaliyam Connect is a dedicated community platform designed to bring the people of Chaliyam closer together. Our mission is to provide a centralized hub for local information, essential services, and community updates.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                From bus timings and emergency contacts to local news and a business directory, we aim to make daily life in Chaliyam more connected and convenient.
              </p>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <h5 className="font-semibold text-slate-200 mb-2">Developers & Contributors</h5>
                <p className="text-sm text-slate-400 mb-1">
                  Built with ❤️ for the community.
                </p>
                <p className="text-sm text-slate-400">
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
