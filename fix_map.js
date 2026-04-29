const fs = require('fs');
let content = fs.readFileSync('src/components/MapSection.tsx', 'utf8');

content = content.replace(/border:3px solid white/g, 'border:4px solid white');
content = content.replace(/border: 1px solid #e2e8f0;/g, 'border: 2px solid #e2e8f0;');

fs.writeFileSync('src/components/MapSection.tsx', content);
console.log('Fixed MapSection borders');
