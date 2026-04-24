import fs from 'fs';

let marketPath = './src/components/MarketplaceSection.tsx';
let marketContent = fs.readFileSync(marketPath, 'utf8');

marketContent = marketContent.replace(
  /w-full aspect-square bg-white p-4 rounded-t-\[16px\] relative border-b border-\[var\(--color-outline\)\]/g,
  'w-full aspect-square bg-[var(--color-surface-variant)] relative border-b border-[var(--color-outline)] overflow-hidden'
);
marketContent = marketContent.replace(
  /className="w-full h-full object-contain group-hover:scale-105/g,
  'className="w-full h-full object-cover group-hover:scale-105'
);
fs.writeFileSync(marketPath, marketContent, 'utf8');

let storePath = './src/components/CalicutStore.tsx';
let storeContent = fs.readFileSync(storePath, 'utf8');
storeContent = storeContent.replace(
  /relative aspect-square bg-white p-4 rounded-t-lg md:rounded-t-xl overflow-hidden border-b border-\[var\(--color-outline\)\]/g,
  'relative aspect-square bg-[var(--color-surface-variant)] overflow-hidden'
);
storeContent = storeContent.replace(
  /className="w-full h-full object-contain mix-blend-multiply/g,
  'className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
);
fs.writeFileSync(storePath, storeContent, 'utf8');
console.log("Reverted images to object-cover with no padding");
