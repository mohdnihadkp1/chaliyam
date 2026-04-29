const fs = require('fs');

let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// 1. Add isScrolled state
code = code.replace(
  /const \[isMoreDropdownOpen, setIsMoreDropdownOpen\] = useState\(false\);/,
  'const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);\n  const [isScrolled, setIsScrolled] = useState(false);'
);

// 2. Add scroll listener useEffect
const useEffectInsert = `
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
`;
code = code.replace(
  /\/\* Close dropdown on click outside \*\//,
  useEffectInsert + '\n  /* Close dropdown on click outside */'
);

// 3. Update header root element class
code = code.replace(
  /<header className="bg-white\/85 supports-\[backdrop-filter\]:bg-white\/60 backdrop-blur-3xl px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 ease-\[cubic-bezier\(0\.16,1,0\.3,1\)\] shadow-\[0_2px_20px_rgba\(0,0,0,0\.04\)\] border-b border-slate-200\/50">/,
  '<header className={`px-4 md:px-6 sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-slate-200/50" : "bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur-md shadow-none border-b border-slate-100"}`}>'
);

// 4. Update desktop nav links with underline
const oldDesktopLink = `className={\`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline \${isActive ?"bg-\[var\(--color-primary-container\)\] text-\[var\(--color-primary\)\] shadow-sm" :"text-\[var\(--color-on-surface-variant\)\] hover:text-\[var\(--color-primary\)\] hover:bg-\[var\(--color-background\)\]"}\`}`;
const newDesktopLink = `className={\`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline group \${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-slate-50"}\`}`;
code = code.replace(oldDesktopLink, newDesktopLink);

code = code.replace(
  /<item\.icon\s+size=\{16\}\s+className=\{\s+isActive\s+\?"text-\[var\(--color-primary\)\]"\s+:"opacity-70"\s+\}\s+\/>/g,
  '<item.icon size={16} className={`transition-all duration-300 ${isActive ? "text-[var(--color-primary)] scale-110" : "opacity-70 group-hover:opacity-100 group-hover:text-[var(--color-primary)]"}`} />'
);

// adding underline
code = code.replace(
  /\{item\.label\}\{""\}\n\s*<\/Link>/g,
  '{item.label}{""}\n  <span className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-t-full bg-[var(--color-primary)] transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`} />\n  </Link>'
);


// 5. Enhance 'More' dropdown to appear on hover
code = code.replace(
  /<div className="relative" ref=\{dropdownRef\}>/,
  '<div className="relative" ref={dropdownRef} onMouseEnter={() => setIsMoreDropdownOpen(true)} onMouseLeave={() => setIsMoreDropdownOpen(false)}>'
);

// 6. Increase gap and padding in mobile side drawer
code = code.replace(
  /<div className="flex flex-col gap-2 mb-6">/,
  '<div className="flex flex-col gap-3 mb-8">'
);
code = code.replace(
  /className={\`flex items-center justify-between p-3 rounded-2xl no-underline transition-all duration-300 active:scale-95 group \$\{activeSection === item\.id \? "bg-white shadow-\[0_4px_20px_rgba\(79,70,229,0\.12\)\] border border-indigo-100\/50" : "hover:bg-white\/60 border border-transparent"}\`}/g,
  'className={`flex items-center justify-between px-4 py-3.5 rounded-2xl no-underline transition-all duration-300 active:scale-95 group ${activeSection === item.id ? "bg-white shadow-[0_4px_20px_rgba(79,70,229,0.12)] border border-indigo-100/50" : "hover:bg-white/60 border border-transparent"}`}'
);

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Header fully optimized per user request.");
