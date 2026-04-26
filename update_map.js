import fs from 'fs';
let c = fs.readFileSync('src/components/MapSection.tsx', 'utf8');

c = c.replace(
  /Get Directions <\/a>/,
  `Get Directions </a> <a href="https://wa.me/919846750898?text=\${encodeURIComponent('*Suggest Edit/Report Issue for ' + m.name + '*\\n\\nI would like to suggest changes:\\n\\nPlease describe the changes below:\\n\\n')}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; margin-top: 10px; color: #64748b; font-size: 11px; text-decoration: none; font-weight: 500;"> Report Issue </a>`
);

fs.writeFileSync('src/components/MapSection.tsx', c);
