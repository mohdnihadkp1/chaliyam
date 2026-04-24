import fs from 'fs';

let code = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

// Add import { useSearchParams } and Helmet if missing
if (!code.includes('useSearchParams')) {
  code = code.replace(/import \{.*?\} from "react-router-dom";/, (match) => {
    return match.replace('useNavigate', 'useNavigate, useSearchParams');
  });
}

if (!code.includes('Helmet')) {
  code = 'import { Helmet } from "react-helmet-async";\\n' + code;
}

const stateRegex = /const\s+\[shareModal,\s*setShareModal\]\s*=\s*useState<any>\\(null\\);/;
const replacement = \`const [searchParams, setSearchParams] = useSearchParams();
const shareModalId = searchParams.get("id");
const shareModal = NEWS_UPDATES.find((n: any) => String(n.id) === shareModalId) || null;
const setShareModal = (item: any) => {
  if (item) {
    searchParams.set("id", String(item.id));
    setSearchParams(searchParams);
  } else {
    searchParams.delete("id");
    setSearchParams(searchParams);
  }
};\`;

if (stateRegex.test(code)) {
  code = code.replace(stateRegex, replacement);
}

const returnRegex = /return\s*\\(\\s*<div/;
const helmetContent = \`return (
  <>
    <Helmet>
      {shareModal ? (
        <script type="application/ld+json">
          {\`\${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": shareModal.title,
            "description": shareModal.desc,
            "startDate": shareModal.date,
            "location": {
              "@type": "Place",
              "name": "Chaliyam"
            }
          })}\`}
        </script>
      ) : (
        <script type="application/ld+json">
          {\`\${JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": NEWS_UPDATES.slice(0, 10).map((item: any, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": "https://chaliyam-connect.web.app/news?id=" + item.id
            }))
          })}\`}
        </script>
      )}
    </Helmet>
    <div\`;

if (!code.includes('<Helmet>') && returnRegex.test(code)) {
  code = code.replace(returnRegex, helmetContent);
  const lastDiv = /<\\/div>\\s*\\);\\s*\\}/;
  code = code.replace(lastDiv, '</div></>);\\n}');
}

fs.writeFileSync('src/components/NewsSection.tsx', code, 'utf8');
console.log("News section configured");
