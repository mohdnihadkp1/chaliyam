const fs = require('fs');

let code = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

// Add Keyboard short plugin state (and highlight component)
const highlightComponent = `
// Advanced Highlight Component
const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  
  const parts = text.split(new RegExp(\`(\${query})\`, 'gi'));
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-indigo-100 text-indigo-900 border-b-2 border-indigo-300 font-semibold px-0.5 rounded-sm transition-all duration-300">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};
`;

code = code.replace(
  /export default function NewsSection\(\) \{/,
  highlightComponent + '\nexport default function NewsSection() {'
);

const useEffectImportReg = /import React, \{ useState \} from "react";/;
if (code.match(useEffectImportReg)) {
    code = code.replace(useEffectImportReg, 'import React, { useState, useEffect, useRef } from "react";');
} else {
    code = code.replace(/import \{ useState \} from "react";/, 'import { useState, useEffect, useRef } from "react";');
}

// Hook for keyboard shortcut.
const hooks = `  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);`;
code = code.replace(/const \[searchQuery, setSearchQuery\] = useState\(""\);/, hooks);

// Advanced Search input
const oldSearchBlock = `<input
  type="text"
  placeholder="Search news, events, announcements..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full pl-9 md:pl-10 pr-10 md:pr-11 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-slate-50 backdrop-blur-md text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] placeholder:text-slate-500 shadow-inner"
  />`;

const newSearchBlock = `<input
  ref={searchInputRef}
  type="text"
  placeholder="Search news, events, announcements..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full pl-9 md:pl-10 pr-24 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-slate-50 supports-[backdrop-filter]:bg-white/60 backdrop-blur-3xl text-xs md:text-sm font-sans text-slate-800 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500 shadow-inner"
  />
  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none opacity-0 md:opacity-100 transition-opacity">
    {!searchQuery && (
      <>
        <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 border border-slate-300 rounded text-[10px] font-medium text-slate-400 bg-white shadow-[0_2px_0_rgba(0,0,0,0.04)]">⌘K</kbd>
      </>
    )}
  </div>`;
code = code.replace(oldSearchBlock, newSearchBlock);

// Replace {news.title}
code = code.replace(
  />\{\s*news\.title\s*\}/g, 
  '><HighlightText text={news.title} query={searchQuery} />'
);
// Replace {news.desc}
code = code.replace(
  />\{\s*news\.desc\s*\}/g, 
  '><HighlightText text={news.desc} query={searchQuery} />'
);

fs.writeFileSync('src/components/NewsSection.tsx', code);
console.log("News section search optimized!");
