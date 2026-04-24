import fs from 'fs';
import path from 'path';

const files = [
  'src/components/MapSection.tsx',
  'src/components/MarketplaceSection.tsx',
  'src/components/NewsSection.tsx',
  'src/components/PeopleSection.tsx',
  'src/components/OrderPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace dark backdrop
  content = content.replace(/bg-slate-950\/80 backdrop-blur-md/g, 'bg-slate-950/60 backdrop-blur-md');

  // Modal containers: rounded-2xl to sm:rounded-3xl rounded-t-3xl
  content = content.replace(/w-full max-w-md rounded-2xl overflow-hidden/g, 'w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden');

  // Update textareas and inputs to have floating/active states - or just better styles
  // We will just replace standard bg-[var(--color-surface-variant)] border border-[var(--color-outline)] with something cleaner and brighter
  content = content.replace(/bg-\[var\(--color-surface-variant\)\] text-\[var\(--color-on-surface\)\] outline-none focus:border-\[var\(--color-primary\)\] focus:bg-white\/10 placeholder:text-slate-500 shadow-inner/g, 'bg-slate-50 border-slate-200 text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all');

  // Replace text-[var(--color-on-surface-variant)] for labels
  content = content.replace(/text-\[var\(--color-on-surface-variant\)\] mb-1"/g, 'text-slate-700 font-semibold ml-1 mb-1"');

  // Replace whatsapp green button
  content = content.replace(/bg-\[\#25D366\]\/90 hover:bg-\[\#25D366\] border border-\[\#25D366\]\/50 text-white/g, 'bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
