import fs from 'fs';

function revert(filePath) {
   let content = fs.readFileSync(filePath, 'utf8');

   // Remove React.Fragment wrapper logic if we can
   content = content.replace(/<React\.Fragment key=\{[^}]*\}>\s*\{index === \d+ && \(\s*<div[^>]*>[\s\S]*?<\/InFeedAdCard>\s*<\/div>\s*\)\}\s*/g, '');
   content = content.replace(/<React\.Fragment key=\{[^}]*\}>\s*\{isAd && \(\s*<div[^>]*>[\s\S]*?<\/InFeedAdCard>\s*<\/div>\s*\)\}\s*/g, '');

   // Revert div opening
   content = content.replace(/<div onClick/g, '<div\n                key={product?.id || spot?.name || index}\n                onClick');
   // The manual key restoration might be buggy, let's just do generic:
   content = content.replace(/<div\s+className="bg-white rounded-lg md:rounded-xl/g, '<div\n  key={product?.id || Math.random()}\n  className="bg-white rounded-lg md:rounded-xl');
   content = content.replace(/<div\n  className="bg-\[var\(--color-surface-variant\)\]/g, '<div\n  key={Math.random()}\n  className="bg-[var(--color-surface-variant)]');

   // Removing the stray Fragment closers
   content = content.replace(/<\/div><\/React\.Fragment>\)\)}<\/div>/g, '</div>\n          ))}\n        </div>');
   content = content.replace(/<\/div><\/React\.Fragment>\);\s*}\)\s*:\s*\(/g, '</div>\n          );\n        })\n      ) : (');
   content = content.replace(/<\/React\.Fragment>/g, '');

   fs.writeFileSync(filePath, content, 'utf8');
}

['src/components/CalicutStore.tsx', 'src/components/NewsSection.tsx', 'src/components/PeopleSection.tsx', 'src/components/SpotsSection.tsx', 'src/components/BusSection.tsx'].forEach(revert);

