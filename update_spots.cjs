const fs = require('fs');
let c = fs.readFileSync('src/components/SpotsSection.tsx', 'utf8');

c = c.replace(
  '<MapPin size={20} /> View on Google Maps\n</button>\n</div>\n</div>\n</div>',
  `<MapPin size={20} /> View on Google Maps
</button>
<button
  onClick={(e) => {
    e.stopPropagation();
    const text = \\\`*Suggest Edit/Report Issue for \${selectedSpot.name}*\\\\n\\\\nI would like to suggest changes for \${selectedSpot.name}:\\\\n\\\\nPlease describe the changes below:\\\\n\\\\n\\\`;
    window.open(\\\`https://wa.me/919846750898?text=\\\${encodeURIComponent(text)}\\\`, '_blank');
  }}
  className="mt-4 w-full flex justify-center text-[12px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-slate-200 border-dashed pt-4"
>
  Suggest an edit or report issue
</button>
</div>
</div>
</div>`
);

fs.writeFileSync('src/components/SpotsSection.tsx', c);
