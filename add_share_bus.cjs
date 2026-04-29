const fs = require('fs');

let code = fs.readFileSync('src/components/BusSection.tsx', 'utf8');

// Imports
if (!code.includes('ShareModal')) {
    code = code.replace(/import \{ useState \} from "react";/, "import { useState } from \"react\";\nimport { ShareModal } from './ShareModal';\nimport { advancedShare } from '../lib/shareUtils';\nimport { Share2 } from 'lucide-react';");
}
if (!code.includes('import { Share2 }')) {
    code = code.replace(/import \{ ShareModal \} from '\.\/ShareModal';/, "import { ShareModal } from './ShareModal';\nimport { Share2 } from 'lucide-react';");
}

// State
if (!code.includes('shareData')) {
    code = code.replace(/const \[selectedCategory, setSelectedCategory\] = useState<string>\("all"\);/, "const [selectedCategory, setSelectedCategory] = useState<string>(\"all\");\n  const [shareData, setShareData] = useState<any>(null);");
}

// Function
if (!code.includes('doShare')) {
    code = code.replace(/const groupedBuses =/, "const doShare = async (bus: any) => {\n    const data = { title: bus.name, text: bus.time + ' - ' + bus.route, url: window.location.origin + window.location.pathname + '?busId=' + bus.id };\n    const success = await advancedShare(data);\n    if (!success) setShareData(data);\n  };\n\n  const groupedBuses =");
}

// Button
const reportBlock = `  <div className="pt-3 mt-3 border-t border-[var(--color-outline)]">
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
  </div>`;

const newReportBlock = `  <div className="pt-3 mt-3 border-t border-[var(--color-outline)] flex items-center justify-between">
    <button
      onClick={(e) => {
        e.stopPropagation();
        const text = \`*Suggest Edit/Report Issue for Bus \${bus.name} (\${bus.time})*\\n\\nI would like to suggest changes:\\n\\nPlease describe the changes below:\\n\\n\`;
        window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
      }}
      className="text-[11px] text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium"
    >
      Report Issue / Suggest Edit
    </button>
    <button
      onClick={(e) => {
         e.stopPropagation();
         doShare(bus);
      }}
      className="flex items-center gap-1.5 text-slate-500 hover:text-[var(--color-primary)] transition-colors text-xs font-medium"
    >
      <Share2 size={14} /> Share
    </button>
  </div>`;

code = code.replace(reportBlock, newReportBlock);

// Modal
if (!code.includes('<ShareModal')) {
    code = code.replace(/<\/div><\/>\);\n}/g, "\n      <ShareModal \n        isOpen={!!shareData} \n        onClose={() => setShareData(null)} \n        title={shareData?.title || \"\"} \n        text={shareData?.text || \"\"} \n        url={shareData?.url || \"\"} \n      />\n    </div></>);\n}");
}

fs.writeFileSync('src/components/BusSection.tsx', code);
console.log('BusSection updated with Share');
