import fs from 'fs';

const filesToFix = ['src/components/MarketplaceSection.tsx', 'src/components/PeopleSection.tsx', 'src/components/SpotsSection.tsx', 'src/components/DirectorySection.tsx'];

for (const file of filesToFix) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1 && !content.substring(lastDivIndex).includes('</>')) {
    content = content.replace(/<\/div>\s*\);\s*}\s*$/, '</div></>);\n}');
  }

  if (file === 'src/components/SpotsSection.tsx') {
    content = content.replace(/selectedItem \?/g, 'selectedSpot ?');
    content = content.replace(/selectedItem\./g, 'selectedSpot.');
  }

  // For PeopleSection, there is no selectedItem. I should create it from URL param.
  if (file === 'src/components/PeopleSection.tsx') {
    if (!content.includes('const selectedItem')) {
      content = content.replace('const [searchParams, setSearchParams] = useSearchParams();', 
        'const [searchParams, setSearchParams] = useSearchParams();\\n  const selectedId = searchParams.get("id");\\n  const selectedItem = PEOPLE.find((d: any) => String(d.id) === selectedId) || null;\\n  const setSelectedItem = (item: any) => { if (item) { searchParams.set("id", String(item.id)); setSearchParams(searchParams); } else { searchParams.delete("id"); setSearchParams(searchParams); } };');
    }
    
    // People section doesn't have a modal, so selectedItem logic isn't tied to any UI. I should add a way to select a person, or just ignore UI and only update setSelectedItem on "WhatsApp" button? Wait, user asked to have unique URL. Let me just bind `onClick={() => setSelectedItem(person)}` to the profile card.
    content = content.replace(/<div\n\s*key=\{person\.id\}/g, '<div\\n        key={person.id}\\n        onClick={() => setSelectedItem(person)}');
  }

  fs.writeFileSync(file, content, 'utf8');
}
