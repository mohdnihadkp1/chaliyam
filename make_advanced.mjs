import fs from 'fs';

const files = [
  'src/components/DirectorySection.tsx',
  'src/components/MarketplaceSection.tsx',
  'src/components/NewsSection.tsx',
  'src/components/SpotsSection.tsx',
  'src/components/PeopleSection.tsx',
];

const advancedCards = [
  {
    regex: /className="flex flex-col cursor-pointer group bg-\[var\(--color-surface\)\] border border-\[var\(--color-outline\)\] rounded-\[16px\] overflow-hidden [^"]*"/g,
    replace: 'className="flex flex-col cursor-pointer group bg-white border border-slate-100 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-in-out"'
  },
  {
    regex: /className="bg-\[var\(--color-surface\)\] rounded-2xl overflow-hidden shadow-\[0_2px_10px_rgba\(0,0,0,0.02\)\] border border-\[var\(--color-outline\)\] [^"]*"/g,
    replace: 'className="bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out group cursor-pointer"'
  },
  {
     regex: /bg-\[var\(--color-surface\)\] rounded-2xl overflow-hidden shadow-[^ ]* border border-\[var\(--color-outline\)\]/g,
     replace: 'bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100'
  }
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  for (const rule of advancedCards) {
    content = content.replace(rule.regex, rule.replace);
  }

  // General text upgrades
  content = content.replace(/text-\[var\(--color-on-surface-variant\)\]/g, 'text-slate-500');
  content = content.replace(/text-\[var\(--color-on-surface\)\]/g, 'text-slate-800');
  
  // Specific backgrounds
  content = content.replace(/bg-\[var\(--color-surface-variant\)\]/g, 'bg-slate-50');

  fs.writeFileSync(file, content, 'utf8');
}
