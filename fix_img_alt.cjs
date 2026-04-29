const fs = require('fs');

let code = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

code = code.replace(
  /alt=<HighlightText text=\{news\.title\} query=\{searchQuery\} \/>/g,
  'alt={news.title}'
);

code = code.replace(
  /const text = `\*Suggest Edit for \$<HighlightText text=\{news\.title\} query=\{searchQuery\} \/>\*\n\nI would like to suggest changes for \$<HighlightText text=\{news\.title\} query=\{searchQuery\} \/>:\\n\\nPlease describe the changes below:\\n\\n`;/g,
  'const text = `*Suggest Edit for ${news.title}*\\n\\nI would like to suggest changes for ${news.title}:\\n\\nPlease describe the changes below:\\n\\n`;'
);

fs.writeFileSync('src/components/NewsSection.tsx', code);
console.log('Fixed img alt and template literal replaces.');
