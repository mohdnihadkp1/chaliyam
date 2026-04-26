import fs from 'fs';
let c = fs.readFileSync('src/components/SpotsSection.tsx', 'utf8');
const searchString = '<MapPin size={20} /> View on Google Maps';
const index = c.indexOf(searchString);
if (index === -1) {
  console.log("Not found");
  process.exit(1);
}
// Find the subsequent </button>\n</div>\n</div>\n</div>
const buttonEnd = c.indexOf('</button>', index);
const div1 = c.indexOf('</div>', buttonEnd);
const div2 = c.indexOf('</div>', div1 + 1);
const div3 = c.indexOf('</div>', div2 + 1);
const div3End = div3 + '</div>'.length;

const replacement = `<button
  onClick={(e) => {
    e.stopPropagation();
    const text = \`*Suggest Edit/Report Issue for \${selectedSpot.name}*\\n\\nI would like to suggest changes for \${selectedSpot.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
    window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
  }}
  className="mt-4 w-full flex justify-center text-[12px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-slate-200 border-dashed pt-4"
>
  Suggest an edit or report issue
</button>
</div>
</div>
</div>`;

c = c.slice(0, div1) + replacement + c.slice(div3End);
fs.writeFileSync('src/components/SpotsSection.tsx', c);
