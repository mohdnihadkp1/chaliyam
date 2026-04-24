import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Match `[var(--color-xyz` optionally followed by `)` or `)]` or none.
  // We want to force it to be EXACTLY `[var(--color-xyz)]` 
  
  // So we match `\[var\(--color-([a-zA-Z0-9-]+)[\)\]]*`
  // and replace with `[var(--color-$1)]`
  
  content = content.replace(/\[var\(--color-([a-zA-Z0-9-]+)[\)\]]*/g, '[var(--color-$1)]');
  
  // Wait, if it becomes `)]]` or `)])]` we should clean it
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Repaired CSS vars in ${file}`);
  }
}
