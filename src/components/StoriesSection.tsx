import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

const STORIES = [
  {
    id: 1,
    creator: "Calicut Store",
    avatar: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    title: "Fresh Arrival",
    link: "/store"
  },
  {
    id: 2,
    creator: "Tech Hub",
    avatar: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80",
    title: "50% Off Electronics",
    link: "/directory"
  },
  {
    id: 3,
    creator: "Chaliyam Sports",
    avatar: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80",
    title: "Weekend Tournament",
    link: "/news"
  },
  {
    id: 4,
    creator: "Fresh Bakes",
    avatar: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=600&q=80",
    title: "Hot Croissants",
    link: "/directory"
  },
  {
    id: 5,
    creator: "Seafood Market",
    avatar: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=600&q=80",
    title: "Today's Catch",
    link: "/marketplace"
  }
];

export default function StoriesSection() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStory = activeStoryIndex !== null ? STORIES[activeStoryIndex] : null;

  useEffect(() => {
    if (activeStoryIndex !== null) {
      document.body.style.overflow = 'hidden';
      setProgress(0);
      
      const updateProgress = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1; // 100% / 100 steps = 1% every 50ms = 5 seconds
        });
      };
      
      timerRef.current = setInterval(updateProgress, 50);
    } else {
      document.body.style.overflow = 'unset';
      if (timerRef.current) clearInterval(timerRef.current);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeStoryIndex]);

  const handleNext = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex < STORIES.length - 1) {
        setActiveStoryIndex(activeStoryIndex + 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex !== null) {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(activeStoryIndex - 1);
      } else {
        setActiveStoryIndex(null);
      }
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto pb-4 pt-2 hide-scrollbar">
        <div className="flex gap-4 px-4 md:px-8 w-max">
          {STORIES.map((story, idx) => (
            <div 
              key={story.id} 
              onClick={() => setActiveStoryIndex(idx)}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-indigo-500 group-hover:scale-105 transition-transform active:scale-95 duration-200">
                <div className="w-full h-full rounded-full border-2 border-[var(--color-surface)] overflow-hidden bg-white">
                  <img src={story.avatar} alt={story.creator} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-[var(--color-on-surface)] text-center w-16 md:w-20 truncate">
                {story.creator}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeStory && createPortal(
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full h-[100dvh] sm:h-[85dvh] sm:max-w-md sm:rounded-[2.5rem] bg-slate-950 overflow-hidden flex flex-col shadow-2xl shadow-black animate-[scaleUpCenter_0.3s_cubic-bezier(0.16,1,0.3,1)] border border-white/5">
            
            {/* Story Progress Bars */}
            <div className="absolute top-0 inset-x-0 pt-safe-top z-20 px-2 sm:px-4 py-3 flex gap-1 bg-gradient-to-b from-black/80 to-transparent">
              {STORIES.map((_, idx) => (
                <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ 
                      width: idx === activeStoryIndex ? `${progress}%` : idx < (activeStoryIndex ?? 0) ? '100%' : '0%' 
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header info */}
            <div className="absolute top-0 inset-x-0 pt-[env(safe-area-inset-top,1rem)] mt-6 z-10 flex items-start justify-between px-4 pb-12 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shadow-md">
                  <img src={activeStory.avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <span className="text-white font-bold text-[15px] drop-shadow-md tracking-wide">{activeStory.creator}</span>
              </div>
              <button 
                onClick={() => setActiveStoryIndex(null)}
                className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center active:scale-90 transition-all border border-white/10"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>

            {/* Left/Right Click Targets */}
            <div className="absolute inset-y-24 left-0 w-1/3 z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
            <div className="absolute inset-y-24 right-0 w-2/3 z-10 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }} />

            {/* Main Image */}
            <img 
              src={activeStory.image} 
              alt="" 
              className="w-full h-full object-cover select-none pointer-events-none" 
            />
            
            {/* Footer / CTA */}
            <div className="absolute bottom-0 pb-safe-bottom inset-x-0 px-6 pt-24 pb-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center z-20 pointer-events-none">
              <h3 className="text-white text-3xl font-extrabold mb-6 drop-shadow-xl text-center tracking-tight">{activeStory.title}</h3>
              <div className="pointer-events-auto w-full">
                <button 
                  onClick={() => {
                    setActiveStoryIndex(null);
                    navigate(activeStory.link);
                  }}
                  className="w-full py-4 bg-white/95 text-black hover:bg-white rounded-2xl font-extrabold text-[17px] tracking-wide transition-all active:scale-95 shadow-xl shadow-white/10 flex items-center justify-center gap-2"
                >
                  Swipe to Shop
                  <ChevronRight size={20} className="opacity-60" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
