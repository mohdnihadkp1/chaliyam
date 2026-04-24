import InFeedAdCard from "./InFeedAdCard";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
 Search,
 ShoppingCart,
 ChevronRight,
 Star,
 ArrowDownUp,
 X,
 Plus,
 Minus,
 Trash2,
 Tag,
} from "lucide-react";
const PRODUCTS = [
 {
 id:"1",
 name:"Premium Leather Wallet",
 price:"₹999",
 imageUrl:
"https://images.unsplash.com/photo-1627123424574-18bd03048ca3?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/1",
 category:"Fashion",
 desc:"Handcrafted minimalist leather wallet with multiple card slots and a premium finish.",
 },
 {
 id:"2",
 name:"Wireless Noise Cancelling Headphones",
 price:"₹4499",
 imageUrl:
"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/2",
 category:"Electronics",
 desc:"Immerse yourself in music with leading noise cancellation and up to 30 hours of battery life.",
 },
 {
 id:"3",
 name:"Minimalist Wall Clock",
 price:"₹1299",
 imageUrl:
"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/3",
 category:"Home Decor",
 desc:"A sleek, modern wall clock that adds an elegant touch to any living space or office.",
 },
 {
 id:"4",
 name:"Classic Running Shoes",
 price:"₹2499",
 imageUrl:
"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/4",
 category:"Fashion",
 desc:"Lightweight, breathable, and highly comfortable running shoes designed for performance.",
 },
 {
 id:"5",
 name:"Organic Premium Almonds (1kg)",
 price:"₹850",
 imageUrl:
"https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/5",
 category:"Groceries",
 desc:"100% natural, high-quality, and crunchy almonds packed with essential nutrients.",
 },
 {
 id:"6",
 name:"Organic Face Serum",
 price:"₹899",
 imageUrl:
"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/6",
 category:"Beauty",
 desc:"Rejuvenate your skin with this natural, cruelty-free face serum enriched with Vitamin C.",
 },
 {
 id:"7",
 name:"Smart Fitness Watch",
 price:"₹2999",
 imageUrl:
"https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/7",
 category:"Electronics",
 desc:"Track your health metrics and stay connected with this advanced smart fitness watch.",
 },
 {
 id:"8",
 name:"Ceramic Coffee Mug Set",
 price:"₹1200",
 imageUrl:
"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/8",
 category:"Home Decor",
 desc:"A set of beautiful, high-quality ceramic mugs perfect for your daily coffee or tea.",
 },
 {
 id:"9",
 name:"Professional DSLR Camera",
 price:"₹42000",
 imageUrl:
"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/9",
 category:"Electronics",
 desc:"Capture breathtaking moments with stunning clarity using this professional-grade DSLR.",
 },
 {
 id:"10",
 name:"Aromatherapy Essential Oil Diffuser",
 price:"₹1299",
 imageUrl:
"https://images.unsplash.com/photo-1608528577891-eb05ebec2107?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/10",
 category:"Home Decor",
 desc:"Relax and unwind with this elegant wood-grain essential oil diffuser.",
 },
 {
 id:"11",
 name:"Men's Casual Denim Jacket",
 price:"₹2499",
 imageUrl:
"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400",
 productUrl:"https://calicutstore.vercel.app/#/product/11",
 category:"Fashion",
 desc:"A versatile and timeless denim jacket that perfectly complements any casual outfit.",
 },
];
const CATEGORIES = [
"All",
"Electronics",
"Fashion",
"Groceries & Food",
"Home & Kitchen",
"Beauty & Personal Care",
"Health & Wellness",
"Toys & Games",
"Books & Stationery",
"Automotive",
"Sports & Outdoors",
"Baby Products",
"Pet Supplies",
"Garden & Tools",
"Office Supplies",
"Arts & Crafts",
"Musical Instruments",
"Industrial & Scientific",
"Jewelry & Watches",
"Luggage & Bags",
"Video Games",
];
export default function CalicutStore() {
  const navigate = useNavigate();
  const { cartCount, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("none");
  const [selectedProduct, setSelectedProduct] = useState<
  (typeof PRODUCTS)[0] | null
  >(null);

  /* Debounce search query */ useEffect(() => {
 const timer = setTimeout(() => {
 setDebouncedSearch(searchQuery);
 }, 300);
 return () => clearTimeout(timer);
 }, [searchQuery]);
 const filteredProducts = PRODUCTS.filter((p) => {
 const matchesSearch = p.name
 .toLowerCase()
 .includes(debouncedSearch.toLowerCase());
 const matchesCategory =
 selectedCategory ==="All" || p.category === selectedCategory;
 return matchesSearch && matchesCategory;
 }).sort((a, b) => {
 if (sortOption ==="price-asc") {
 const priceA = parseInt(a.price.replace(/[^0-9]/g,""));
 const priceB = parseInt(b.price.replace(/[^0-9]/g,""));
 return priceA - priceB;
 }
 if (sortOption ==="price-desc") {
 const priceA = parseInt(a.price.replace(/[^0-9]/g,""));
 const priceB = parseInt(b.price.replace(/[^0-9]/g,""));
 return priceB - priceA;
 }
 if (sortOption ==="name-asc") {
 return a.name.localeCompare(b.name);
 }
 return 0;
 });
 return (
 <div className="min-h-screen bg-[var(--color-background)] animate-[fadeIn_0.5s_ease]">
 
 {/* Marketplace Header */}
 <div className="sticky top-[60px] md:top-[70px] z-30 bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-xl border-b border-[var(--color-outline)] shadow-sm">
 
 <div className="max-w-7xl mx-auto px-4 py-3">
 
 <div className="flex items-center gap-4">
 
 <div className="flex-1 relative">
 
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 
 <Search
 size={18}
 className="text-[var(--color-on-surface-variant)]"
 />
 </div>
 <input
 type="text"
 placeholder="Search premium products..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-surface-variant)] border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-[var(--color-on-surface)] text-sm transition-all outline-none"
 />
 </div>
 <div className="relative shrink-0">
 
 <select
 value={sortOption}
 onChange={(e) => setSortOption(e.target.value)}
 className="appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] text-sm border-transparent focus:ring-2 focus:ring-indigo-200 outline-none cursor-pointer hidden md:block"
 >
 
 <option value="none">Sort By</option>
 <option value="price-asc">Price: Low to High</option>
 <option value="price-desc">Price: High to Low</option>
 <option value="name-asc">Name: A to Z</option>
 </select>
 <div className="md:hidden">
 
 <select
 value={sortOption}
 onChange={(e) => setSortOption(e.target.value)}
 className="pl-8 pr-3 py-2.5 rounded-xl bg-[var(--color-surface-variant)] text-transparent border-transparent focus:ring-2 focus:ring-indigo-200 outline-none cursor-pointer w-10 absolute inset-0 opacity-0"
 >
 
 <option value="none">Sort By</option>
 <option value="price-asc">Price: Low to High</option>
 <option value="price-desc">Price: High to Low</option>
 <option value="name-asc">Name: A to Z</option>
 </select>
 <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-surface-variant)] rounded-xl text-[var(--color-on-surface-variant)] pointer-events-none">
 
 <ArrowDownUp size={18} />
 </div>
 </div>
 </div>
 <button 
 onClick={() => navigate('/cart')}
 className="relative p-2.5 flex items-center justify-center text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)] rounded-xl transition-colors active:scale-95 transition-all duration-150">
 
 <ShoppingCart size={22} />
 {cartCount > 0 && (
 <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
 
 {cartCount}
 </span>
 )}
 </button>
 </div>
 {/* Category Row */}
 <div className="flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
 
 {CATEGORIES.map((cat) => (
 <button
 key={cat}
 onClick={() => setSelectedCategory(cat)}
 className={`px-4 py-1.5 rounded-full text-[11px] md:text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ?"bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md shadow-indigo-200" :"bg-white text-[var(--color-on-surface-variant)] border border-[var(--color-outline)] hover:bg-[var(--color-background)]"}`}
 >
 
 {cat}
 </button>
 ))}
 </div>
 </div>
 </div>
 <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 md:py-6">
 
 {/* Hero Banner */}
 <div className="mb-6 md:mb-8 rounded-xl md:rounded-2xl overflow-hidden relative bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg animate-[slideUp_0.6s_ease]">
 
 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png' opacity-10 mix-blend-overlay"></div>
 <div className="px-5 py-6 md:px-6 md:py-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
 
 <div className="text-white">
 
 <h2 className="text-xl md:text-4xl font-bold mb-1.5 md:mb-2 tracking-tight">
 Welcome to Calicut Store
 </h2>
 <p className="text-indigo-100 text-[11px] md:text-base max-w-md mx-auto md:mx-0">
 Discover Premium Local & Global Products curated just for you.
 Experience seamless shopping.
 </p>
 </div>
 <button className="shrink-0 px-4 py-2 md:px-6 md:py-2.5 bg-white text-[var(--color-primary)] text-xs md:text-sm font-semibold rounded-lg md:rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 md:gap-2 active:scale-95 transition-all duration-150">
 
 Explore Offers
 <ChevronRight
 size={16}
 className="md:w-[18px] md:h-[18px]"
 />
 </button>
 </div>
 </div>
 {/* Product Grid */}
 <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-3 lg:gap-5">
 
 {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              {index === 4 && (
                <div className="col-span-3 sm:col-span-4 lg:col-span-5 xl:col-span-6">
                  <InFeedAdCard 
                    title="Need Assistance?"
                    description="Get help from the community or explore special contacts."
                    image="https://images.unsplash.com/photo-1593113563332-ba90494fb9cc?auto=format&fit=crop&w=800&q=80"
                    cta="View Important Contacts"
                    path="/people"
                  />
                </div>
              )}
 <div onClick={() => setSelectedProduct(product)}
 className="bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col group animate-[slideUp_0.5s_ease] relative"
 style={{
 animationDelay: `${index * 0.05}s`,
 animationFillMode:"both",
 }}
 >
 
 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

 <div className="relative aspect-square bg-slate-50 overflow-hidden">
 
 <img
 src={product.imageUrl}
 alt={product.name}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
 />
 <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-md p-1.5 md:p-2 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm transition-all duration-300 z-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
 
 <Star size={14} className="md:w-4 md:h-4 fill-transparent hover:fill-rose-500 transition-colors" />
 </div>
 </div>
 <div className="p-3 md:p-5 flex flex-col flex-1 relative z-10 bg-white">
 
 <div className="text-[9px] md:text-[10px] lg:text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1 truncate">
 
 {product.category}
 </div>
 <h3 className="text-xs md:text-sm font-extrabold text-slate-800 leading-[1.4] line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
 
 {product.name}
 </h3>
 <div className="mt-auto pt-1 flex items-center justify-between">
 
 <span className="text-sm md:text-lg font-black text-emerald-600 tracking-tight">
 
 {product.price}
 </span>
 </div>
 <button
 onClick={(e) => {
   e.stopPropagation();
   addToCart(product);
 }}
 className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 md:py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 border border-slate-200 hover:border-indigo-600 hover:shadow-md hover:shadow-indigo-600/20 group/btn"
 >
 
 <ShoppingCart
 size={14}
 className="text-slate-400 group-hover/btn:text-white transition-colors"
 />
 <span className="hidden sm:inline">Add to Cart</span>
 <span className="sm:hidden">Add</span>
 </button>
 </div>
 </div>
 </React.Fragment>))}
 </div>
 {filteredProducts.length === 0 && (
 <div className="text-center py-20">
 
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-surface-variant)] mb-4">
 
 <Search
 size={24}
 className="text-[var(--color-on-surface-variant)]"
 />
 </div>
 <h3 className="text-lg font-medium text-gray-900 mb-1">
 No products found
 </h3>
 <p className="text-[var(--color-on-surface-variant)]">
 Try adjusting your search or category filter.
 </p>
 </div>
 )}
 </div>
 {/* Product Details Popup Window */}
 {selectedProduct && (
 <div
 className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto"
 onClick={() => setSelectedProduct(null)}
 >
 
 <div
 className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-outline)] animate-scale-up-center relative my-auto"
 onClick={(e) => e.stopPropagation()}
 >
 
 <button
 onClick={() => setSelectedProduct(null)}
 className="absolute top-4 right-4 text-[var(--color-on-surface-variant)] hover:text-gray-900 transition-colors bg-white/50 hover:bg-[var(--color-outline)] backdrop-blur-sm p-1.5 rounded-full z-20 shadow-sm"
 >
 
 <X size={20} />
 </button>
 <div className="flex flex-col md:flex-row h-full">
 
 <div className="w-full md:w-1/2 aspect-square bg-[var(--color-surface-variant)] relative">
 
 <img
 src={selectedProduct.imageUrl}
 alt={selectedProduct.name}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
 />
 </div>
 <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-center bg-white">
 
 <div className="text-xs md:text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
 
 {selectedProduct.category}
 </div>
 <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3">
 
 {selectedProduct.name}
 </h3>
 <span className="text-2xl md:text-3xl font-bold text-emerald-600 tracking-tight mb-4 inline-block">
 
 {selectedProduct.price}
 </span>
 <p className="text-sm md:text-base text-[var(--color-on-surface-variant)] leading-relaxed mb-6">
 
 {selectedProduct.desc}
 </p>
 <div className="mt-auto flex flex-col gap-3">
 
 <button
 onClick={() => {
 addToCart(selectedProduct!);
 setSelectedProduct(null);
 navigate('/cart');
 }}
 className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-primary)] hover:bg-indigo-700 text-[var(--color-on-primary)] font-bold rounded-xl transition-colors shadow-lg hover:shadow-indigo-500/25"
 >
 
 <ShoppingCart size={20} /> Add to Cart
 </button>
 <button
 onClick={() =>
 window.open(selectedProduct.productUrl,"_blank")
 }
 className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-background)] hover:bg-[var(--color-surface-variant)] text-gray-900 font-semibold rounded-xl transition-colors border border-[var(--color-outline)]"
 >
 
 View Full Details
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 </div>
 );
}
