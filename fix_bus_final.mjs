import fs from 'fs';
let b = fs.readFileSync('src/components/BusSection.tsx', 'utf8');
b = b.replace('           ))}\n</div>\n{filteredBuses.length === 0', '           </React.Fragment>))}\n</div>\n{filteredBuses.length === 0');
fs.writeFileSync('src/components/BusSection.tsx', b, 'utf8');
