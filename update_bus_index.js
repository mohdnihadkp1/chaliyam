import fs from 'fs';
let c = fs.readFileSync('src/components/BusSection.tsx', 'utf8');

const regex = /\s*\)\}\s*<\/div>\s*\)\)\}\s*<\/div>/;

const replacement = `
  )}
  <div className="pt-3 mt-3 border-t border-[var(--color-outline)]">
    <button
      onClick={(e) => {
        e.stopPropagation();
        const text = \`*Suggest Edit/Report Issue for Bus \${bus.name} (\${bus.time})*\\n\\nI would like to suggest changes:\\n\\nPlease describe the changes below:\\n\\n\`;
        window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
      }}
      className="w-full flex justify-center text-[11px] text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium"
    >
      Report Issue / Suggest Edit
    </button>
  </div>
  </div>
           ))}
  </div>`;

c = c.replace(regex, replacement);
fs.writeFileSync('src/components/BusSection.tsx', c);
