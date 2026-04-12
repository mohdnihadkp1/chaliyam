import { useState } from 'react';
import { SPOTS } from '../data';
import { MapPin, X, Palmtree, Landmark, Waves, Anchor, Sunset, Trees, ShoppingBag, Ship, Camera } from 'lucide-react';

export default function SpotsSection() {
  const [selectedSpot, setSelectedSpot] = useState<typeof SPOTS[0] | null>(null);

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
  };

  const getSpotIcon = (tag: string) => {
    switch(tag) {
      case 'Beach': return <Palmtree size={24} />;
      case 'Heritage': return <Landmark size={24} />;
      case 'Nature': return <Waves size={24} />;
      case 'Culture': return <Anchor size={24} />;
      case 'Scenic': return <Sunset size={24} />;
      case 'Eco': return <Trees size={24} />;
      case 'Market': return <ShoppingBag size={24} />;
      case 'Transport': return <Ship size={24} />;
      default: return <MapPin size={24} />;
    }
  };

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <h2 className="font-yatra text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
        <Camera className="text-gold" size={28} />
        Popular <span className="text-gold">Spots</span>
      </h2>
      <p className="text-text-light text-sm mb-8">
        ചാലിയത്തിലെ പ്രസിദ്ധ സ്ഥലങ്ങൾ — Discover the gems of Chaliyam
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {SPOTS.map((spot, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedSpot(spot)}
            className="bg-white dark:bg-[#1a2e20] rounded-2xl overflow-hidden border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] transition-all duration-250 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(26,74,46,0.18)] group flex flex-col"
          >
            <div className="h-[120px] md:h-[180px] relative overflow-hidden shrink-0">
              <img 
                src={spot.image} 
                alt={spot.name}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
              <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-gold text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[9px] md:text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                {spot.tag}
              </span>
            </div>
            <div className="p-3 md:p-4 flex-1 flex flex-col">
              <h3 className="font-yatra text-[14px] md:text-[17px] text-green-deep dark:text-gold-light mb-0.5 md:mb-1 leading-tight">{spot.name}</h3>
              <div className="font-malayalam text-[11px] md:text-[13px] text-gold-dark dark:text-gold mb-1.5 md:mb-2">{spot.mal}</div>
              <p className="text-[11px] md:text-[13px] text-text-light leading-[1.5] line-clamp-3 md:line-clamp-none">{spot.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Spot Details Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f2919] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="relative h-48 md:h-64">
              <img 
                src={selectedSpot.image} 
                alt={selectedSpot.name}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedSpot(null)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X size={18} />
              </button>
              <span className="absolute bottom-4 left-4 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
                {selectedSpot.tag}
              </span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="text-green-deep dark:text-gold-light">
                  {getSpotIcon(selectedSpot.tag)}
                </div>
                <h3 className="font-yatra text-2xl text-green-deep dark:text-gold-light">{selectedSpot.name}</h3>
              </div>
              <div className="font-malayalam text-sm text-gold-dark dark:text-gold mb-4 ml-9">{selectedSpot.mal}</div>
              
              <p className="text-sm md:text-base text-text-mid dark:text-text-light leading-relaxed mb-6">
                {selectedSpot.desc}
              </p>
              
              <button 
                onClick={() => openGoogleMaps(selectedSpot.lat, selectedSpot.lng)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl transition-colors font-medium text-base shadow-md"
              >
                <MapPin size={20} />
                View on Google Maps
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
