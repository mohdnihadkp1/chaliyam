const fs = require('fs');
let c = fs.readFileSync('src/components/BusSection.tsx', 'utf8');

c = c.replace(
  '</div>\n  )}\n  </div>\n          ))}',
  `</div>
  )}
  <div className="pt-2 mt-4 border-t border-[var(--color-outline)]">
    <button
      onClick={(e) => {
        e.stopPropagation();
        const text = \\\`*Suggest Edit/Report Issue for Bus \${bus.name} (\${bus.time})*\\\\n\\\\nI would like to suggest changes:\\\\n\\\\nPlease describe the changes below:\\\\n\\\\n\\\`;
        window.open(\\\`https://wa.me/919846750898?text=\\\${encodeURIComponent(text)}\\\`, '_blank');
      }}
      className="w-full flex justify-center text-[10px] text-slate-400 hover:text-[var(--color-primary)] transition-colors font-medium border-b border-transparent hover:border-[var(--color-primary)] pb-0.5"
    >
      Report Issue / Suggest Edit
    </button>
  </div>
  </div>
          ))}`
);

fs.writeFileSync('src/components/BusSection.tsx', c);
