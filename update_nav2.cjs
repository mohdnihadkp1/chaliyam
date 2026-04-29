const fs = require('fs');

let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white\/70 supports-\[backdrop-filter\]:bg-white\/50 backdrop-blur-3xl border-t border-slate-200\/50 shadow-\[0_-8px_30px_rgba\(0,0,0,0\.06\)\] z-40 pb-safe-bottom">/,
  '<nav className="lg:hidden fixed bottom-0 md:bottom-8 md:bottom-safe-bottom left-0 right-0 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-max md:rounded-[2rem] bg-white/80 supports-[backdrop-filter]:bg-white/50 backdrop-blur-3xl border-t md:border border-slate-200/50 md:border-white/40 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] md:shadow-[0_15px_40px_rgba(0,0,0,0.15)] z-40 pb-safe-bottom md:pb-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">'
);

code = code.replace(
  /<div className="flex justify-evenly items-center h-\[68px\] px-2 relative">/,
  '<div className="flex justify-evenly items-center h-[68px] px-2 md:px-4 md:gap-4 relative">'
);

// We should also adjust padding in App.tsx main body since MD screen now needs padding to show the floating nav if we removed pb-nav on MD
code = code.replace(
  /className={`w-12 h-8 flex items-center justify-center rounded-full transition-all duration-300 bg-transparent group-hover:bg-slate-100\/50`}/g,
  'className={`w-14 h-9 flex items-center justify-center rounded-full transition-all duration-300 bg-transparent group-hover:bg-slate-100/50`}'
);
code = code.replace(
  /className={`w-12 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\] \$\{isActive \? "bg-indigo-100 shadow-inner" : "bg-transparent group-hover:bg-slate-100\/50"}`}/g,
  'className={`w-14 h-9 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "bg-indigo-100 shadow-inner" : "bg-transparent group-hover:bg-slate-100/50"}`}'
);

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Nav dock updated");
