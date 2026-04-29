import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const processClassString = (str) => {
        // Find if it looks like a layout element
        const isLayout = str.match(/bg-|rounded-[x23]l|rounded-\[|shadow|p-[34568]/) && !str.match(/w-[1-9]\b|h-[1-9]\b|w-1[0-2]\b|h-1[0-2]\b|text-xs|text-\[1[01]px\]|px-2|py-1|py-1\.5|p-1|p-2\b|p-1\.5|btn/);
        
        if (isLayout) {
          if (str.match(/(?<=^|\s)border(?=\s|$)/) && !str.match(/(?<=^|\s)border-2(?=\s|$)/)) {
            return str.replace(/(?<=^|\s)border(?=\s|$)/g, 'border-2 lg:border');
          }
        }
        return str;
      };

      const newContent = content
        .replace(/className="([^"]*)"/g, (match, p1) => `className="${processClassString(p1)}"`)
        .replace(/className=\{`([^`]*)`\}/g, (match, p1) => `className={\`${processClassString(p1)}\`}`);

      if (content !== newContent) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

replaceInDir('src/components');
replaceInDir('src');
