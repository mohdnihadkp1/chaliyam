import { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronRight, Star, ArrowDownUp, X } from 'lucide-react';

const PRODUCTS = [
  { "id": "1", "name": "Premium Leather Wallet", "price": "₹999", "imageUrl": "https://images.unsplash.com/photo-1627123424574-18bd03048ca3?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/1", "category": "Fashion", "desc": "Handcrafted minimalist leather wallet with multiple card slots and a premium finish." },
  { "id": "2", "name": "Wireless Noise Cancelling Headphones", "price": "₹4499", "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/2", "category": "Electronics", "desc": "Immerse yourself in music with leading noise cancellation and up to 30 hours of battery life." },
  { "id": "3", "name": "Minimalist Wall Clock", "price": "₹1299", "imageUrl": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/3", "category": "Home Decor", "desc": "A sleek, modern wall clock that adds an elegant touch to any living space or office." },
  { "id": "4", "name": "Classic Running Shoes", "price": "₹2499", "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/4", "category": "Fashion", "desc": "Lightweight, breathable, and highly comfortable running shoes designed for performance." },
  { "id": "5", "name": "Organic Premium Almonds (1kg)", "price": "₹850", "imageUrl": "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/5", "category": "Groceries", "desc": "100% natural, high-quality, and crunchy almonds packed with essential nutrients." },
  { "id": "6", "name": "Organic Face Serum", "price": "₹899", "imageUrl": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/6", "category": "Beauty", "desc": "Rejuvenate your skin with this natural, cruelty-free face serum enriched with Vitamin C." },
  { "id": "7", "name": "Smart Fitness Watch", "price": "₹2999", "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/7", "category": "Electronics", "desc": "Track your health metrics and stay connected with this advanced smart fitness watch." },
  { "id": "8", "name": "Ceramic Coffee Mug Set", "price": "₹1200", "imageUrl": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/8", "category": "Home Decor", "desc": "A set of beautiful, high-quality ceramic mugs perfect for your daily coffee or tea." },
  { "id": "9", "name": "Professional DSLR Camera", "price": "₹42000", "imageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/9", "category": "Electronics", "desc": "Capture breathtaking moments with stunning clarity using this professional-grade DSLR." },
  { "id": "10", "name": "Aromatherapy Essential Oil Diffuser", "price": "₹1299", "imageUrl": "https://images.unsplash.com/photo-1608528577891-eb05ebec2107?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/10", "category": "Home Decor", "desc": "Relax and unwind with this elegant wood-grain essential oil diffuser." },
  { "id": "11", "name": "Men's Casual Denim Jacket", "price": "₹2499", "imageUrl": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=400", "productUrl": "https://calicutstore.vercel.app/#/product/11", "category": "Fashion", "desc": "A versatile and timeless denim jacket that perfectly complements any casual outfit." }
];

const CATEGORIES = [
  'All', 
  'Electronics', 
  'Fashion', 
  'Groceries & Food', 
  'Home & Kitchen', 
  'Beauty & Personal Care', 
  'Health & Wellness', 
  'Toys & Games', 
  'Books & Stationery', 
  'Automotive', 
  'Sports & Outdoors', 
  'Baby Products', 
  'Pet Supplies', 
  'Garden & Tools', 
  'Office Supplies', 
  'Arts & Crafts', 
  'Musical Instruments', 
  'Industrial & Scientific', 
  'Jewelry & Watches', 
  'Luggage & Bags', 
  'Video Games'
];

export default function CalicutStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('none');
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortOption === 'price-asc') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      return priceA - priceB;
    }
    if (sortOption === 'price-desc') {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      return priceB - priceA;
    }
    if (sortOption === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 animate-[fadeIn_0.5s_ease]">
      {/* Marketplace Header */}
      <div className="sticky top-[60px] md:top-[70px] z-30 bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400 dark:text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search premium products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 text-gray-900 dark:text-white text-sm transition-all outline-none"
              />
            </div>
            
            <div className="relative shrink-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm border-transparent focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none cursor-pointer hidden md:block"
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
                  className="pl-8 pr-3 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-transparent border-transparent focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none cursor-pointer w-10 absolute inset-0 opacity-0"
                >
                  <option value="none">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-600 dark:text-slate-300 pointer-events-none">
                  <ArrowDownUp size={18} />
                </div>
              </div>
            </div>

            <button className="relative p-2.5 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Category Row */}
          <div className="flex gap-2 overflow-x-auto mt-3 pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[11px] md:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
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
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="px-5 py-6 md:px-6 md:py-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
            <div className="text-white">
              <h2 className="text-xl md:text-4xl font-bold mb-1.5 md:mb-2 tracking-tight">Welcome to Calicut Store</h2>
              <p className="text-indigo-100 text-[11px] md:text-base max-w-md mx-auto md:mx-0">Discover Premium Local & Global Products curated just for you. Experience seamless shopping.</p>
            </div>
            <button className="shrink-0 px-4 py-2 md:px-6 md:py-2.5 bg-white text-indigo-600 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 md:gap-2">
              Explore Offers <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-3 lg:gap-5">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white dark:bg-slate-900 rounded-lg md:rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col group animate-[slideUp_0.5s_ease]"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
            >
              <div className="relative aspect-square bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1 rounded-full text-gray-400 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  <Star size={12} className="md:w-4 md:h-4" />
                </div>
              </div>
              
              <div className="p-2 md:p-4 flex flex-col flex-1">
                <div className="text-[8px] md:text-[10px] lg:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-0.5 md:mb-1 truncate">
                  {product.category}
                </div>
                <h3 className="text-[10px] md:text-sm font-bold text-gray-900 dark:text-white leading-[1.3] md:leading-snug line-clamp-2 md:line-clamp-2 mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-1 md:pt-3 flex items-center justify-between">
                  <span className="text-xs md:text-base lg:text-lg font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {product.price}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCartCount(prev => prev + 1);
                  }}
                  className="w-full mt-1.5 md:mt-3 flex items-center justify-center gap-1 md:gap-1.5 py-1.5 md:py-2 bg-gray-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 text-gray-900 dark:text-white text-[10px] md:text-sm font-semibold rounded md:rounded-lg transition-colors border border-gray-200 dark:border-slate-700 hover:border-transparent group/btn"
                >
                  <ShoppingCart size={12} className="text-gray-500 group-hover/btn:text-white transition-colors md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No products found</h3>
            <p className="text-gray-500 dark:text-slate-400">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      {/* Product Details Popup Window */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-white/10 animate-[fadeUp_0.3s_ease] relative my-auto" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white/50 dark:bg-black/20 hover:bg-gray-200 dark:hover:bg-black/40 backdrop-blur-sm p-1.5 rounded-full z-20 shadow-sm">
              <X size={20} />
            </button>
            
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 aspect-square bg-gray-100 dark:bg-slate-800 relative">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <div className="w-full md:w-1/2 p-5 md:p-8 flex flex-col justify-center bg-white dark:bg-slate-900">
                <div className="text-xs md:text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                  {selectedProduct.category}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
                  {selectedProduct.name}
                </h3>
                <span className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mb-4 inline-block">
                  {selectedProduct.price}
                </span>
                <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      setCartCount(prev => prev + 1);
                      setSelectedProduct(null);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-indigo-500/25"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => window.open(selectedProduct.productUrl, '_blank')}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-900 dark:text-white font-semibold rounded-xl transition-colors border border-gray-200 dark:border-white/10"
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
