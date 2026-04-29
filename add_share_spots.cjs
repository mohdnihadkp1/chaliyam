const fs = require('fs');

// SPOT SECTION
let code = fs.readFileSync('src/components/SpotsSection.tsx', 'utf8');

// Imports
if (!code.includes('ShareModal')) {
    code = code.replace(/import \{ Share2, MapPin, X, Plus, Image as ImageIcon, Map as MapIcon \} from "lucide-react";/, "import { Share2, MapPin, X, Plus, Image as ImageIcon, Map as MapIcon } from \"lucide-react\";\nimport { ShareModal } from './ShareModal';\nimport { advancedShare } from '../lib/shareUtils';");
}

// State
if (!code.includes('shareData')) {
    code = code.replace(/const \[selectedSpot, setSelectedSpot\] = useState<any>\(null\);/, "const [selectedSpot, setSelectedSpot] = useState<any>(null);\n  const [shareData, setShareData] = useState<any>(null);");
}

// Function
if (!code.includes('doShare')) {
    code = code.replace(/const categories =/, "const doShare = async (spot: any) => {\n    const data = { title: spot.name, text: spot.desc, url: window.location.origin + window.location.pathname + '?spotId=' + spot.id };\n    const success = await advancedShare(data);\n    if (!success) setShareData(data);\n  };\n\n  const categories =");
}

// Button
const reportBlock = `<button
  onClick={(e) => {
    e.stopPropagation();
    const text = \`*Suggest Edit/Report Issue for \${selectedSpot.name}*\\n\\nI would like to suggest changes for \${selectedSpot.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
    window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
  }}
  className="mt-4 w-full flex justify-center text-[12px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-slate-200 border-dashed pt-4"
>
  Suggest an edit or report issue
</button>`;

const newReportBlock = `<div className="mt-4 pt-4 border-t border-slate-200 border-dashed flex items-center justify-between">
  <button
    onClick={(e) => {
      e.stopPropagation();
      const text = \`*Suggest Edit/Report Issue for \${selectedSpot.name}*\\n\\nI would like to suggest changes for \${selectedSpot.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
      window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
    }}
    className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors font-medium"
  >
    Suggest an edit or report issue
  </button>
  <button
    onClick={(e) => {
       e.stopPropagation();
       doShare(selectedSpot);
    }}
    className="flex items-center gap-1 text-[var(--color-primary)] hover:text-indigo-700 transition-colors text-[12px] font-medium"
  >
    <Share2 size={14} /> Share
  </button>
</div>`;

code = code.replace(reportBlock, newReportBlock);

// Modal
if (!code.includes('<ShareModal')) {
    code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/>\s*\);\s*}\s*$/g, "</div>\n        </div>\n      </div>\n    )}\n\n      <ShareModal \n        isOpen={!!shareData} \n        onClose={() => setShareData(null)} \n        title={shareData?.title || \"\"} \n        text={shareData?.text || \"\"} \n        url={shareData?.url || \"\"} \n      />\n    </div>\n    </>\n  );\n}\n");
}

fs.writeFileSync('src/components/SpotsSection.tsx', code);
console.log('SpotsSection updated with Share');
