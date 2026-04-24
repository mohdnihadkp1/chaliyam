import fs from 'fs';
let b = fs.readFileSync('src/components/BusSection.tsx', 'utf8');
b = b.replace(/<\/div><\/React\.Fragment>\)\)}/g, '</div>\n          ))}');
fs.writeFileSync('src/components/BusSection.tsx', b, 'utf8');
