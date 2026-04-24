import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Buttons & Interactive Elements (active:scale-95 transition-transform duration-150)
  // Look for `<button className="...` and append to the class list if not there
  // Also for bottom nav items etc.
  content = content.replace(/(<button[^>]*className=["'])([^"']*)/g, (match, p1, p2) => {
    if (!p2.includes('active:scale-95')) {
      return `${p1}${p2} active:scale-95 transition-all duration-150`;
    }
    return match;
  });

  // For Bottom Nav Items in Header (Link items)
  // Header.tsx contains <Link className="... for nav. Let's just add active:scale-95 to Links if they look like buttons
  if (file === 'Header.tsx') {
    content = content.replace(/(<Link[^>]*className=["'][^"']*)/g, (match) => {
      if (!match.includes('active:scale-95') && !match.includes('text-left')) { // exclude brand logo
        return `${match} active:scale-95`;
      }
      return match;
    });
    // Bottom nav transition
    content = content.replace(/transition-colors duration-300/g, 'transition-all duration-300 ease-in-out');
  }

  // 2. Cards
  // Marketplace Section
  if (file === 'MarketplaceSection.tsx' || file === 'DirectorySection.tsx' || file === 'SpotsSection.tsx' || file === 'NewsSection.tsx' || file === 'PeopleSection.tsx') {
    // Look for grid item wrappers (usually have relative, overflow-hidden, rounded, group, etc.)
    content = content.replace(/hover:shadow-md/g, 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out');
    content = content.replace(/hover:scale-\[1.02\]/g, 'hover:-translate-y-1 hover:shadow-lg');
    // For Directory section card
    content = content.replace(/hover:shadow-\[0_8px_30px_rgba[^'"]*/g, 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out ');
  }

  // 3. Page Mount Fade
  // The outer div of these sections typically has className="min-h-screen" usually we can just find main container wrappers e.g. <div className="...
  // Let's add animate-[fadeIn_0.5s_ease-in-out] to the first major div after return (
  // We'll safely just replace `animate-[fadeUp_0.3s_ease]` with `animate-[fadeIn_0.5s_ease-out]` if on a page, but fadeUp is usually for modals.
  
  // 4. Modals
  // Replace animate-[fadeUp_0.3s_ease] with animate-[scaleUpCenter_0.3s_ease-out] or animate-[slideUpBottom_0.4s_cubic-bezier(0.16,1,0.3,1)]
  content = content.replace(/animate-\[fadeUp_0\.3s_ease\]/g, 'animate-[slideUpBottom_0.4s_cubic-bezier(0.16,1,0.3,1)]');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Animated elements in ${file}`);
  }
}
