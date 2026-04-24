import fs from 'fs';

let content = fs.readFileSync('src/components/PeopleSection.tsx', 'utf8');
content = content.replace(/setIsSubmitModalOpen\(true\)/g, "navigate('/people/add')");
fs.writeFileSync('src/components/PeopleSection.tsx', content, 'utf8');

// Also MapSection
let map = fs.readFileSync('src/components/MapSection.tsx', 'utf8');
map = map.replace(/onClick=\{\(\) => setIsReportModalOpen\(true\)\}/g, "onClick={() => navigate('/map/report')}");
map = map.replace(/onClick=\{ \(\) => setIsReportModalOpen\(true\) \}/g, "onClick={() => navigate('/map/report')}");
fs.writeFileSync('src/components/MapSection.tsx', map, 'utf8');

// And Marketplace
let mp = fs.readFileSync('src/components/MarketplaceSection.tsx', 'utf8');
mp = mp.replace(/setIsAddModalOpen\(true\)/g, "navigate('/marketplace/add')");
fs.writeFileSync('src/components/MarketplaceSection.tsx', mp, 'utf8');

