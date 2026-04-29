const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /className="xl:hidden fixed inset-0 top-\[70px\] bg-black\/60 backdrop-blur-sm z-30 transition-opacity duration-300"/,
  'className="xl:hidden fixed inset-0 top-[64px] md:top-[76px] bg-slate-900/40 backdrop-blur-md z-30 transition-opacity duration-300"'
);

code = code.replace(
  /className={`lg:hidden fixed right-0 top-\[64px\] md:top-\[76px\] bottom-0 w-\[85vw\] sm:w-\[320px\] bg-white border-l border-\[var\(--color-outline\)\] shadow-\[-10px_0_40px_rgba\(0,0,0,0\.1 ,0,0,0\.5 z-40 flex flex-col p-4 transition-transform duration-300 ease-in-out pb-20 overflow-y-auto \${isMobileMenuOpen \?"translate-x-0" :"translate-x-full"}`}/,
  'className={`lg:hidden fixed right-0 top-[64px] md:top-[76px] bottom-0 w-[85vw] sm:w-[320px] bg-white/85 supports-[backdrop-filter]:bg-white/60 backdrop-blur-2xl border-l border-white/40 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] z-40 flex flex-col p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pb-20 overflow-y-auto ${isMobileMenuOpen ?"translate-x-0" :"translate-x-full"}`}'
);

code = code.replace(
  /<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-\[var\(--color-surface\)\] border-t border-\[var\(--color-outline\)\]\/30 z-40 pb-safe-bottom">/,
  '<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/85 supports-[backdrop-filter]:bg-white/65 backdrop-blur-2xl border-t border-slate-200/50 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-40 pb-safe-bottom">'
);

// Advanced glassmorphism on the top header part too for consistency:
code = code.replace(
  /className={`fixed top-\[60px\] md:top-\[70px\] left-0 right-0 z-50 transition-all duration-300 \${[\s\S]*?} border-b border-\[var\(--color-outline\)\] bg-\[var\(--color-surface\)\]`}/,
  'className={`fixed top-[60px] md:top-[70px] left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-sm bg-white/85 supports-[backdrop-filter]:bg-white/65 backdrop-blur-xl border-b border-slate-200/50" : "bg-white border-b border-[var(--color-outline)]"} `}'
);

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Header updated successfully");
