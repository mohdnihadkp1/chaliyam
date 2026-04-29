const fs = require('fs');

let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const advancedImports = `import { useState, useEffect } from "react";
import { Search, Bell, Settings } from "lucide-react";`;
code = code.replace(/import { useState, useEffect } from "react";/, advancedImports);

code = code.replace(
  /<header className="bg-\[var\(--color-surface\)\] px-4 md:px-6 sticky top-0 z-50 shadow-sm transition-all duration-300 ease-in-out">/,
  '<header className="bg-white/85 supports-[backdrop-filter]:bg-white/60 backdrop-blur-3xl px-4 md:px-6 sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_2px_20px_rgba(0,0,0,0.04)] border-b border-slate-200/50">'
);

fs.writeFileSync('src/components/Header.tsx', code);
console.log("Header updated");
