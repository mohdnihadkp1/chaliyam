import fs from 'fs';

let marketPath = 'src/components/MarketplaceSection.tsx';
let marketContent = fs.readFileSync(marketPath, 'utf8');

marketContent = marketContent.replace(
  'import { ArrowLeft, Search, Filter, ShoppingBag } from "lucide-react";',
  'import { ArrowLeft, Search, Filter, ShoppingBag } from "lucide-react";\nimport InFeedAdCard from "./InFeedAdCard";'
);

marketContent = marketContent.replace(
  '{filteredProducts.map((product) => (',
  `{filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              {index === 4 && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 max-w-full">
                  <InFeedAdCard 
                    title="Summer Clearout Sale"
                    description="Get up to 60% off on premium apparel at the Calicut Store. Limited time only."
                    image="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80"
                    cta="Claim Offer"
                  />
                </div>
              )}
`
);

marketContent = marketContent.replace(
  /<div\n\s*key={product\.id}/,
  `<div`
);

marketContent = marketContent.replace(
  '</div>\n          ))}',
  '</div>\n            </React.Fragment>\n          ))}'
);
if (!marketContent.includes("import React")) {
    marketContent = "import React from 'react';\n" + marketContent;
}

fs.writeFileSync(marketPath, marketContent, 'utf8');

// Directory Section
let dirPath = 'src/components/DirectorySection.tsx';
let dirContent = fs.readFileSync(dirPath, 'utf8');

dirContent = dirContent.replace(
  'import { useState } from "react";',
  'import { useState } from "react";\nimport InFeedAdCard from "./InFeedAdCard";'
);

dirContent = dirContent.replace(
  '{filteredDirectory.map((item) => (',
  `{filteredDirectory.map((item, index) => (
          <React.Fragment key={item.id}>
            {index === 3 && (
              <div className="w-full">
                 <InFeedAdCard 
                    title="Grow Your Business Here"
                    description="List your shop in the Premium Directory section and get 10x more customers."
                    image="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80"
                    cta="Advertise Now"
                  />
              </div>
            )}
`
);

dirContent = dirContent.replace(
  /<div\n\s*key={item\.id}/,
  `<div`
);

dirContent = dirContent.replace(
  '</div>\n        ))}',
  '</div>\n          </React.Fragment>\n        ))}'
);

if (!dirContent.includes("import React")) {
    dirContent = "import React, { useState } from 'react';\n" + dirContent.replace('import { useState } from "react";\n', "");
}

fs.writeFileSync(dirPath, dirContent, 'utf8');

