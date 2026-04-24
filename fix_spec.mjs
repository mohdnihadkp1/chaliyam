import fs from 'fs';

const modal = './src/components/FeedbackModal.tsx';
let txt = fs.readFileSync(modal, 'utf8');
txt = txt.replace('correction")] && (', 'correction") && (');
txt = txt.replace('Low (Minor typo/glitch)]</option>', 'Low (Minor typo/glitch)</option>');
fs.writeFileSync(modal, txt, 'utf8');

const footer = './src/components/Footer.tsx';
let txt2 = fs.readFileSync(footer, 'utf8');
txt2 = txt2.replace('Links")]', 'Links")');
txt2 = txt2.replace('Social")]', 'Social")');
txt2 = txt2.replace('Contact")]', 'Contact")');
txt2 = txt2.replace('All rights reserved.")]', 'All rights reserved.")');
// Looking at TS error `src/components/Footer.tsx(229,15): error TS1005: '}' expected.`
// Footer 229: `({ item.name })]`? I'll look specifically.
