import fs from 'fs';

function processFile(file, injectionIdx, adDetails) {
  if (!fs.existsSync(file)) return;
  let text = fs.readFileSync(file, 'utf8');
  if (text.includes('<InFeedAdCard')) return;

  text = `import InFeedAdCard from "./InFeedAdCard";\nimport React from "react";\n` + text;

  // We find `{someList.map((item, index) => (`
  const mapRegex = /\{([a-zA-Z0-9_]+)\.map\(\(([a-zA-Z0-9_]+),\s*([a-zA-Z0-9_]+)\)\s*=>\s*\(/;
  const match = text.match(mapRegex);

  if (match) {
    const listName = match[1];
    const itemName = match[2];
    const indexName = match[3];

    // we will find the main div inside the map, e.g. <div key={index} ... or <div ...
    text = text.replace(mapRegex, `{${listName}.map((${itemName}, ${indexName}) => (\n<React.Fragment key={${indexName}}>\n{${indexName} === ${injectionIdx} && (\n<div className="col-span-1 md:col-span-full mb-2 w-full">\n<InFeedAdCard title="${adDetails.title}" description="${adDetails.description}" image="${adDetails.image}" cta="${adDetails.cta}" path="${adDetails.path}" />\n</div>\n)}\n`);

    // Now we need to find the matching closing map parentheses `))}`
    // A quick hack: find `))}` that corresponds to the map.
    // Instead of parsing perfectly, let's just replace `))} ` or similar with text.replace(/(\n\s*)\)\)}/g, '$1</React.Fragment>))}'). 
    // Wait, let's just do it string manipulation way.
    let searchIdx = text.indexOf(`<React.Fragment key={${indexName}}>`);
    
    // This might be tricky, let's just find the closing tag.
    let fragmentClosed = false;
    let newText = "";
    let lines = text.split('\n');
    let nestedMaps = 0;
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes(`${listName}.map`)) {
            nestedMaps++;
        }
        if (line.includes('))}')) {
            if (nestedMaps > 0) {
               nestedMaps--;
               if (nestedMaps === 0 && !fragmentClosed) {
                   line = line.replace('))}', '</React.Fragment>))}');
                   fragmentClosed = true;
               }
            }
        }
        newText += line + '\n';
    }
    fs.writeFileSync(file, newText, 'utf8');
  }
}

processFile('src/components/DirectorySection.tsx', 4, {
  title: 'Premium Listing: Ali Electronics',
  description: 'Top rated appliance repair and servicing. Check out our services today.',
  image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
  cta: 'Visit Profile',
  path: '/directory'
});

processFile('src/components/MarketplaceSection.tsx', 3, {
  title: 'Monsoon Sale: Up to 50% Off!',
  description: 'Grab the best deals on fashion and electronics before it runs out.',
  image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
  cta: 'Shop Deals',
  path: '/store'
});

processFile('src/components/NewsSection.tsx', 2, {
  title: 'Sponsor: Chaliyam Medicals',
  description: '24/7 Pharmacy services and online orders delivered straight to you.',
  image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&w=800&q=80',
  cta: 'Call Now',
  path: '/directory'
});

processFile('src/components/SpotsSection.tsx', 1, {
  title: 'Travel Gear for your next trip',
  description: 'Need bags, caps or shades? We got you covered at Calicut Store.',
  image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
  cta: 'Shop Gear',
  path: '/store'
});

console.log('Done inserting InFeed Ads');
