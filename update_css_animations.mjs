import fs from 'fs';

let css = fs.readFileSync('./src/index.css', 'utf8');
if (!css.includes('@keyframes fadeIn')) {
  css += `

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpBottom {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleUpCenter {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;
  fs.writeFileSync('./src/index.css', css, 'utf8');
}
