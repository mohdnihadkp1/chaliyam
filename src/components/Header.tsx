import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Camera, Bus, Phone, Store, Newspaper, ClipboardList, Menu, X, Moon, Sun, LogIn, LogOut, Info, Users, Download, Palmtree } from 'lucide-react';
import { useAuth } from '../AuthContext';
import LoginModal from './LoginModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const location = useLocation();
  const { user, signOut } = useAuth();

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
      <header className="bg-gradient-to-br from-green-deep/95 to-[#0f3320]/95 backdrop-blur-md px-6 sticky top-0 z-50 border-b-[3px] border-gold shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px]">
          <Link 
            to="/"
            className="flex items-center gap-3 no-underline text-left"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center text-white shadow-[0_4px_20px_rgba(201,148,26,0.25)]">
              <Palmtree size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-yatra text-xl text-gold-light leading-none tracking-wide">Chaliyam Connect</span>
              <span className="text-[10px] text-white/60 tracking-widest uppercase mt-1">ചാലിയം • Kozhikode</span>
            </div>
          </Link>

          <nav className="hidden xl:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`bg-transparent border-none px-3 py-2 rounded-lg cursor-pointer font-sans text-[13px] font-medium transition-all flex items-center gap-1.5 no-underline
                  ${activeSection === item.id 
                    ? 'bg-gold/20 text-gold-light border-b-2 border-gold rounded-b-none' 
                    : 'text-white/70 hover:bg-gold/20 hover:text-gold-light'
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
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-white hover:bg-gold-light transition-all text-sm font-medium shadow-sm"
              >
                <Download size={16} />
                Install App
              </button>
            )}

            <button
              onClick={() => setIsAboutModalOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-gold-light transition-all text-sm font-medium"
            >
              <Info size={16} />
              About
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-gold-light transition-all cursor-pointer border-none"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-8 h-8 rounded-full border-2 border-gold" />
                <button
                  onClick={signOut}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-red-400 transition-all cursor-pointer border-none"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:flex items-center gap-2 bg-gold/20 text-gold-light px-4 py-2 rounded-full font-medium hover:bg-gold hover:text-white transition-all cursor-pointer border border-gold/50"
              >
                <LogIn size={16} />
                <span className="text-sm">Login</span>
              </button>
            )}

            <button 
              className="xl:hidden text-white bg-transparent border-none p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`xl:hidden fixed inset-0 top-[70px] bg-green-deep/95 backdrop-blur-xl z-40 flex flex-col p-6 transition-all duration-300 ease-in-out pb-24 overflow-y-auto ${
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
                  ? 'bg-gold/20 text-gold-light border border-gold/30 shadow-inner scale-[1.02]' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.02]'
                }`}
            >
              <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-gold/20' : 'bg-white/5'}`}>
                <item.icon size={22} className={activeSection === item.id ? 'text-gold-light' : 'text-white/70'} />
              </div>
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={() => { setIsAboutModalOpen(true); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.02] text-left"
          >
            <div className="p-2 rounded-lg bg-white/5">
              <Info size={22} className="text-white/70" />
            </div>
            <span className="text-lg font-medium">About Us</span>
          </button>

          {deferredPrompt && (
            <button
              onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-4 p-4 rounded-xl no-underline transition-all duration-200 text-gold-light hover:bg-gold/10 hover:scale-[1.02] text-left border border-gold/20"
            >
              <div className="p-2 rounded-lg bg-gold/10">
                <Download size={22} className="text-gold-light" />
              </div>
              <span className="text-lg font-medium">Install App</span>
            </button>
          )}
        </div>
        
        <div className="mt-auto border-t border-white/10 pt-6">
          {user ? (
            <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt="Profile" className="w-12 h-12 rounded-full border-2 border-gold shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-white font-medium text-lg">{user.displayName}</span>
                  <span className="text-white/50 text-sm truncate max-w-[150px]">{user.email}</span>
                </div>
              </div>
              <button
                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                className="p-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-colors"
                title="Sign Out"
              >
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setIsLoginModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white py-4 rounded-xl font-medium text-lg shadow-lg transition-colors"
            >
              <LogIn size={20} />
              Sign In to Connect
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-green-deep/95 backdrop-blur-md border-t-2 border-gold pt-2 pb-safe-bottom z-50 shadow-[0_-4px_30px_rgba(0,0,0,0.15)]">
        <div className="flex justify-around pb-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer font-sans transition-colors px-2 py-1 no-underline
                ${activeSection === item.id ? 'text-gold-light' : 'text-white/50'}`}
            >
              <item.icon size={20} />
              <span className="text-[9px] uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* About Us Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 bg-green-deep/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2e20] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="bg-gradient-to-r from-green-deep to-green-mid p-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shadow-inner">
                  <Palmtree size={24} />
                </div>
                <h3 className="font-yatra text-2xl text-gold-light">About Us</h3>
              </div>
              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold text-green-deep dark:text-gold-light mb-3">Chaliyam Connect</h4>
              <p className="text-text-mid dark:text-text-light text-sm leading-relaxed mb-4">
                Chaliyam Connect is a dedicated community platform designed to bring the people of Chaliyam closer together. Our mission is to provide a centralized hub for local information, essential services, and community updates.
              </p>
              <p className="text-text-mid dark:text-text-light text-sm leading-relaxed mb-6">
                From bus timings and emergency contacts to local news and a business directory, we aim to make daily life in Chaliyam more connected and convenient.
              </p>
              
              <div className="bg-green-pale dark:bg-[#0f2919] p-4 rounded-xl border border-green-deep/10 dark:border-gold/10">
                <h5 className="font-semibold text-text-dark dark:text-white mb-2">Developers & Contributors</h5>
                <p className="text-sm text-text-mid dark:text-text-light mb-1">
                  Built with ❤️ for the community.
                </p>
                <p className="text-sm text-text-mid dark:text-text-light">
                  Have suggestions? Contact us via the News section or reach out to our team.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
