const fs = require('fs');
let c = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

c = c.replace(/flex justify-end(?=">[\s]*<button[\s]*onClick=\{\(e\) => \{\s*e\.stopPropagation\(\);\s*handleShare\(news\);\s*\}\})/g, 'items-center justify-between');

c = c.replace(
  /(<button\s*onClick=\{\(e\) => \{\s*e\.stopPropagation\(\);\s*handleShare\(news\);\s*\}\})/,
  `<button
    onClick={(e) => {
      e.stopPropagation();
      const text = \`*Suggest Edit for \${news.title}*\\n\\nI would like to suggest changes for \${news.title}:\\n\\nPlease describe the changes below:\\n\\n\`;
      window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
    }}
    className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-b border-transparent hover:border-slate-300 pb-0.5"
  >
    Report Issue
  </button>
  $1`
);

fs.writeFileSync('src/components/NewsSection.tsx', c);
