import fs from 'fs';

let content = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

// Fix the unclosed <> element by finding the end of the file
const lastDivIndex = content.lastIndexOf('</div>');
if (lastDivIndex !== -1 && !content.substring(lastDivIndex).includes('</>')) {
  // It's probably `</div>\n  );\n}`
  content = content.replace(/<\/div>\s*\);\s*}\s*$/, '</div></>);\n}');
}

// Fix selectedItem -> shareModal
content = content.replace(/selectedItem \?/g, 'shareModal ?');

fs.writeFileSync('src/components/NewsSection.tsx', content, 'utf8');
