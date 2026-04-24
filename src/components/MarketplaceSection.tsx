import React from 'react';
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from"react";
import { BUSINESS_LISTINGS } from"../data";
import InFeedAdCard from './InFeedAdCard';
import { GridBannerAd } from './PromoBanners';
import {
 MessageCircle,
 X,
 Search,
 Plus,
 Briefcase,
 MapPin,
 Upload,
 Store,
} from"lucide-react";
export default function MarketplaceSection() {
 const [selectedCategories, setSelectedCategories] = useState<string[]>([
"all",
 ]);
 const [searchInput, setSearchInput] = useState("");
 const [searchQuery, setSearchQuery] = useState("");
 const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const selectedItem = MARKETPLACE.find((d: any) => String(d.id || d.id) === selectedId) || null;
  const setSelectedItem = (item: any) => {
    if (item) {
      searchParams.set("id", String(item.id || item.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [uploadedImages, setUploadedImages] = useState<string[]>([]);
 const fileInputRef = useRef<HTMLInputElement>(null);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
 useEffect(() => {
 const timer = setTimeout(() => {
 setSearchQuery(searchInput);
 }, 300);
 return () => clearTimeout(timer);
 }, [searchInput]);
 /* Reset image index when opening a new item */ useEffect(() => {
 setCurrentImageIndex(0);
 }, [selectedItem]);
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
 const filteredBusiness = BUSINESS_LISTINGS.filter((c) => {
 const matchesFilter =
 selectedCategories.includes("all") || selectedCategories.includes(c.type);
 const q = searchQuery.toLowerCase();
 const matchesSearch =
 c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q);
 return matchesFilter && matchesSearch;
 });
 const handleWhatsApp = (contact: string, title: string) => {
 const cleanPhone = contact.replace(/[^0-9]/g,"");
 const message = `Hello, I saw your listing"${title}" on Chaliyam Connect and I am interested.`;
 window.open(
 `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`,
"_blank",
 );
 };
 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
 const files = e.target.files;
 if (!files) return;
 const newImages: string[] = [];
 const remainingSlots = 3 - uploadedImages.length;
 const filesToProcess = Array.from(files).slice(0, remainingSlots);
 filesToProcess.forEach((file) => {
 const reader = new FileReader();
 reader.onload = (event) => {
 if (event.target?.result) {
 setUploadedImages((prev) => [
 ...prev,
 event.target!.result as string,
 ]);
 }
 };
 reader.readAsDataURL(file);
 });
 };
 const removeImage = (index: number) => {
 setUploadedImages((prev) => prev.filter((_, i) => i !== index));
 };
 const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 const type = formData.get("type");
 const title = formData.get("title");
 const desc = formData.get("desc");
 const price = formData.get("price");
 const contactName = formData.get("contactName");
 const contactDesc = formData.get("contactDesc");
 const contactPhone = formData.get("contactPhone");
 const message = `*New Listing Request*\n\n*Type:* ${type}\n*Title:* ${title}\n*Description:* ${desc}\n*Price:* ${price}\n*Contact Name:* ${contactName}\n*About:* ${contactDesc ||"N/A"}\n*Phone:* ${contactPhone}\n*Images:* ${uploadedImages.length > 0 ?"Attached" :"None"}`;
 window.open(
 `https://wa.me/919846750898?text=${encodeURIComponent(message)}`,
"_blank",
 );
 setIsAddModalOpen(false);
 setUploadedImages([]);
 };
 return (
    <>
      <Helmet>
        {selectedItem ? (
          <script type="application/ld+json">
            {`${JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: selectedItem.title, image: selectedItem.images?.[0] || selectedItem.image || "", description: selectedItem.desc, offers: { "@type": "Offer", price: selectedItem.price, priceCurrency: "INR", availability: "https://schema.org/InStock" } })}`}
          </script>
        ) : (
          <script type="application/ld+json">
            {`${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": MARKETPLACE.slice(0, 10).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": "https://chaliyam-connect.web.app" + window.location.pathname + "?id=" + (item.id || item.id)
              }))
            })}`}
          </script>
        )}
      </Helmet>
      
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-4 md:mb-6">
 
 <div>
 
 <h2 className="font-yatra text-xl md:text-3xl mb-1 flex items-center gap-2 text-slate-800 drop-shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
 
 <Store className="text-[var(--color-primary)] w-6 h-6 md:w-7 md:h-7" />
 Marketplace
 </h2>
 <p className="text-slate-500 text-[11px] md:text-sm font-medium">
 
 Buy, sell, rent, and find local services in Chaliyam.
 </p>
 </div>
 <button
 onClick={() => navigate('/marketplace/add')}
 className="flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold transition-colors shadow-sm text-sm border-transparent"
 >
 <Plus size={18} /> Create Listing
 </button>
 </div>
 <div className="flex gap-2 md:gap-3 mb-4">
 
 <div className="relative flex-1">
 
 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
 
 <Search size={18} className="text-[var(--color-primary)]" />
 </div>
 <input
 type="text"
 placeholder="Search Marketplace"
 value={searchInput}
 onChange={(e) => setSearchInput(e.target.value)}
 className="w-full pl-11 pr-4 py-3 rounded-full border border-[var(--color-outline)] bg-[var(--color-surface)] text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
 />
 </div>
 </div>
 {/* Pill Filters */}
 <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
 
 {[
 { id:"all", label:"All Listings" },
 { id:"sell", label:"For Sale" },
 { id:"buy", label:"Wanted" },
 { id:"rent", label:"Rentals" },
 { id:"service", label:"Services" },
 ].map((btn) => (
 <button
 key={btn.id}
 onClick={() => toggleCategory(btn.id)}
 className={`px-5 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap snap-start border ${selectedCategories.includes(btn.id) ?"bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] border-transparent" :"bg-[var(--color-surface)] text-slate-500 border-[var(--color-outline)] hover:bg-slate-50"}`}
 >
 
 {btn.label}
 </button>
 ))}
 </div>
 <div className="mb-6 hidden md:block mt-4">
  <GridBannerAd 
   image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80" 
   subtitle="Sponsored Local Seller" 
   title="Used Electronics Sale" 
   cta="Shop Offers" 
   path="/store" 
  />
 </div>

 <div className="mb-4 md:hidden mt-4">
  <InFeedAdCard 
   title="Calicut Store App" 
   description="Get fresh groceries delivered." 
   image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80" 
   cta="Install Now" 
   path="/store" 
  />
 </div>
 {/* Grid Layout like FB Marketplace */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
 
 {filteredBusiness.map((item, index) => (
 <div
 key={index}
 onClick={() => setSelectedItem(item)}
 className="flex flex-col cursor-pointer group bg-white border border-slate-100 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
 >
 
 <div className="w-full aspect-square bg-slate-50 relative border-b border-[var(--color-outline)] overflow-hidden">
 
 {item.images && item.images.length > 0 ? (
 <img
 src={item.images[0]}
 alt={item.title}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
 referrerPolicy="no-referrer"
 />
 ): (
 <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
 
 <Briefcase size={32} className="mb-2 opacity-50" />
 <span className="text-[10px] font-medium uppercase tracking-wider">
 {item.typeLabel}
 </span>
 </div>
 )}
 {/* Type overlay at bottom-left inside image */}
 <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide bg-black/60 text-white backdrop-blur-sm">
 
 {item.typeLabel}
 </div>
 </div>
 <div className="flex flex-col p-3">
 
 <span className="font-bold text-sm md:text-base text-slate-800 leading-tight mb-1">
 {item.price}
 </span>
 <span className="text-[13px] md:text-sm text-slate-500 line-clamp-1 mb-1 font-medium">
 {item.title}
 </span>
 <span className="text-[11px] text-slate-500 opacity-80">
 Chaliyam • {item.date}
 </span>
 </div>
 </div>
 ))}
 </div>
 {filteredBusiness.length === 0 && (
 <div className="text-center py-10 text-slate-500">
 
 No listings found matching your criteria.
 </div>
 )}
 {/* Marketplace Item Details Modal */}
 {selectedItem && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4 animate-[fadeIn_0.2s_ease]">
 
 <div className="bg-[var(--color-surface)] w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-[24px] overflow-hidden shadow-2xl flex flex-col animate-[slideUp_0.3s_ease]">
 
 {/* Modal Header */}
 <div className="flex justify-between items-center p-3 md:p-4 border-b border-[var(--color-outline)] shrink-0 sticky top-0 bg-[var(--color-surface)]/95 backdrop-blur-md z-20">
 
 <span className="font-bold text-base text-slate-800">
 Listing Details
 </span>
 <button
 onClick={() => setSelectedItem(null)}
 className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors cursor-pointer"
 >
 
 <X size={20} />
 </button>
 </div>
 {/* Scrollable Content */}
 <div className="flex-1 overflow-y-auto pb-24">
 
 {/* Image Carousel */}
 <div className="w-full aspect-[4/3] bg-black/5 relative group border-b border-[var(--color-outline)]">
 
 {selectedItem.images && selectedItem.images.length > 0 ? (
 <>
 
 <img
 src={selectedItem.images[currentImageIndex]}
 alt={selectedItem.title}
 className="w-full h-full object-cover"
 referrerPolicy="no-referrer"
 />
 {selectedItem.images.length > 1 && (
 <>
 
 <button
 onClick={() =>
 setCurrentImageIndex((prev) =>
 prev === 0
 ? selectedItem.images!.length - 1
 : prev - 1,
 )
 }
 className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center shadow-md hover:bg-black/60 transition-colors"
 >
 
 &larr;
 </button>
 <button
 onClick={() =>
 setCurrentImageIndex((prev) =>
 prev === selectedItem.images!.length - 1
 ? 0
 : prev + 1,
 )
 }
 className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center shadow-md hover:bg-black/60 transition-colors"
 >
 
 &rarr;
 </button>
 <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
 
 {selectedItem.images.map((_, idx) => (
 <button
 key={idx}
 onClick={() => setCurrentImageIndex(idx)}
 className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ?"bg-white shadow-[0_0_2px_rgba(0,0,0,0.5" :"bg-white/50"}`}
 />
 ))}
 </div>
 </>
 )}
 </>
 ) : (
 <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
 
 <Briefcase size={40} className="mb-2 opacity-50" />
 <span className="text-[10px] font-bold tracking-wider uppercase">
 No Image Available
 </span>
 </div>
 )}
 </div>
 {/* Core Details */}
 <div className="p-4 md:p-6 bg-[var(--color-surface)] border-b border-[var(--color-outline)]">
 
 <h3 className="font-bold text-2xl text-slate-800 mb-1 leading-tight">
 {selectedItem.title}
 </h3>
 <div className="font-bold text-xl text-[var(--color-primary)] mb-3">
 {selectedItem.price}
 </div>
 <div className="flex gap-2 text-[13px] text-slate-500 font-medium">
 
 <span>Chaliyam</span> <span>•</span>
 <span>Listed {selectedItem.date}</span>
 </div>
 </div>
 {/* Description */}
 <div className="p-4 md:p-6 bg-[var(--color-surface)] border-b border-[var(--color-outline)]">
 
 <h4 className="font-bold text-slate-800 text-sm mb-3">
 Description
 </h4>
 <p className="text-[14px] text-slate-500 whitespace-pre-wrap leading-relaxed">
 {selectedItem.desc}
 </p>
 </div>
 {/* Location Map if available */}
 {selectedItem.lat && selectedItem.lng && (
 <div className="p-4 md:p-6 bg-[var(--color-surface)] border-b border-[var(--color-outline)]">
 
 <h4 className="font-bold text-slate-800 text-sm mb-3">
 Location
 </h4>
 <div className="w-full rounded-2xl overflow-hidden h-[150px] relative border border-[var(--color-outline)] mb-3 shadow-[0_2px_8px_rgba(0,0,0,0.08">
 
 <iframe
 width="100%"
 height="100%"
 style={{ border: 0 }}
 loading="lazy"
 allowFullScreen
 referrerPolicy="no-referrer-when-downgrade"
 src={`https://maps.google.com/maps?q=${selectedItem.lat},${selectedItem.lng}&z=15&output=embed`}
 ></iframe>
 </div>
 <button
 onClick={() =>
 window.open(
 `https://www.google.com/maps/search/?api=1&query=${selectedItem.lat},${selectedItem.lng}`,
"_blank",
 )
 }
 className="text-[13px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5"
 >
 
 <MapPin size={16} /> Open in Google Maps
 </button>
 </div>
 )}
 {/* Seller Info */}
 {(selectedItem.contactName || selectedItem.contactDesc) && (
 <div className="p-4 md:p-6 bg-[var(--color-surface)]">
 
 <div className="bg-slate-50 border border-[var(--color-outline)] rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
 
 <div className="w-12 h-12 rounded-full bg-[var(--color-primary-container)] text-[var(--color-primary)] flex items-center justify-center font-bold text-xl shrink-0 border border-[var(--color-primary)]/10">
 
 {selectedItem.contactName
 ? selectedItem.contactName.charAt(0):"S"}
 </div>
 <div>
 
 <h4 className="font-bold text-[10px] text-slate-500 uppercase tracking-wider mb-1">
 Seller Information
 </h4>
 {selectedItem.contactName && (
 <p className="font-bold text-base text-slate-800 leading-tight">
 {selectedItem.contactName}
 </p>
 )}
 {selectedItem.contactDesc && (
 <p className="text-[13px] text-slate-500 leading-snug mt-1">
 {selectedItem.contactDesc}
 </p>
 )}
 </div>
 </div>
 </div>
 )}
 </div>
 {/* Sticky Action Footer */}
 <div className="fixed md:absolute bottom-0 left-0 right-0 p-4 pb-6 md:pb-4 border-t border-[var(--color-outline)] bg-[var(--color-surface)] flex justify-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05">
 
 <button
 onClick={() =>
 handleWhatsApp(selectedItem.contact, selectedItem.title)
 }
 className="w-full max-w-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fbc5b] text-white font-bold py-3.5 rounded-full transition-transform active:scale-95 shadow-md border border-transparent"
 >
 
 <MessageCircle size={20} /> Send WhatsApp Message
 </button>
 </div>
 </div>
 </div>
 )}
 {/* Add Listing Modal */}
 {isAddModalOpen && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
 
 <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] w-full max-w-md rounded-[24px] overflow-hidden shadow-2xl animate-scale-up-center max-h-[90vh] flex flex-col">
 
 <div className="flex justify-between items-center p-4 border-b border-[var(--color-outline)] shrink-0 bg-[var(--color-surface)]">
 
 <h3 className="font-bold text-lg text-slate-800">
 Add New Listing
 </h3>
 <button
 onClick={() => setIsAddModalOpen(false)}
 className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors"
 >
 
 <X size={18} />
 </button>
 </div>
 <form
 onSubmit={handleAddSubmit}
 className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar"
 >
 
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 Listing Type
 </label>
 <select
 name="type"
 required
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] appearance-none shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 >
 
 <option value="sell">For Sale</option>
 <option value="buy">Wanted</option>
 <option value="rent">Rent</option>
 <option value="service">Service</option>
 </select>
 </div>
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 Title
 </label>
 <input
 name="title"
 required
 type="text"
 placeholder="E.g., Used Bicycle for Sale"
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 />
 </div>
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 Description
 </label>
 <textarea
 name="desc"
 required
 rows={3}
 placeholder="Provide details about your listing..."
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] resize-none placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 ></textarea>
 </div>
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 Price
 </label>
 <input
 name="price"
 required
 type="text"
 placeholder="E.g., ₹ 5,000 or Contact for Price"
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 />
 </div>
 <div className="border-t border-[var(--color-outline)] pt-4 mt-2">
 
 <h4 className="text-sm font-bold text-[var(--color-primary)] mb-3 uppercase tracking-wide">
 Contact Information
 </h4>
 <div className="space-y-4">
 
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 Contact Name
 </label>
 <input
 name="contactName"
 required
 type="text"
 placeholder="Your Name"
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 />
 </div>
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 About You (Optional)]
 </label>
 <input
 name="contactDesc"
 type="text"
 placeholder="E.g., Local fisherman, Property owner"
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 />
 </div>
 <div>
 
 <label className="block text-sm font-semibold text-slate-800 mb-1.5">
 WhatsApp Contact Number
 </label>
 <input
 name="contactPhone"
 required
 type="tel"
 placeholder="+91 98765 43210"
 className="w-full px-4 py-3 rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-slate-800 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] placeholder:text-slate-500 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-shadow"
 />
 </div>
 </div>
 </div>
 <div className="border-t border-[var(--color-outline)] pt-4 mt-2">
 
 <div className="flex justify-between items-center mb-2">
 
 <label className="block text-sm font-semibold text-slate-800">
 Images (Max 3)]
 </label>
 <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary-container)] px-2 py-0.5 rounded-full">
 {uploadedImages.length}/3
 </span>
 </div>
 {uploadedImages.length < 3 && (
 <div
 onClick={() => fileInputRef.current?.click()}
 className="w-full border-2 border-dashed border-[var(--color-outline)] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-[var(--color-primary)] transition-all mb-3"
 >
 
 <Upload
 size={24}
 className="text-[var(--color-primary)] mb-2"
 />
 <span className="text-sm font-medium text-slate-500">
 Click to upload images
 </span>
 <input
 type="file"
 accept="image/*"
 multiple
 className="hidden"
 ref={fileInputRef}
 onChange={handleImageUpload}
 />
 </div>
 )}
 {uploadedImages.length > 0 && (
 <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
 
 {uploadedImages.map((img, idx) => (
 <div
 key={idx}
 className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-[var(--color-outline)] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
 >
 
 <img
 src={img}
 alt={`Upload ${idx + 1}`}
 className="w-full h-full object-cover"
 />
 <button
 type="button"
 onClick={() => removeImage(idx)}
 className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white rounded-full p-1 hover:bg-[var(--color-danger)] transition-colors"
 >
 
 <X size={12} />
 </button>
 </div>
 ))}
 </div>
 )}
 </div>
 <button
 type="submit"
 className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-on-primary)] py-3.5 rounded-full font-bold transition-all shadow-md mt-4 shrink-0  active:scale-95 transition-all duration-150"
 >
 
 Submit Listing
 </button>
 </form>
 </div>
 </div>
 )}
 </div></>);
}