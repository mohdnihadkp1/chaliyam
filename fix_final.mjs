import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix unclosed `[var(--color-.*`
  content = content.replace(/\[var\(--color-([a-zA-Z0-9-]+)\)(?!\])/g, '[var(--color-$1)]');
  
  // Fix `)]` artifacts
  content = content.replace(/\)]\s*;/g, ');');       // `)];` -> `);`
  content = content.replace(/\)]\s*:/g, '):');       // `)] :` -> `):`
  content = content.replace(/\)]\s*}/g, ')}');       // `)]}` -> `)}`
  content = content.replace(/}\)]/g, '})');          // `})]` -> `})`
  content = content.replace(/}\)]}/g, '})}');
  content = content.replace(/\)\]\)/g, '))');
  content = content.replace(/ \)] /g, ' ) ');

  // Fix PeopleSection.tsx regex
  content = content.replace(/\[0-9\\s\\-\(\{7,15\}\$/g, '[0-9\\s\\-()]{7,15}$');
  
  // Also we might have stripped `)]` from `.map((x)] =>` or something else? I already fixed those via fix_more
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Repaired brackets completely in ${file}`);
  }
}
