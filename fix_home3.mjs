import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// 1. Add OrderModal import and setup state
content = content.replace(
  /Search,\s*CloudSun,/, 
  'Search,\n  CloudSun,\n  ShoppingBag,\n  ClipboardList,\n  Truck,'
);
// replace from lucide-react if not all there. Actually, easier:
content = content.replace(
  /} from "lucide-react";/,
  '  ShoppingBag,\n  ClipboardList,\n  Truck,\n} from "lucide-react";'
);

content = content.replace(
  /import { useNavigate } from"react-router-dom";/,
  'import { useNavigate } from "react-router-dom";\nimport OrderModal from "./OrderModal";'
);

content = content.replace(
  /export default function Home\(\) {/,
  'export default function Home() {\n  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);'
);

// 2. Remove Carousel logic
content = content.replace(/const \[currentAdIndex, setCurrentAdIndex\][\s\S]*?\}, \[\]\);\n/, '');
content = content.replace(/const promoAds = \[[\s\S]*?\];\n/, '');

// 3. New Banner & Delivery Guide JSX
const newBannerJSX = `
      {/* Calicut Store Banner */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-6 relative z-20 mb-6">
        <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg border border-[var(--color-outline)] animate-fade-in group">
          <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80" alt="Calicut Store" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-center p-6 md:p-8">
            <span className="text-emerald-400 font-bold text-xs tracking-wider uppercase mb-1 drop-shadow-sm">Fast & Fresh</span>
            <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-1 tracking-tight drop-shadow-md">Calicut Store</h2>
            <p className="text-slate-200 text-sm md:text-base font-medium mb-4 max-w-[200px] md:max-w-xs drop-shadow">Premium Local Products Delivered to Your Door</p>
            <button 
              onClick={() => navigate('/marketplace')}
              className="bg-[var(--color-primary)] hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-full w-max shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Home Delivery Guide Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex-1">
              <h3 className="font-yatra text-xl text-slate-800 mb-2">How to Order</h3>
              <p className="text-sm text-slate-500 font-medium mb-5">Same day delivery in Chaliyam & nearby areas.</p>
              
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm z-10">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 text-center">Browse</div>
                </div>
                <div className="flex-1 h-[2px] bg-slate-200 mt-5 relative">
                  <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-2 rounded-full hidden sm:block bg-slate-200"></div>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm z-10 relative">
                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                    <ClipboardList size={18} />
                  </div>
                  <div className="text-[10px] font-bold text-indigo-600 text-center">Form</div>
                </div>
                <div className="flex-1 h-[2px] bg-slate-200 mt-5"></div>
                
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm z-10">
                    <Truck size={18} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 text-center">Delivery</div>
                </div>
              </div>
            </div>

            <div className="md:w-auto w-full flex items-center">
              <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full md:w-auto bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-800/20 transition-all active:scale-95"
              >
                Order Now
              </button>
            </div>
            
          </div>
        </div>
      </div>
`;

content = content.replace(/{\/\* Promo Carousel \(Top Slot\) \*\/}[\s\S]*?{\/\* Grid Menu \(Primary\)\] \*\/}/, newBannerJSX + '\n      {/* Grid Menu (Primary)] */}');

content = content.replace(/<\/div>\n\s*\);\n\s*}\n$/, '      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />\n    </div>\n  );\n}\n');

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
