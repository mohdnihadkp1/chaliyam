import fs from 'fs';
let c = fs.readFileSync('src/components/PeopleSection.tsx', 'utf8');

const searchString = 'Edit Profile"';
const index = c.indexOf(searchString);
if (index === -1) {
  console.log("Not found editing string");
  process.exit(1);
}

// Find the corresponding 'Edit\n  </button>\n  </div>\n  </div>\n  </div>\n  </div>' structure and insert carefully
const buttonStart = c.lastIndexOf('<button', index);
const buttonEnd = c.indexOf('</button>', index) + '</button>'.length;
const div1 = c.indexOf('</div>', buttonEnd);
const div2 = c.indexOf('</div>', div1 + 1);

const replacement = `<button
  onClick={(e) => {
    e.stopPropagation();
    const text = \`*Suggest Edit/Report Issue for \${person.name}*\\n\\nI would like to suggest changes for \${person.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
    window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
  }}
  className="w-full flex justify-center text-[10px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-[var(--color-outline)] pt-2"
>
  Report Issue / Suggest Edit
</button>
</div>
</div>`;

c = c.slice(0, div2) + replacement + c.slice(div2 + '</div>\n  </div>'.length);
fs.writeFileSync('src/components/PeopleSection.tsx', c);
