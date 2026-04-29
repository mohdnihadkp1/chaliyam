const fs = require('fs');
let code = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

code = code.replace(
  /\{\s*news\.title\s*\}/g,
  '<HighlightText text={news.title} query={searchQuery} />'
);

code = code.replace(
  /\{\s*news\.desc\s*\}/g,
  '<HighlightText text={news.desc} query={searchQuery} />'
);

// We gotta revert any unintended replaces in template literals or object props
code = code.replace(/title:\s*<HighlightText text=\{news\.title\} query=\{searchQuery\} \/>/g, 'title: news.title');
code = code.replace(/text:\s*<HighlightText text=\{news\.desc\} query=\{searchQuery\} \/>/g, 'text: news.desc');
code = code.replace(/\*\n\nI would like to suggest changes for <HighlightText text=\{news\.title\} query=\{searchQuery\} \/>:\\n\\n/g, '*\\n\\nI would like to suggest changes for ${news.title}:\\n\\n');
code = code.replace(/\*Suggest Edit for <HighlightText text=\{news\.title\} query=\{searchQuery\} \/>\*/g, '*Suggest Edit for ${news.title}*');

fs.writeFileSync('src/components/NewsSection.tsx', code);
console.log('Fixed highlight replaces.');
