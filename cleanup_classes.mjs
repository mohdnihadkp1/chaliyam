import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/hover:-translate-y-0\.5/g, '');
  content = content.replace(/transition-all duration-300 ease-in-out transition-all duration-300/g, 'transition-all duration-300 ease-in-out');
  content = content.replace(/transition-all duration-300 transition-all duration-300 ease-in-out/g, 'transition-all duration-300 ease-in-out');

  // Fix buttons that got two transition-all
  content = content.replace(/transition-all text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out whitespace-nowrap active:scale-95 transition-all duration-150/g, 
    'text-sm font-bold shadow-sm hover:shadow-lg hover:-translate-y-1 whitespace-nowrap active:scale-95 transition-all duration-300 ease-in-out');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up classes in ${file}`);
  }
}
