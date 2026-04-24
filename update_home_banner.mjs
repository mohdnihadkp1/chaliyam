import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const advancedCalicutStoreBanner = `
      {/* Advanced Calicut Store Dedicated Slide (Long Slide) */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-10 relative z-30 mb-8 animate-fade-in-up">
        <div className="group relative w-full flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-outline)] transition-all duration-500 hover:shadow-indigo-500/20">
          
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-56 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80" 
              alt="Calicut Store" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-900/40" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest rounded-full shadow-sm">
              Official Marketplace
            </div>
          </div>

          {/* Content Section */}
          <div className="relative w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-slate-900 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,1)_0%,transparent_50%)]" />
            
            <div className="relative z-10 flex flex-col items-start h-full justify-center">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[2px] bg-indigo-500"></div>
                <span className="text-indigo-400 font-bold text-xs tracking-widest uppercase">Premium Local Hub</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                Calicut <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Store</span>
              </h2>
              
              <p className="text-slate-300 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-md">
                Your one-stop destination for the freshest produce, finest local crafts, and premium groceries. 
                Experience the authentic taste and culture of Chaliyam with our hyper-local, fast delivery service bringing the market to your doorstep.
              </p>
              
              <button 
                onClick={() => navigate('/store')}
                className="bg-white hover:bg-indigo-50 text-slate-900 font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl hover:shadow-indigo-500/30"
              >
                Explore collection
                <div className="bg-indigo-100 p-1.5 rounded-full text-indigo-600">
                  <Star size={16} fill="currentColor" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
`;

// Insert the advanced banner before the promo Carousel
// We can find where the promo carousel is located
content = content.replace(
  /\{\/\* Promo Carousel \(Top Slot\) \*\/\}/,
  advancedCalicutStoreBanner + "\n      {/* Promo Carousel (Top Slot) */}"
);

// We need to also make sure the negative margin of the carousel is adjusted so it doesn't overlap weirdly
content = content.replace(
  /<div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-6 relative z-20 mb-6">/,
  '<div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 mb-6">'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
