import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('WelcomeDeliveryModal')) {
    content = content.replace(
        "import Footer from './components/Footer';",
        "import Footer from './components/Footer';\nimport WelcomeDeliveryModal from './components/WelcomeDeliveryModal';\nimport { X } from 'lucide-react';\nimport { useState } from 'react';"
    );
    
    content = content.replace(
        "export default function App() {",
        "export default function App() {\n  const [showBottomAd, setShowBottomAd] = useState(true);"
    );

    const bottomAdJSX = `
      {showBottomAd && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 p-2 md:p-4 bg-transparent pointer-events-none flex justify-center">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-3 md:px-5 flex items-center justify-between gap-4 max-w-sm w-full pointer-events-auto border border-slate-700/50 animate-slide-up">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-0.5">Special Offer</span>
              <span className="text-sm font-medium">Free Delivery on First Order!</span>
            </div>
            <button 
              onClick={() => setShowBottomAd(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-1.5 rounded-full transition-colors active:scale-95"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <WelcomeDeliveryModal />
`;

    content = content.replace(
        "<Footer />",
        bottomAdJSX + "\n      <Footer />"
    );
    
    fs.writeFileSync('src/App.tsx', content, 'utf8');
}
