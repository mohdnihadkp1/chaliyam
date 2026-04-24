import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace(/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"']+/g, (match) => {
  if (!match.includes('fm=webp')) {
    if (match.includes('?')) return match + '&fm=webp';
    return match + '?fm=webp';
  }
  return match;
});

fs.writeFileSync('src/data.ts', content, 'utf8');
