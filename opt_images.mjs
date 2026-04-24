import fs from 'fs';

function optImages(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<img\\s/g, '<img loading="lazy" decoding="async" ');
  fs.writeFileSync(filePath, content);
}

optImages('src/components/CalicutStore.tsx');
optImages('src/components/MarketplaceSection.tsx');
console.log("Images optimized");
