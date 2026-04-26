import { ShareModal } from './ShareModal';
import { advancedShare } from '../lib/shareUtils';
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
  Share2,
  Mail,
  Send,
} from 'lucide-react';
import { useNavigate, useSearchParams } from "react-router-dom";

import Fuse from"fuse.js";
export default function DirectorySection() {
 const [selectedCategories, setSelectedCategories] = useState<string[]>([
"all",
 ]);
 const [searchQuery, setSearchQuery] = useState("");
 const navigate = useNavigate();
 const [shareData, setShareData] = useState<{title: string, text?: string, url: string, imageUrl?: string} | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
 const selectedId = searchParams.get("id");
 const selectedItem = DIRECTORY.find(d => String(d.id) === selectedId) || null;
 const setSelectedItem = (i: any) => { if (i) searchParams.set("id", String(i.id)); else searchParams.delete("id"); setSearchParams(searchParams); };
 const doShare = async (data: {title: string, text?: string, url: string, imageUrl?: string}) => {
   const success = await advancedShare(data);
   if (!success) setShareData(data);
 };

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
 const [showContactForm, setShowContactForm] = useState(false);
 const [contactFormData, setContactFormData] = useState({ name: '', email: '', phone: '', message: '' });

 const fuse = useMemo(
 () =>
 new Fuse(DIRECTORY, {
 keys: ["name","desc","catLabel"],
 threshold: 0.5,
 distance: 300,
 ignoreLocation: true,
 minMatchCharLength: 2,
 }),
 [],
 );
 const handleContactSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   const text = `*Contact Inquiry for ${selectedItem?.name}*\n\n*Name:* ${contactFormData.name}\n*Email:* ${contactFormData.email}\n*Phone:* ${contactFormData.phone}\n\n*Message:*\n${contactFormData.message}`;
   // Use selected item's phone if available, otherwise fallback to a generic WhatsApp link (without number to pick from contacts)
   const phoneRaw = (selectedItem as any)?.phone;
   const phone = phoneRaw ? phoneRaw.replace(/[^0-9]/g, '') : '919846750898';
   const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
   
   window.open(waUrl, '_blank');
   setShowContactForm(false);
   setContactFormData({ name: '', email: '', phone: '', message: '' });
 };

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
  const text = `*Suggest Edit for ${item.name}*\n\nI would like to suggest changes for ${item.name}:\n\nPlease describe the changes below:\n\n`;
  window.open(`https://wa.me/919846750898?text=${encodeURIComponent(text)}`, '_blank');
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
 "telephone": "${(selectedItem as any).phone || ''}",
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
 className="w-full pl-9 md:pl-10 pr-10 md:pr-12 py-3 rounded-2xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder-[var(--color-on-surface-variant)] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
 />
 {searchQuery && (
   <button 
     onClick={() => setSearchQuery("")}
     className="absolute right-3 top-[50%] -translate-y-[50%] text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
   >
     <X size={14} />
   </button>
 )}
 </div>
 </div>
 <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-5 flex-wrap overflow-x-auto pb-1 scrollbar-hide items-center">
 
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
 className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] hover:shadow-md cursor-pointer transition-all duration-300 font-sans whitespace-nowrap active:scale-95 flex items-center gap-1 ${selectedCategories.includes(btn.id) ?"bg-[var(--color-primary)] text-white border-[var(--color-primary)] font-bold shadow-sm" :"bg-[var(--color-surface)] text-slate-500 border-[var(--color-outline)] hover:bg-slate-50"}`}
 >
 {btn.label}
 </button>
 ))}
 {selectedCategories.length > 0 && !selectedCategories.includes("all") && (
   <button
     onClick={() => setSelectedCategories(["all"])}
     className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-[13px] hover:shadow-md cursor-pointer transition-all duration-300 font-sans whitespace-nowrap active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 flex items-center gap-1"
   >
     <X size={14} /> Clear
   </button>
 )}
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
 className="bg-white rounded-[1rem] md:rounded-[1.25rem] border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-95 active:bg-slate-50 transition-all duration-300 ease-in-out w-full flex flex-col cursor-pointer group relative overflow-hidden h-full"
 >
 
 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 
 <div className="flex flex-col w-full h-full relative z-10">
 <button
   onClick={(e) => { e.stopPropagation(); doShare({ title: item.name, text: item.desc, url: window.location.origin + window.location.pathname + "?id=" + item.id, imageUrl: item.image }); }}
   className="absolute top-2 right-2 p-1.5 md:p-2 bg-white/80 hover:bg-white backdrop-blur-sm text-slate-600 hover:text-[var(--color-primary)] rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 shadow-sm border border-slate-100"
   title="Share Business"
 >
   <Share2 size={14} />
 </button>
 {item.image ? (
 <div className="w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden shrink-0 bg-slate-50 relative border-b border-white">
 
 <img
 src={item.image}
 alt={item.name}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
 />
 </div>
 ): (
 <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] transition-all duration-300 border-b border-white">
 
 <div className="scale-110 md:scale-150 group-hover:text-white transition-all duration-500 group-hover:scale-125">{getDirectoryIcon(item.cat, item.name)}</div>
 </div>
 )}
 <div className="flex flex-col flex-1 p-2 md:p-4 w-full">
 
 <h4 className="font-bold text-[10px] md:text-[15px] leading-tight text-slate-800 line-clamp-2 md:line-clamp-2 w-full group-hover:text-[var(--color-primary)] transition-colors mt-1 md:mt-0 text-center md:text-left"
     dangerouslySetInnerHTML={{
       __html: searchQuery 
         ? item.name.replace(new RegExp(`(${searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'), '<mark class="bg-yellow-200 rounded-sm px-0.5 rounded px-1 -mx-0.5 text-slate-800">$1</mark>')
         : item.name
     }}
 >
 </h4>
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
 className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
 onClick={() => setSelectedItem(null)}
 >
 
 <div
 className="bg-[var(--color-surface)] w-full max-w-md max-h-[90vh] flex flex-col rounded-[24px] md:rounded-[28px] overflow-hidden shadow-2xl animate-scale-up-center relative"
 onClick={(e) => e.stopPropagation()}
 >
 
 <button
 onClick={() => setSelectedItem(null)}
 className="absolute top-3 right-3 text-slate-800 hover:text-[var(--color-danger)] transition-colors bg-white/80 hover:bg-white backdrop-blur-md p-2 rounded-full z-20 shadow-sm min-w-10 min-h-10 flex items-center justify-center"
 >
 <X size={20} />
 </button>
 
 <div className="overflow-y-auto w-full h-full flex-shrink">
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
 
   {showContactForm ? (
     <div className="bg-white rounded-2xl">
       <button onClick={() => setShowContactForm(false)} className="text-sm text-slate-500 mb-4 flex items-center gap-1 hover:text-slate-800 transition-colors">
         ← Back to details
       </button>
       <h3 className="font-bold text-xl text-slate-800 mb-4">Contact {selectedItem.name}</h3>
       <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
         <input 
           type="text" 
           required
           placeholder="Your Name" 
           value={contactFormData.name}
           onChange={e => setContactFormData({...contactFormData, name: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50 text-sm"
         />
         <input 
           type="email"
           required 
           placeholder="Email Address" 
           value={contactFormData.email}
           onChange={e => setContactFormData({...contactFormData, email: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50 text-sm"
         />
         <input 
           type="tel" 
           placeholder="Phone Number" 
           value={contactFormData.phone}
           onChange={e => setContactFormData({...contactFormData, phone: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50 text-sm"
         />
         <textarea 
           required
           placeholder="Your Message..." 
           rows={3}
           value={contactFormData.message}
           onChange={e => setContactFormData({...contactFormData, message: e.target.value})}
           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50 text-sm resize-none"
         ></textarea>
         <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2">
           <Send size={18} /> Send Message
         </button>
       </form>
     </div>
   ) : (
     <>
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
              <button
                onClick={() => setShowContactForm(true)}
                className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-3 rounded-full font-medium transition-colors w-full justify-center text-sm"
              >
                <Mail size={18} /> Contact Business
              </button>
              <button
                onClick={() => doShare({ title: selectedItem.name, text: selectedItem.desc, url: window.location.href, imageUrl: selectedItem.image })}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-full font-medium transition-colors w-full justify-center text-sm relative overflow-hidden active:scale-95 transition-all duration-300"
              >
                <Share2 size={18} /> Share Business
              </button>
 
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
 </>
   )}
 </div>
  </div>
  </div>
  </div>
  )}
 {/* Floating Master Order Button */}
 <button
 onClick={() => navigate('/order')}
 className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-slate-900 font-bold px-5 py-3 md:px-6 md:py-4 rounded-full shadow-[0_4px_20px_rgba(201,148,26,0.4)] flex items-center justify-center gap-2.5 z-40 transition-transform hover:scale-105 active:scale-95 animate-fade-in"
 >
 
 <ShoppingBag size={20} className="md:w-6 md:h-6" />
 <span className="text-sm md:text-base">Order Delivery</span>
 </button>
 </div>
 </>
 );
}
