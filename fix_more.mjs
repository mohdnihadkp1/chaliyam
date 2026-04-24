import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix `(e)] =>` to `(e) =>`
  content = content.replace(/\)]\s*=>/g, ') =>');
  
  // Fix `() ] =>` or `() ]=>` maybe?
  content = content.replace(/\(\)\]\s*=>/g, '() =>');
  
  // Fix `)])` or `)])}`
  content = content.replace(/\)\]\}/g, ')}');
  content = content.replace(/\)\]\)/g, '))');
  content = content.replace(/\]\)/g, '])'); // wait, `])` is valid sometimes, like `[1,2].map()`
  // Actually, `)])}` -> it was `)]}`? No, line 102 was `)])}` mapped to `)}` originally?
  // Let's look at `)])} `. If it's `btn.label}</button> )]}` it should be `})}`
  content = content.replace(/\)\]\}/g, ')}');
  content = content.replace(/\)\]\)/g, '))');
  // `</div> )]}` -> `</div> )]}` was stripped of spaces before `)]` to `</div>)]}`
  content = content.replace(/<\/div>\]\}/g, '</div>}');
  content = content.replace(/<\/div>\)\]\}/g, '</div>)}');
  content = content.replace(/\]\}/g, ']}'); // wait! Array map could be `]}` 

  // Let's just fix the variables bracket first:
  // We missed `text-[var(--color-surface-variant`
  content = content.replace(/(\[var\(--color-[a-zA-Z0-9-]+\))([^\]a-zA-Z0-9-])/g, '$1]$2');
  
  // Also fix `bg-[var(--color-primary` at end of quotes
  // e.g. text-[var(--color-on-surface-variant"
  content = content.replace(/(\[var\(--color-[a-zA-Z0-9-]+\))(["'`])/g, '$1]$2');

  // Any case where `[var(--color-` is followed by a space
  content = content.replace(/(\[var\(--color-[a-zA-Z0-9-]+\)) /g, '$1] ');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Repaired more in ${file}`);
  }
}
