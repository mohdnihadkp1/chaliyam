import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  content = content.replace(/className=(["`'])(.*?)\1/g, (match, quote, classes) => {
    if (classes.includes('bg-[var(--color-primary)]') && classes.includes('text-white')) {
      return match.replace('text-white', 'text-[var(--color-on-primary)]');
    }
    return match;
  });
  
  content = content.replace(/className=\{([^}]+)\}/g, (match, expr) => {
    if (expr.includes('bg-[var(--color-primary)]') && expr.includes('text-white')) {
      return match.replace(/text-white/g, 'text-[var(--color-on-primary)]');
    }
    return match;
  });

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed contrast in ${file}`);
  }
}
