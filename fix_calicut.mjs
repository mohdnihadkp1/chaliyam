import fs from 'fs';
let content = fs.readFileSync('src/components/CalicutStore.tsx', 'utf8');
content = content.replace('group-hover:scale-105 transition-transform duration-300 group-hover:scale-105 transition-transform duration-500', 'group-hover:scale-105 transition-transform duration-500');
fs.writeFileSync('src/components/CalicutStore.tsx', content, 'utf8');
