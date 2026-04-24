import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Remove all strings like `dark:text-[var(--color-primary)]` or `dark:from-slate-900/95`
  content = content.replace(/\bdark:[a-zA-Z0-9\[\]\(\)\-\/\#_]+\b/g, '');
  
  // Clean up any double spaces left behind by the removal
  content = content.replace(/ \s+/g, ' ');
  // Clean up spaces before closing quotes
  content = content.replace(/ "\}/g, '"}');
  content = content.replace(/ "/g, '"');
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed dark classes in ${file}`);
  }
}
