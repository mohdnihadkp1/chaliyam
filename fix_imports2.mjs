import fs from 'fs';

function addImports(file) {
  let code = fs.readFileSync(file, 'utf8');
  let newImport = 'import { useNavigate, useSearchParams } from "react-router-dom";\n';
  
  if (!code.includes('react-router-dom')) {
      // Find the first import and prepend there
      code = code.replace(/import /, newImport + 'import ');
  } else {
     // replace react-router-dom import with useNavigate, useSearchParams
     code = code.replace(/import \{.*?\} from ["']react-router-dom["'];?/, newImport);
  }

  if (!code.includes('const navigate = useNavigate();')) {
     code = code.replace(/(export default function [A-Za-z]+\(\) \{)/, '$1\n  const navigate = useNavigate();');
  }

  fs.writeFileSync(file, code);
}

addImports('src/components/DirectorySection.tsx');
addImports('src/components/MarketplaceSection.tsx');
addImports('src/components/NewsSection.tsx');
addImports('src/components/PeopleSection.tsx');
addImports('src/components/MapSection.tsx');
addImports('src/components/SpotsSection.tsx');

console.log('Fixed imports again');
