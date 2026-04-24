import fs from 'fs';

let content = fs.readFileSync('src/components/BusSection.tsx', 'utf8');

if (!content.includes('import InFeedAdCard')) {
    content = content.replace(
      'import { ArrowLeft, Clock, MapPin, Search } from "lucide-react";',
      'import { ArrowLeft, Clock, MapPin, Search } from "lucide-react";\nimport InFeedAdCard from "./InFeedAdCard";\nimport React from "react";'
    );
    
    // Sometimes the code format changes, so we will use a more resilient replace
    const mapStr = '{filteredBuses.map((bus, index) => (';
    const replaceStr = `{filteredBuses.map((bus, index) => (
            <React.Fragment key={index}>
              {index === 2 && (
                <div className="md:col-span-2 lg:col-span-3">
                  <InFeedAdCard 
                    title="Lost? Check the Map"
                    description="View all bus stops and important locations on the interactive map."
                    image="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                    cta="Open Map"
                    path="/map"
                  />
                </div>
              )}
`;
    content = content.replace(mapStr, replaceStr);
    
    // Remove individual key from the mapped div
    content = content.replace(
        /<div\s+key={index}\s+className="bg-\[var\(--color-surface-variant\)\]/g, 
        '<div className="bg-[var(--color-surface-variant)]'
    );
    
    // Close the fragment
    content = content.replace(
        /<\/div>\s+\)\)}\s+<\/div>/,
        '</div>\n            </React.Fragment>\n          ))}\n        </div>'
    );
    
    fs.writeFileSync('src/components/BusSection.tsx', content, 'utf8');
}
