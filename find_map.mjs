import fs from 'fs';
const content = fs.readFileSync('src/components/MapSection.tsx', 'utf8');
const regex = /(?<!https:)(?<!http:)\/\/[^\n].{0,150}/g;
const matches = content.match(regex);
console.log(matches);
