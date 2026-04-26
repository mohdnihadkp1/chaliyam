import fs from 'fs';
let c = fs.readFileSync('src/components/MarketplaceSection.tsx', 'utf8');

const targetIndex = c.indexOf('{/* Sticky Action Footer */}');
if (targetIndex !== -1) {
  // Find the closing div right before it
  let insertPos = targetIndex;
  while (c[insertPos-1] === ' ' || c[insertPos-1] === '\n') {
    insertPos--;
  }
  // insertPos is at '<' of '</div>'
  insertPos = c.lastIndexOf('<div', insertPos); // actually we want to insert before the ending </div> of the content? 
  // No, the content is in <div className="flex-1 overflow-y-auto pb-24">
  // We can just replace {/* Sticky Action Footer */} with the div + the comment
}

const replacement = `<div className="p-4 md:p-6 bg-[var(--color-surface)] flex justify-center pb-8 mt-4">
    <button
      onClick={() => {
        const text = \\\`*Suggest Edit for \${selectedItem.title}*\\\\n\\\\nI would like to suggest changes for \${selectedItem.title}:\\\\n\\\\nPlease describe the changes below:\\\\n\\\\n\\\`;
        window.open(\\\`https://wa.me/919846750898?text=\\\${encodeURIComponent(text)}\\\`, '_blank');
      }}
      className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium border-t border-slate-200 border-dashed pt-4 w-full flex justify-center"
    >
      Suggest an edit or report issue
    </button>
  </div>
  </div>
  {/* Sticky Action Footer */}`;

c = c.replace(/<\/div>\n\s*\{\/\* Sticky Action Footer \*\//, replacement);
fs.writeFileSync('src/components/MarketplaceSection.tsx', c);
