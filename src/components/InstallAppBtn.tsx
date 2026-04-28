import React, { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InstallAppBtnProps {
  className?: string;
  variant?: "header" | "footer" | "mobile";
}

const InstallAppBtn = React.memo(({ className = "", variant = "header" }: InstallAppBtnProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Listen for the native beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Initial checks for OS and Standalone Status
    const checkIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(checkIOS);

    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || ((navigator as any).standalone === true);
    
    if (!isStandalone) {
      if (checkIOS) {
        setIsInstallable(true); // iOS won't fire beforeinstallprompt
      } else {
        // Wait for beforeinstallprompt on Android/Desktop
      }
    }

    // Clean up
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    } else if (isIOS) {
      setShowIOSPrompt(true);
    } else {
      // Fallback if not iOS and no deferredPrompt (e.g., Firefox)
      alert("To install: Open your browser menu (⋮) and tap 'Add to Home screen' or 'Install App'.");
    }
  };

  if (!isInstallable) return null;

  return (
    <>
      {variant === "header" && (
        <button
          onClick={handleInstallClick}
          className={`hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-indigo-700 transition-all text-sm font-bold shadow-sm hover:shadow-md whitespace-nowrap active:scale-95 duration-150 ${className}`}
        >
          <Download size={16} /> Install App
        </button>
      )}

      {variant === "mobile" && (
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-3 p-2 rounded-xl no-underline transition-all duration-200 text-[var(--color-primary)] bg-[var(--color-primary-container)] hover:bg-[var(--color-primary-container)] text-left border border-indigo-200 mt-1 shadow-sm ${className}`}
        >
          <div className="p-1.5 rounded-lg bg-indigo-200">
            <Download size={18} className="text-[var(--color-primary)]" />
          </div>
          <span className="text-sm font-bold">Install App</span>
        </button>
      )}

      {variant === "footer" && (
        <button
          onClick={handleInstallClick}
          className={`group flex items-center justify-between w-full p-4 rounded-xl bg-indigo-50 border border-indigo-100/50 hover:bg-indigo-100 transition-all duration-300 text-left cursor-pointer mt-4 ${className}`}
        >
          <div className="flex items-center gap-3 text-indigo-900">
            <div className="p-2 bg-indigo-200/50 rounded-lg group-hover:bg-indigo-200 transition-colors">
              <Download size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide">Install Chaliyam App</p>
              <p className="text-xs text-indigo-600/80 mt-0.5">Fast, convenient, and memory-saving</p>
            </div>
          </div>
          <span className="bg-white/80 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
            Free
          </span>
        </button>
      )}

      {/* iOS Install Instructions Modal */}
      <AnimatePresence>
        {showIOSPrompt && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl transition-opacity"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white w-full max-w-sm rounded-3xl p-6 relative"
            >
              <button
                onClick={() => setShowIOSPrompt(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 shadow-sm border border-indigo-100">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Install Chaliyam</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Install this application on your home screen for quick and easy access when you're on the go.
              </p>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-8 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center shrink-0">
                    <Share size={16} className="text-blue-500" />
                  </div>
                  <span className="text-sm">1. Tap the <strong>Share</strong> button at the bottom of your screen.</span>
                </div>
                <div className="w-px h-4 bg-gray-200 ml-4"></div>
                <div className="flex items-center gap-4 text-gray-700">
                  <div className="w-8 h-8 bg-white border border-gray-200 shadow-sm rounded-lg flex items-center justify-center shrink-0">
                    <PlusSquare size={16} className="text-gray-700" />
                  </div>
                  <span className="text-sm">2. Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                </div>
              </div>
              <button 
                className="w-full mt-6 py-3.5 bg-[var(--color-primary)] hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-bold rounded-xl shadow-md text-sm cursor-pointer"
                onClick={() => setShowIOSPrompt(false)}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default InstallAppBtn;
