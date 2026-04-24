import fs from 'fs';

function fixFileEnd(filePath, endMatch, replaceWith) {
   let content = fs.readFileSync(filePath, 'utf8');
   content = content.replace(endMatch, replaceWith);
   fs.writeFileSync(filePath, content, 'utf8');
}

fixFileEnd('src/components/CalicutStore.tsx', /<\/div>\r?\n\s*\)\)}\r?\n\s*<\/div>/, '</div></React.Fragment>))}</div\n>');
fixFileEnd('src/components/NewsSection.tsx', /<\/div>\r?\n\s*\);\r?\n\s*}\)\)\r?\n\s*:\s*\(/, '</div></React.Fragment>);}) : (');
fixFileEnd('src/components/PeopleSection.tsx', /<\/div>\r?\n\s*\)\)}\r?\n\s*<\/div>/, '</div></React.Fragment>))}</div\n>');
fixFileEnd('src/components/SpotsSection.tsx', /<\/div>\r?\n\s*\)\)}\r?\n\s*<\/div>/, '</div></React.Fragment>))}</div\n>');

