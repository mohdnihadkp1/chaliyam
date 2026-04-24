import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Clean up any weird `)]` or `)]"` leftovers
  content = content.replace(/ \)]"/g, '"');
  content = content.replace(/ \)] `/g, ' `');
  content = content.replace(/ \)]'/g, "'");
  content = content.replace(/\s+\)\]/g, '');
  content = content.replace(/\)\]/g, '');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ')]' in ${file}`);
  }
}
