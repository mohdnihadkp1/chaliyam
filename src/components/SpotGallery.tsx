import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SPOTS } from '../data';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SpotGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const spot = SPOTS.find(s => s.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!spot || !spot.gallery || spot.gallery.length === 0) {
      navigate('/spots', { replace: true });
    }
  }, [spot, navigate]);

  if (!spot || !spot.gallery || spot.gallery.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spot.gallery.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + spot.gallery.length) % spot.gallery.length);
  };

  const currentImage = spot.gallery[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col w-full h-full">
      <Helmet>
        <title>{`${spot.name} Gallery - Chaliyam Connect`}</title>
        <meta name="description" content={`Photo gallery for ${spot.name}`} />
      </Helmet>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10 flex items-center justify-center backdrop-filter"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-lg md:text-xl font-bold tracking-wide drop-shadow-md">{spot.name}</h1>
          <p className="text-xs text-white/70 font-medium tracking-widest uppercase">
            {currentIndex + 1} / {spot.gallery.length}
          </p>
        </div>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Main Image Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden touch-none selection:bg-transparent">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentImage}
            alt={`${spot.name} - ${currentIndex + 1}`}
            className="w-full h-full object-contain md:object-cover aspect-video max-h-screen"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {/* Navigation Buttons for larger screens */}
        {spot.gallery.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all active:scale-90 border border-white/10 group shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all active:scale-90 border border-white/10 group shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnails Strip */}
      {spot.gallery.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-6 px-4 pb-safe-bottom z-10">
          <div className="flex gap-2.5 overflow-x-auto pb-4 justify-start md:justify-center items-center max-w-full px-2 scrollbar-none scroll-smooth">
            {spot.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  idx === currentIndex
                    ? 'ring-2 ring-white scale-110 shadow-xl opacity-100'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                {idx === currentIndex && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute inset-0 border-2 border-white rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
