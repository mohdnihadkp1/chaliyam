import fs from 'fs';
import path from 'path';

function fixFile(file, oldStr, newStr) {
  const filePath = path.join('./src/components', file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed ${file}`);
}

// BusSection.tsx
fixFile('BusSection.tsx', 
  "// Basic time sorting Assuming HH:MM 24h format const timeA = a.time.split(':').map(Number);",
  "/* Basic time sorting Assuming HH:MM 24h format */ const timeA = a.time.split(':').map(Number);"
);

// CalicutStore.tsx
fixFile('CalicutStore.tsx',
  "// Debounce search query useEffect",
  "/* Debounce search query */ useEffect"
);

// DeliveryModal.tsx
fixFile('DeliveryModal.tsx',
  "// Admin whatsapp reference window.open(",
  "/* Admin whatsapp reference */ window.open("
);

// FeedbackModal.tsx
fixFile('FeedbackModal.tsx',
  "// Admin whatsapp reference window.open(",
  "/* Admin whatsapp reference */ window.open("
);

// Header.tsx
fixFile('Header.tsx',
  "// Close dropdown on click outside useEffect(",
  "/* Close dropdown on click outside */ useEffect("
);
fixFile('Header.tsx',
  "// Close menus on route change useEffect(",
  "/* Close menus on route change */ useEffect("
);
fixFile('Header.tsx',
  "// <div className=\"absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full border border-white\"></div>",
  "/* <div className=\"absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full border border-white\"></div> */"
);

// Home.tsx
fixFile('Home.tsx',
  "// Assuming we have a global search route or directory filtering navigate",
  "/* Assuming we have a global search route or directory filtering */ navigate"
);

// MapSection.tsx
fixFile('MapSection.tsx',
  "// fallback }); return tile; } }); } export default",
  "/* fallback */ }); return tile; } }); } export default"
);
fixFile('MapSection.tsx',
  "// Adding some dummy transport and emergency markers to demonstrate the click-to-activate feature { lat: 11.1680",
  "/* Adding some dummy transport and emergency markers to demonstrate the click-to-activate feature */ { lat: 11.1680"
);
fixFile('MapSection.tsx',
  "// SouthWest [11.2000, 75.8600] // NorthEast",
  "/* SouthWest */ [11.2000, 75.8600] /* NorthEast */"
);
fixFile('MapSection.tsx',
  "// Highlight Chaliyam prominently L.circle(",
  "/* Highlight Chaliyam prominently */ L.circle("
);
fixFile('MapSection.tsx',
  "// Keep map instance alive, just clear layers if needed };",
  "/* Keep map instance alive, just clear layers if needed */ };"
);

// MarketplaceSection.tsx
fixFile('MarketplaceSection.tsx',
  "// Reset image index when opening a new item useEffect(",
  "/* Reset image index when opening a new item */ useEffect("
);

