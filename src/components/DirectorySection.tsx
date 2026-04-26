import React, { useState, useMemo } from "react"
import { Helmet } from "react-helmet-async";
import { DIRECTORY } from"../data";
import { DealOfTheDay, GridBannerAd } from './PromoBanners';
import InFeedAdCard from './InFeedAdCard';
import {
 Star,
 Fish,
 Utensils,
 Pill,
 Wrench,
 ShoppingCart,
 BookOpen,
 Scissors,
 Plug,
 IceCream,
 Phone as PhoneIcon,
 Store,
 Search,
 X,
 ShoppingBag,
 GraduationCap,
 Landmark,
 Bus,
 Heart,
 Plus,
} from"lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Fuse from"fuse.js";
export default function DirectorySection() {
 const [selectedCategories, setSelectedCategories] = useState<string[]>([
"all",
 ]);
 const [searchQuery, setSearchQuery] = useState("");
 const navigate = useNavigate();
 const [searchParams, setSearchParams] = useSearchParams();
 const selectedId = searchParams.get("id");
 const selectedItem = DIRECTORY.find(d => String(d.id) === selectedId) || null;
 const setSelectedItem = (i: any) => { if (i) searchParams.set("id", String(i.id)); else searchParams.delete("id"); setSearchParams(searchParams); };
 const toggleCategory = (categoryId: string) => {
 if (categoryId ==="all") {
 setSelectedCategories(["all"]);
 return;
 }
 setSelectedCategories((prev) => {
 const newSelection = prev.filter((id) => id !=="all");
 if (newSelection.includes(categoryId)) {
 const filtered = newSelection.filter((id) => id !== categoryId);
 return filtered.length === 0 ? ["all"] : filtered;
 } else {
 return [...newSelection, categoryId];
 }
 });
 };
 const fuse = useMemo(
 () =>
 new Fuse(DIRECTORY, {
 keys: ["name","desc","catLabel"],
 threshold: 0.4,
 distance: 100,
 }),
 [],
 );
 const filteredDirectory = useMemo(() => {
 let result = DIRECTORY;
 if (searchQuery.trim() !=="") {
 result = fuse.search(searchQuery).map((res) => res.item);
 }
 return result.filter((d) => {
 const matchesFilter =
 selectedCategories.includes("all") ||
 selectedCategories.includes(d.cat);
 return matchesFilter;
 });
 }, [searchQuery, selectedCategories, fuse]);
 const handleSuggestAdd = () => {
 const subject = encodeURIComponent("New Directory Listing Suggestion");
 const body = encodeURIComponent(
"Please provide the following details:\n\nBusiness Name:\nCategory:\nDescription:\nLocation Link (Google Maps):\nContact Number:",
 );
 window.location.href = `mailto:mohdnihadkp@gmail.com?subject=${subject}&body=${body}`;
 };
 const handleSuggestEdit = (item: (typeof DIRECTORY)[0]) => {
 const subject = encodeURIComponent(`Edit Suggestion: ${item.name}`);
 const body = encodeURIComponent(
 `I would like to suggest changes for ${item.name}:\n\nPlease describe the changes below:\n\n`,
 );
 window.location.href = `mailto:mohdnihadkp@gmail.com?subject=${subject}&body=${body}`;
 };
 const getDirectoryIcon = (cat: string, name: string) => {
 const lowerName = name.toLowerCase();
 if (cat ==="fishing")
 return <Fish className="text-[#0277bd] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="food" && lowerName.includes("ice cream"))
 return <IceCream className="text-[#e91e63] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="food")
 return <Utensils className="text-[#e65100] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="medical")
 return <Pill className="text-[#2e7d32] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="education")
 return <GraduationCap className="text-[#8e24aa] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="finance")
 return <Landmark className="text-[#1565c0] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="transport")
 return <Bus className="text-[#d84315] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="religious")
 return <Heart className="text-[#00838f] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="retail" && lowerName.includes("book"))
 return <BookOpen className="text-[#6a1b9a] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="retail")
 return <ShoppingCart className="text-[#f57c00] w-5 h-5 md:w-6 md:h-6" />;
 if (lowerName.includes("saloon"))
 return <Scissors className="text-[#455a64] w-5 h-5 md:w-6 md:h-6" />;
 if (lowerName.includes("electrical"))
 return <Plug className="text-[#fbc02d] w-5 h-5 md:w-6 md:h-6" />;
 if (lowerName.includes("mobile"))
 return <PhoneIcon className="text-[#1976d2] w-5 h-5 md:w-6 md:h-6" />;
 if (cat ==="service")
 return <Wrench className="text-[#607d8b] w-5 h-5 md:w-6 md:h-6" />;
 return <Store className="text-[#2d7a4f] w-5 h-5 md:w-6 md:h-6" />;
 };
 return (
 <>
 <Helmet>
 {selectedItem ? (
 <script type="application/ld+json">
 {`{
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 "name": "${selectedItem.name}",
 "image": "${selectedItem.image || ''}",
 "description": "${selectedItem.desc}",
 "telephone": "${selectedItem.phone || ''}",
 "address": {
 "@type": "PostalAddress",
 "addressLocality": "Chaliyam",
 "addressRegion": "Kerala",
 "addressCountry": "IN"
 }
 }`}
 </script>
 ) : null}
 </Helmet>
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-4 md:mb-6">
 
 <div>
 
 <h2 className="font-yatra text-xl md:text-[28px] text-[var(--color-primary)] mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3">
 
 <Store className="w-6 h-6 md:w-7 md:h-7" /> Local Directory
 </h2>
 <p className="text-slate-500 text-xs md:text-sm">
 
 ചാലിയത്തിലെ ബിസിനസ് ഡയറക്ടറി — Find local shops and services near
 you
 </p>
 </div>
 <button
 onClick={() => navigate('/directory/add')}
 className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-bold shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] hover:-translate-y-1 transition-all duration-300 ease-out text-sm shrink-0 active:scale-95 uppercase tracking-wider"
 >
 
 <Plus size={18} /> Submit Listing
 </button>
 </div>
 <div className="flex gap-2.5 md:gap-3 mb-4 md:mb-5">
 
 <div className="relative flex-1">
 
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 
 <Search
 size={16}
 className="text-slate-500 md:w-[18px] md:h-[18px]"
 />
 </div>
 <input
 type="text"
 placeholder="Search businesses, shops, services..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-3 rounded-2xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder-[var(--color-on-surface-variant)] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
 />
 </div>
 </div>
 <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-5 flex-wrap overflow-x-auto pb-1 scrollbar-hide">
 
 {[
 { id:"all", label:"All" },
 { id:"retail", label:"Retail" },
 { id:"food", label:"Food" },
 { id:"service", label:"Services" },
 { id:"medical", label:"Medical" },
 { id:"education", label:"Education" },
 { id:"religious", label:"Religious" },
 { id:"finance", label:"Finance" },
 { id:"fishing", label:"Fishing" },
 { id:"transport", label:"Transport" },
 ].map((btn) => (
 <button
 key={btn.id}
 onClick={() => toggleCategory(btn.id)}
 className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] cursor-pointer transition-all font-sans whitespace-nowrap ${selectedCategories.includes(btn.id) ?"bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] border-[var(--color-primary-container)] font-medium" :"bg-[var(--color-surface)] text-slate-500 border-[var(--color-outline)] hover:bg-slate-50"}`}
 >
 
 {btn.label}
 </button>
 ))}
 </div>
 <div className="mb-6 hidden md:block mt-4">
  <GridBannerAd 
   image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" 
   subtitle="Sponsored Directory Listing" 
   title="Fresh Fish Delivered" 
   cta="Call Now" 
   path="/directory" 
  />
 </div>
 <div className="mb-4 md:hidden mt-4">
  <InFeedAdCard 
   title="Medical Checkup Camp" 
   description="Free consultation today at Chaliyam PHC" 
   image="https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&w=800&q=80" 
   cta="Learn more" 
   path="/directory" 
  />
 </div>
 <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6">
 
 {filteredDirectory.map((item, index) => (
 <div
 key={index}
 onClick={() => setSelectedItem(item)}
 className="bg-white p-2 md:p-4 rounded-xl md:rounded-[1.25rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-in-out w-full flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[140px]"
 >
 
 <div className="flex flex-col items-center justify-center w-full h-full gap-2 md:gap-3">
 
 {item.image ? (
 <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[var(--color-outline)] mb-1">
 
 <img
 src={item.image}
 alt={item.name}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
 />
 </div>
 ): (
 <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] flex items-center justify-center shrink-0 border border-[var(--color-outline)] shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-1 group-hover:bg-[var(--color-primary)] transition-colors">
 
 <div className="scale-75 md:scale-100 group-hover:text-white transition-colors">{getDirectoryIcon(item.cat, item.name)}</div>
 </div>
 )}
 <div className="flex flex-col justify-center items-center w-full">
 
 <h4 className="font-semibold text-[11px] leading-tight md:text-sm text-slate-800 line-clamp-2 md:truncate mb-1 w-full px-1">
 {item.name}
 </h4>
 <div className="flex flex-col md:flex-row items-center gap-1 w-full justify-center">
 
 <span className="text-[9px] md:text-xs text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-1.5 py-0.5 rounded-full font-medium inline-block shrink-0 truncate max-w-[90%]">
 
 {item.catLabel}
 </span>
 </div>
 </div>
 </div>
 </div>
 ))}
 {filteredDirectory.length === 0 && (
 <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500">
 
 <Store size={48} className="mb-4 opacity-20" />
 <p>No listings found matching your criteria.</p>
 </div>
 )}
 </div>
 {/* Item Details Popup Modal */}
 {selectedItem && (
 <div
 className="fixed inset-0 bg-[var(--color-surface)] backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
 onClick={() => setSelectedItem(null)}
 >
 
 <div
 className="bg-[var(--color-surface)] w-full max-w-md rounded-[28px] overflow-hidden shadow-xl animate-scale-up-center relative my-auto"
 onClick={(e) => e.stopPropagation()}
 >
 
 <button
 onClick={() => setSelectedItem(null)}
 className="absolute top-4 right-4 text-slate-800 hover:text-[var(--color-danger)] transition-colors bg-white/70 hover:bg-white backdrop-blur-sm p-2 rounded-full z-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
 >
 
 <X size={18} />
 </button>
 {selectedItem.image ? (
 <div className="w-full h-48 md:h-64 relative z-0">
 
 <img
 src={selectedItem.image}
 alt={selectedItem.name}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent"></div>
 </div>
 ): (
 <div className="w-full h-48 md:h-64 bg-[var(--color-primary-container)] relative z-0 flex items-center justify-center">
 
 <div className="w-20 h-20 rounded-3xl bg-[var(--color-surface)] flex items-center justify-center shadow-md">
 
 {getDirectoryIcon(selectedItem.cat, selectedItem.name)}
 </div>
 <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent"></div>
 </div>
 )}
 <div className="p-5 md:p-6 relative z-10 -mt-6">
 
 <div className="text-center mb-6">
 
 <h3 className="font-bold text-2xl md:text-3xl text-slate-800 mb-3 tracking-tight">
 {selectedItem.name}
 </h3>
 <div className="flex justify-center items-center gap-2.5 mb-4">
 
 <span className="text-xs md:text-sm text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 px-3 py-1 rounded-full font-medium">
 
 {selectedItem.catLabel}
 </span>
 {selectedItem.rating && (
 <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-slate-800 bg-slate-50 px-3 py-1 rounded-full">
 
 <Star
 size={14}
 className="fill-[#F59E0B] text-[#F59E0B]"
 />
 <span>{selectedItem.rating}</span>
 <span className="text-slate-500 font-normal">
 ({selectedItem.reviews})
 </span>
 </div>
 )}
 </div>
 <p className="text-slate-800 text-sm md:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl mb-4 text-left">
 {selectedItem.desc}
 </p>
 <div className="flex flex-col gap-3">
 
 {/* @ts-ignore */}
 {selectedItem.mapUrl && (
 <div className="flex justify-center">
 
 {/* @ts-ignore */}
 <a
 href={selectedItem.mapUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[#4285F4] px-5 py-3 rounded-full font-medium transition-colors w-full justify-center text-sm"
 >
 
 <Store size={18} /> View on Maps
 </a>
 </div>
 )}
 <button
 onClick={() => handleSuggestEdit(selectedItem)}
 className="flex justify-center text-xs text-slate-500 hover:text-slate-800 transition-colors mt-1 font-medium"
 >
 
 Suggest an edit or report issue
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}
 {/* Floating Master Order Button */}
 <button
 onClick={() => navigate('/order')}
 className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-slate-900 font-bold px-5 py-3 md:px-6 md:py-4 rounded-full shadow-[0_4px_20px_rgba(201,148,26,0.4 flex items-center justify-center gap-2.5 z-40 transition-transform hover:scale-105 active:scale-95 animate-fade-in"
 >
 
 <ShoppingBag size={20} className="md:w-6 md:h-6" />
 <span className="text-sm md:text-base">Order Delivery</span>
 </button>
 </div>
 </>
 );
}
