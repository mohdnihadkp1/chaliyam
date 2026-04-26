const fs = require('fs');
let c = fs.readFileSync('src/components/PeopleSection.tsx', 'utf8');

c = c.replace(
  '  </button>\n  </div>\n  </div>\n  </div>',
  `  </button>
  </div>
  <button
    onClick={(e) => {
      e.stopPropagation();
      const text = \\\`*Suggest Edit/Report Issue for \${person.name}*\\\\n\\\\nI would like to suggest changes for \${person.name}:\\\\n\\\\nPlease describe the changes below:\\\\n\\\\n\\\`;
      window.open(\\\`https://wa.me/919846750898?text=\\\${encodeURIComponent(text)}\\\`, '_blank');
    }}
    className="mt-2 w-full flex justify-center text-[11px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-slate-200 border-dashed pt-2"
  >
    Report Issue
  </button>
  </div>
  </div>`
);

fs.writeFileSync('src/components/PeopleSection.tsx', c);
