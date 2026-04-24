import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // match things like ` (--color-surface)]` or ` (--color-primary-container)]0/20`
  content = content.replace(/ \(--color-[a-zA-Z0-9-]+\)\][^ \"`'\n]*/g, '');
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up artifacts in ${file}`);
  }
}
