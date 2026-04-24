import fs from 'fs';

function configureSection(filePath, arrayName, idField, jsonLdMapper) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Add import { useSearchParams } and Helmet if missing
  if (!code.includes('useSearchParams')) {
    code = code.replace(/import \{.*?\} from "react-router-dom";/, (match) => {
      return match.replace('useNavigate', 'useNavigate, useSearchParams');
    });
    if (!code.includes('useSearchParams')) {
        code = code.replace('import { useNavigate } from "react-router-dom";', 'import { useNavigate, useSearchParams } from "react-router-dom";');
    }
  }

  if (!code.includes('Helmet')) {
    const reactImport = /import React.*?;\n/;
    if (reactImport.test(code)) {
        code = code.replace(reactImport, (match) => match + 'import { Helmet } from "react-helmet-async";\n');
    } else {
        code = 'import { Helmet } from "react-helmet-async";\n' + code;
    }
  }

  // Replace selectedItem state
  const stateRegexItem = /const\s+\[selectedItem,\s*setSelectedItem\]\s*=\s*useState<[\s\S]*?>\(null\);/;
  const replacementItem = \`const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const selectedItem = \${arrayName}.find((d: any) => String(d.\${idField} || d.id) === selectedId) || null;
  const setSelectedItem = (item: any) => {
    if (item) {
      searchParams.set("id", String(item.\${idField} || item.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };\`;

  if (stateRegexItem.test(code)) {
    code = code.replace(stateRegexItem, replacementItem);
  }

  // Inject Helmet in return
  const returnRegex = /return\s*\(\s*<div/;
  const helmetContent = \`return (
    <>
      <Helmet>
        {selectedItem ? (
          <script type="application/ld+json">
            {\`\${JSON.stringify(\${jsonLdMapper})}\`}
          </script>
        ) : (
          <script type="application/ld+json">
            {\`\${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": \${arrayName}.slice(0, 10).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": "https://chaliyam-connect.web.app" + window.location.pathname + "?id=" + (item.\${idField} || item.id)
              }))
            })}\`}
          </script>
        )}
      </Helmet>
      <div\`;

  if (!code.includes('<Helmet>') && returnRegex.test(code)) {
    code = code.replace(returnRegex, helmetContent);
    const lastDiv = /<\/div>\s*\);\s*\}/;
    code = code.replace(lastDiv, '</div></>);\\n}');
  }

  fs.writeFileSync(filePath, code, 'utf8');
}

configureSection('src/components/DirectorySection.tsx', 'DIRECTORY', 'id', '{ "@context": "https://schema.org", "@type": "LocalBusiness", "name": selectedItem.name, "image": selectedItem.image || "", "description": selectedItem.desc, "telephone": selectedItem.phone || "", "address": { "@type": "PostalAddress", "addressLocality": "Chaliyam", "addressRegion": "Kerala", "addressCountry": "IN" } }');
configureSection('src/components/MarketplaceSection.tsx', 'MARKETPLACE', 'id', '{ "@context": "https://schema.org", "@type": "Product", "name": selectedItem.title, "image": selectedItem.images?.[0] || selectedItem.image || "", "description": selectedItem.desc, "offers": { "@type": "Offer", "price": selectedItem.price, "priceCurrency": "INR", "availability": "https://schema.org/InStock" } }');
configureSection('src/components/PeopleSection.tsx', 'PEOPLE', 'id', '{ "@context": "https://schema.org", "@type": "Person", "name": selectedItem.name, "jobTitle": selectedItem.role, "telephone": selectedItem.phone, "url": selectedItem.website || "" }');
configureSection('src/components/SpotsSection.tsx', 'SPOTS', 'id', '{ "@context": "https://schema.org", "@type": "TouristAttraction", "name": selectedItem.name, "image": selectedItem.image || "", "description": selectedItem.desc }');

console.log("Configured sections");
