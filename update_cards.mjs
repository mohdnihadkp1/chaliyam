import fs from 'fs';
import path from 'path';

const files = [
  'src/components/DirectorySection.tsx',
  'src/components/MarketplaceSection.tsx',
  'src/components/NewsSection.tsx',
  'src/components/SpotsSection.tsx',
  'src/components/PeopleSection.tsx',
  'src/components/InFeedAdCard.tsx',
  'src/components/PromoBanners.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace default card styles with advanced look
  const regex = /bg-\[var\(--color-surface\)\] (rounded-[^\s]*) (md:rounded-[^\s]* )?overflow-hidden shadow-sm border border-\[var\(--color-outline\)\]/g;
  const advancedBasic = 'bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300';
  content = content.replace(regex, advancedBasic);
  
  const regex2 = /bg-\[var\(--color-surface\)\] border border-\[var\(--color-outline\)\] rounded-xl/g;
  content = content.replace(regex2, 'bg-white border border-slate-100 rounded-[1.25rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300');

  // Specifics
  content = content.replace(/bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm/g, 'bg-white border border-slate-100 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]');

  content = content.replace(/bg-\[var\(--color-surface-variant\)\] text-\[var\(--color-on-surface-variant\)\] text-[a-z]+ md:text-[a-z]+ px-3 py-1.5 rounded-lg/g, 'bg-slate-50 text-slate-500 font-medium text-xs md:text-sm px-3 py-1.5 rounded-xl border border-slate-100');

  // Improve image hovers
  content = content.replace(/group-hover:scale-105 transition-transform duration-500/g, 'group-hover:scale-110 transition-transform duration-700 ease-out');
  content = content.replace(/group-hover:scale-105 transition-transform duration-300/g, 'group-hover:scale-110 transition-transform duration-700 ease-out');

  // Replace standard shadows
  content = content.replace(/shadow-sm/g, 'shadow-[0_2px_10px_rgba(0,0,0,0.02)]');

  content = content.replace(/rounded-3xl overflow-hidden group cursor-pointer shadow-sm border border-\[var\(--color-outline\)\]/g, 'rounded-3xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Cards upgraded');
