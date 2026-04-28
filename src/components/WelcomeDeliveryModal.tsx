import { X, ArrowRight, Map, ShoppingBag, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ONBOARDING_STEPS = [
  {
    title: "Welcome to",
    highlight: "Chaliyam Connect",
    desc: "Your digital community hub. Everything you need in Chaliyam, right at your fingertips.",
    icon: Radio,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Discover Local",
    highlight: "Services & Transit",
    desc: "Find verified local businesses in our directory and never miss a bus with our live timings board.",
    icon: Map,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Shop from",
    highlight: "Calicut Store",
    desc: "Experience premium home delivery. Get fresh groceries and essentials delivered right to your door.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80",
    color: "from-amber-500 to-orange-500"
  }
];

export default function WelcomeDeliveryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Only show once per session as requested
    const hasSeen = sessionStorage.getItem("hasSeenOnboarding");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenOnboarding", "true");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStep = ONBOARDING_STEPS[stepIndex];
  const Icon = currentStep.icon;

  const nextStep = () => {
    if (stepIndex < ONBOARDING_STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsOpen(false);
      navigate("/store");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in touch-none" 
      />

      {/* Modal Container */}
      <div
        className="bg-white w-[90%] max-w-sm sm:max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up-center z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-white/70 backdrop-blur-xl text-slate-700 p-2.5 rounded-full hover:bg-white hover:text-slate-900 transition-all z-20 shadow-sm"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Hero Image Section */}
        <div className="h-40 relative overflow-hidden bg-slate-100">
          <img
            key={currentStep.image} // Force re-render on step change
            src={currentStep.image}
            alt={currentStep.highlight}
            className="w-full h-full object-cover animate-[fadeIn_0.5s_ease-out]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 pt-2 text-center relative z-10">
          <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] -mt-10 border-4 border-white rotate-3 transition-all duration-300">
            <Icon size={28} className={`text-transparent bg-clip-text bg-gradient-to-tr ${currentStep.color} [&>path]:stroke-[url(#grad)] [&>circle]:stroke-[url(#grad)] [&>rect]:stroke-[url(#grad)]`} strokeWidth={2} color="#000" />
            <svg width="0" height="0">
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop stopColor={stepIndex === 0 ? "#4F46E5" : stepIndex === 1 ? "#10B981" : "#F59E0B"} offset="0%" />
                <stop stopColor={stepIndex === 0 ? "#9333EA" : stepIndex === 1 ? "#14B8A6" : "#F97316"} offset="100%" />
              </linearGradient>
            </svg>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2 tracking-tight animate-[fadeInUp_0.4s_ease-out]">
            {currentStep.title} <br/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentStep.color}`}>
              {currentStep.highlight}
            </span>
          </h2>
          
          <p className="text-slate-500 font-medium mb-6 text-sm leading-relaxed max-w-[280px] mx-auto min-h-[60px] animate-[fadeInUp_0.5s_ease-out]">
            {currentStep.desc}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={nextStep}
              className="group w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {stepIndex === ONBOARDING_STEPS.length - 1 ? "Start Shopping" : "Continue"} 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex flex-col items-center justify-center mt-2 relative min-h-[24px]">
              <div className="flex justify-center gap-2">
                {ONBOARDING_STEPS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === stepIndex ? 'w-6 bg-slate-800' : 'w-1.5 bg-slate-200'}`}
                  />
                ))}
              </div>
              
              {stepIndex < ONBOARDING_STEPS.length - 1 && (
                <button
                   onClick={() => setIsOpen(false)}
                   className="mt-4 mb-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Skip intro
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
