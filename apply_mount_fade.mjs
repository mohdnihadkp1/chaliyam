import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace page-level fadeUp with fade-in
  content = content.replace(/animate-\[fadeUp_0\.4s_ease\]/g, 'animate-fade-in');

  // Also replace fadeUp_0.5s_ease or others if they are used on main wrapper
  content = content.replace(/animate-\[fadeUp_0\.5s_ease\]/g, 'animate-fade-in');

  // Add animate-fade-in to Home.tsx main wrap
  if (file === 'Home.tsx') {
    content = content.replace(/className="w-full pb-24 md:pb-8 min-h-screen"/g, 'className="w-full pb-24 md:pb-8 min-h-screen animate-fade-in"');
  }

  // Also add animate-fade-in to MapSection, Emergency, Bus, CalicutStore if they don't have it
  const componentsToFade = ['MapSection.tsx', 'EmergencySection.tsx', 'BusSection.tsx', 'CalicutStore.tsx'];
  if (componentsToFade.includes(file)) {
    // Attempt to inject animate-fade-in on the first <div className="py-X ...
    // E.g. <div className="py-4 ...">
    content = content.replace(/(<div className="py-[^"]*)(?<!animate-fade-in)(?=">)/g, (match) => {
       if (match.includes('max-w-')) {
          return match + ' animate-fade-in';
       }
       return match;
    });
  }

  // Let's also check Modals & Bottom Sheets. We changed them in `apply_animations.mjs` to `animate-[slideUpBottom_0.4s_cubic-bezier...`
  // We can change that to use our clean CSS class `animate-slide-up-bottom` (bottom sheets / modals usually anchored at bottom on mobile, maybe center on desktop?)
  // The user actually said: "smoothly slide up from the bottom or scale up slightly from the center, rather than appearing abruptly."
  const modalScaleClass = 'animate-scale-up-center'; // Usually looks better for central modals. Let's use scaleUpCenter.
  content = content.replace(/animate-\[slideUpBottom_0\.4s_cubic-bezier\(0\.16,1,0\.3,1\)\]/g, modalScaleClass);

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fade mount applied in ${file}`);
  }
}
