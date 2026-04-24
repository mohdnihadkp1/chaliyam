import fs from 'fs';
import path from 'path';

const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  let regex = /(?<!https:)(?<!http:)\/\/[^\n].{0,150}/g;
  let matches = content.match(regex);
  if (matches) {
    console.log(`\n--- ${file} ---`);
    matches.forEach((m, idx) => {
      console.log(`${idx}: ${m}`);
    });
  }
}
