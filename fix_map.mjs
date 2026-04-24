import fs from 'fs';
let content = fs.readFileSync('src/components/MapSection.tsx', 'utf8');
content = content.replace(
  "// Initialize map with tight bounds to focus only on these areas const bounds = L.latLngBounds",
  "/* Initialize map with tight bounds to focus only on these areas */ const bounds = L.latLngBounds"
);
fs.writeFileSync('src/components/MapSection.tsx', content, 'utf8');
