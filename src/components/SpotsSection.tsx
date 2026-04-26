import { useNavigate, useSearchParams } from "react-router-dom";
import InFeedAdCard from "./InFeedAdCard";
import { ShareModal } from './ShareModal';
import { advancedShare } from '../lib/shareUtils';
import React from "react";
import { Helmet } from "react-helmet-async";
import { useState } from"react";
import { SPOTS } from"../data";
import {
 MapPin,
 X,
 Palmtree,
 Landmark,
 Waves,
 Anchor,
 Sunset,
 Trees,
 ShoppingBag,
 Ship,
 Camera,
  Share2,
} from 'lucide-react';
export default function SpotsSection() {
  const navigate = useNavigate();
 const [shareData, setShareData] = useState<{title: string, text?: string, url: string, imageUrl?: string} | null>(null);
 const [selectedSpot, setSelectedSpot] = useState<(typeof SPOTS)[0] | null>(
 null,
 );
 const openGoogleMaps = (lat: number, lng: number) => {
 window.open(
 `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
"_blank",
 );
 };
 const getSpotIcon = (tag: string) => {
 switch (tag) {
 case"Beach":
 return <Palmtree size={24} />;
 case"Heritage":
 return <Landmark size={24} />;
 case"Nature":
 return <Waves size={24} />;
 case"Culture":
 return <Anchor size={24} />;
 case"Scenic":
 return <Sunset size={24} />;
 case"Eco":
 return <Trees size={24} />;
 case"Market":
 return <ShoppingBag size={24} />;
 case"Transport":
 return <Ship size={24} />;
 default:
 return <MapPin size={24} />;
 }
 };
 
  const doShare = async (data: {title: string, text?: string, url: string, imageUrl?: string}) => {
    const success = await advancedShare(data);
    if (!success) {
      setShareData(data);
    }
  };

  return (
    <>
      <Helmet>
        {selectedSpot ? (
          <script type="application/ld+json">
            {`${JSON.stringify({ "@context": "https://schema.org", "@type": "TouristAttraction", name: selectedSpot.name, image: selectedSpot.image || "", description: selectedSpot.desc })}`}
          </script>
        ) : (
          <script type="application/ld+json">
            {`${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": SPOTS.slice(0, 10).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": "https://chaliyam-connect.web.app" + window.location.pathname + "?id=" + (item.id || item.id)
              }))
            })}`}
          </script>
        )}
      </Helmet>
      
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 
 <h2 className="font-yatra text-xl md:text-[28px] text-black mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3">
 
 <Camera className="text-[var(--color-primary)] w-6 h-6 md:w-7 md:h-7" />
 Popular <span className="text-[var(--color-primary)]">Spots</span>
 </h2>
 <p className="text-slate-500 text-xs md:text-sm mb-5 md:mb-8">
 
 ചാലിയത്തിലെ പ്രസിദ്ധ സ്ഥലങ്ങൾ — Discover the gems of Chaliyam
 </p>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-5">
 
 {SPOTS.map((spot, index) => (
            <React.Fragment key={index}>
              {index === 2 && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4">
                  <InFeedAdCard 
                    title="Plan Your Travel"
                    description="Check the latest bus timings and routes to visit these beautiful spots."
                    image="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                    cta="View Bus Schedule"
                    path="/bus"
                  />
                </div>
              )}
 <div onClick={() => setSelectedSpot(spot)}
 className="bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out flex flex-col group cursor-pointer"
 >
 
 <div className="h-[100px] md:h-[180px] relative overflow-hidden shrink-0 border-b border-[var(--color-outline)]">
 <button
   onClick={(e) => { e.stopPropagation(); doShare({ title: spot.name, text: spot.desc, url: window.location.origin + window.location.pathname + "?id=" + spot.id, imageUrl: spot.image }); }}
   className="absolute top-2 left-2 p-1 md:p-1.5 bg-white/80 hover:bg-white backdrop-blur-sm text-slate-600 hover:text-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 shadow-sm border border-slate-100"
   title="Share Spot"
 >
   <Share2 size={12} className="md:w-3.5 md:h-3.5" />
 </button>
 <img
 src={spot.image}
 alt={spot.name}
 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60"></div>
 <span className="absolute top-2 right-2 md:top-3 md:right-3 bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-outline)] text-[var(--color-primary)] px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg text-[9px] md:text-[11px] font-semibold uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
 
 {spot.tag}
 </span>
 </div>
 <div className="p-2.5 md:p-4 flex-1 flex flex-col bg-gradient-to-b from-white/5 to-transparent">
 
 <h3 className="font-yatra text-[13px] md:text-[17px] text-slate-800 mb-0.5 md:mb-1 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
 {spot.name}
 </h3>
 <div className="font-malayalam text-[10px] md:text-[13px] text-[var(--color-primary)]/80 mb-1 md:mb-2">
 {spot.mal}
 </div>
 <p className="text-[10px] md:text-[13px] text-slate-500 leading-[1.5] line-clamp-3 md:line-clamp-none">
 {spot.desc}
 </p>
 </div>
 </div></React.Fragment>))}
 </div>
 {/* Spot Details Modal */}
 {selectedSpot && (
 <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
 
 <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] w-full max-w-lg rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl animate-scale-up-center max-h-[90vh] flex flex-col">
 
 <div className="relative h-48 md:h-64 border-b border-[var(--color-outline)] shrink-0">
 
 <img
 src={selectedSpot.image}
 alt={selectedSpot.name}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80"></div>
 <button
 onClick={() => setSelectedSpot(null)}
 className="absolute top-4 right-4 min-w-10 min-h-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-red-400 transition-colors z-20"
 >
 
 <X size={20} />
 </button>
 <span className="absolute bottom-4 left-4 bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-outline)] text-[var(--color-primary)] px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10">
 
 {selectedSpot.tag}
 </span>
 </div>
 <div className="p-5 md:p-6 bg-gradient-to-b from-white/5 to-transparent overflow-y-auto custom-scrollbar">
 
 <div className="flex items-center gap-3 mb-1">
 
 <div className="text-[var(--color-primary)] bg-[var(--color-primary-container)] p-2 rounded-xl border border-gold/20 shadow-inner">
 
 {getSpotIcon(selectedSpot.tag)}
 </div>
 <h3 className="font-yatra text-2xl text-slate-800">
 {selectedSpot.name}
 </h3>
 </div>
 <div className="font-malayalam text-sm text-[var(--color-primary)]/80 mb-4 ml-14">
 {selectedSpot.mal}
 </div>
 <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-6">
 
 {selectedSpot.desc}
 </p>
 <button
                 onClick={() => doShare({ title: selectedSpot.name, text: selectedSpot.desc, url: window.location.href, imageUrl: selectedSpot.image })}
                 className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-full font-medium transition-colors"
               >
                 <Share2 size={18} /> Share Spot
               </button>
               <button onClick={() => openGoogleMaps(selectedSpot.lat, selectedSpot.lng)}
 className="w-full flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-600 border border-blue-500/50 text-white py-3.5 rounded-xl transition-colors font-medium text-base shadow-[0_0_15px_rgba(37,99,235,0.2"
 >
 
 <MapPin size={20} /> View on Google Maps
 </button>
 <button
  onClick={(e) => {
    e.stopPropagation();
    const text = `*Suggest Edit/Report Issue for ${selectedSpot.name}*\n\nI would like to suggest changes for ${selectedSpot.name}:\n\nPlease describe the changes below:\n\n`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(text)}`, '_blank');
  }}
  className="mt-4 w-full flex justify-center text-[12px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-slate-200 border-dashed pt-4"
>
  Suggest an edit or report issue
</button>
</div>
</div>
</div>
 )}
 </div></>);
}