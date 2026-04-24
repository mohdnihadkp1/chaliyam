import fs from 'fs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<\/div>\r?\n\s*\)\)}/g, '</div></React.Fragment>))}');
  content = content.replace(/<\/div>\r?\n\s*\);\r?\n\s*}\)/g, '</div></React.Fragment>);})');
  fs.writeFileSync(filePath, content, 'utf8');
}

['src/components/CalicutStore.tsx', 'src/components/NewsSection.tsx', 'src/components/PeopleSection.tsx', 'src/components/SpotsSection.tsx', 'src/components/BusSection.tsx'].forEach(fixFile);
