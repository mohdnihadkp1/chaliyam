import fs from 'fs';

function updateSection(file, listName, type, jsonLdFunc, idField = "id") {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  if (!code.includes('useSearchParams')) {
    code = code.replace(/import\s+\{\s*useNavigate\s*\}\s+from\s+"react-router-dom";/, 'import { useNavigate, useSearchParams } from "react-router-dom";');
    if (!code.includes('useSearchParams')) {
        code = code.replace(/import\s+\{.*\}\s+from\s+"react-router-dom";/, (match) => {
            return match.replace('useNavigate', 'useNavigate, useSearchParams');
        });
    }
  }

  if (!code.includes('Helmet')) {
    code = code.replace(/import\s+React.*?;\n/, (m) => m + 'import { Helmet } from "react-helmet-async";\n');
    if (!code.includes('Helmet')) {
        code = 'import { Helmet } from "react-helmet-async";\n' + code;
    }
  }

  const stateRegex = /const\s+\[(selectedItem|selectedSpot|shareModal),\s*(setSelectedItem|setSelectedSpot|setShareModal)\]\s*=\s*useState<[\s\S]*?>\(null\);/;
  
  if (stateRegex.test(code)) {
    const match = code.match(stateRegex);
    const itemVar = match[1];
    const setItemVar = match[2];

    const replacement = `const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const ${itemVar} = ${listName}.find((d: any) => String(d.${idField} || d.id) === selectedId) || null;
  const ${setItemVar} = (item: any) => {
    if (item) {
      searchParams.set("id", String(item.${idField} || item.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };`;
    code = code.replace(stateRegex, replacement);
  }

  const returnRegex = /return\s*\(\s*<(div|React\.Fragment)[^>]*>/;
  if (!code.includes('<Helmet>') && returnRegex.test(code)) {
    const match = code.match(returnRegex);
    const divWrapper = match[0];
    
    const helmetInject = `return (
    <>
      <Helmet>
        {${code.match(stateRegex) ? code.match(stateRegex)[1] : "selectedItem"} ? (
          <script type="application/ld+json">
            {\`\${JSON.stringify(${jsonLdFunc})}\`}
          </script>
        ) : (
          <script type="application/ld+json">
            {\`\${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": ${listName}.slice(0, 10).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": "https://chaliyam-connect.web.app" + window.location.pathname + "?id=" + (item.${idField} || item.id)
              }))
            })}\`}
          </script>
        )}
      </Helmet>
      ${divWrapper.substring(8)}`;
    code = code.replace(returnRegex, helmetInject);
    
    const lastTagRegex = /(<\/[a-zA-Z0-9]+>\s*);\s*\}\s*$/;
    code = code.replace(lastTagRegex, (m, g1) => `${g1}</>);\n}`);
  }

  fs.writeFileSync(file, code, 'utf8');
}

updateSection('src/components/MarketplaceSection.tsx', 'MARKETPLACE', 'Product', `{ "@context": "https://schema.org", "@type": "Product", name: selectedItem.title, image: selectedItem.images?.[0] || selectedItem.image || "", description: selectedItem.desc, offers: { "@type": "Offer", price: selectedItem.price, priceCurrency: "INR", availability: "https://schema.org/InStock" } }`);

updateSection('src/components/PeopleSection.tsx', 'PEOPLE', 'Person', `{ "@context": "https://schema.org", "@type": "Person", name: selectedItem.name, jobTitle: selectedItem.role, telephone: selectedItem.phone, url: selectedItem.website || "" }`);

updateSection('src/components/SpotsSection.tsx', 'SPOTS', 'TouristAttraction', `{ "@context": "https://schema.org", "@type": "TouristAttraction", name: selectedItem.name, image: selectedItem.image || "", description: selectedItem.desc }`);

console.log("Sections updated successfully.");
