import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Fix broken variable brackets: e.g. text-[var(--color-primary -> text-[var(--color-primary)]
  // We match cases where `[var(--color-something` is followed by a space, quote, or end of string,
  // and we make sure there is a closing bracket.
  content = content.replace(/(\[var\(--color-[a-zA-Z0-9-]+\))([ \`\'\"])/g, '$1]$2');
  
  // Also handle cases at the very end of string, if any (less likely but possible)
  // or before a / like bg-[var(--color-primary/90 -> bg-[var(--color-primary)]/90
  content = content.replace(/(\[var\(--color-[a-zA-Z0-9-]+\))(\/[0-9]+)?/g, (match, g1, g2) => {
    // If it already has a bracket next (which our regex didn't check), we skip?
    return match;
  });

  // A better regex: find `[var(...)` that is NOT followed by `]`
  content = content.replace(/(\[var\([^)]+\))([^\]])/g, '$1]$2');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Repaired brackets in ${file}`);
  }
}
