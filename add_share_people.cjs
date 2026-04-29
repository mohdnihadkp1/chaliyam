const fs = require('fs');

let code = fs.readFileSync('src/components/PeopleSection.tsx', 'utf8');

// Imports
if (!code.includes('ShareModal')) {
    code = code.replace(/import \{ Search, Plus, X, Phone, Mail, Instagram, Linkedin \} from "lucide-react";/, "import { Search, Plus, X, Phone, Mail, Instagram, Linkedin, Share2 } from \"lucide-react\";\nimport { ShareModal } from './ShareModal';\nimport { advancedShare } from '../lib/shareUtils';");
}

// State
if (!code.includes('shareData')) {
    code = code.replace(/const \[expandedCategory, setExpandedCategory\] = useState<string \| null>\(null\);/, "const [expandedCategory, setExpandedCategory] = useState<string | null>(null);\n  const [shareData, setShareData] = useState<any>(null);");
}

// Function
if (!code.includes('doShare')) {
    code = code.replace(/const filteredPeople =/, "const doShare = async (person: any) => {\n    const data = { title: person.name, text: person.role, url: window.location.origin + window.location.pathname + '?personId=' + person.id, imageUrl: person.image };\n    const success = await advancedShare(data);\n    if (!success) setShareData(data);\n  };\n\n  const filteredPeople =");
}

// Button
const reportBlock = `<button
  onClick={(e) => {
    e.stopPropagation();
    const text = \`*Suggest Edit/Report Issue for \${person.name}*\\n\\nI would like to suggest changes for \${person.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
    window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
  }}
  className="w-full flex justify-center text-[10px] text-slate-400 hover:text-slate-600 transition-colors font-medium border-t border-[var(--color-outline)] pt-2"
>
  Report Issue / Suggest Edit
</button>`;

const newReportBlock = `<div className="mt-2 pt-2 border-t border-[var(--color-outline)] flex items-center justify-between">
  <button
    onClick={(e) => {
      e.stopPropagation();
      const text = \`*Suggest Edit/Report Issue for \${person.name}*\\n\\nI would like to suggest changes for \${person.name}:\\n\\nPlease describe the changes below:\\n\\n\`;
      window.open(\`https://wa.me/919846750898?text=\${encodeURIComponent(text)}\`, '_blank');
    }}
    className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors font-medium"
  >
    Report Issue / Suggest Edit
  </button>
  <button
    onClick={(e) => {
       e.stopPropagation();
       doShare(person);
    }}
    className="flex items-center gap-1 text-[var(--color-primary)] hover:text-indigo-700 transition-colors text-[10px] font-medium"
  >
    <Share2 size={12} /> Share
  </button>
</div>`;

code = code.replace(reportBlock, newReportBlock);

// Modal
if (!code.includes('<ShareModal')) {
    code = code.replace(/<\/div><\/div><\/div><\/React.Fragment>\)\)}/g, "</div></div></div></React.Fragment>))}\n\n      <ShareModal \n        isOpen={!!shareData} \n        onClose={() => setShareData(null)} \n        title={shareData?.title || \"\"} \n        text={shareData?.text || \"\"} \n        url={shareData?.url || \"\"} \n        imageUrl={shareData?.imageUrl || \"\"}\n      />");
}

fs.writeFileSync('src/components/PeopleSection.tsx', code);
console.log('PeopleSection updated with Share');
