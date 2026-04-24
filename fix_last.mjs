import fs from 'fs';

let txt;

// FeedbackModal
const modal = './src/components/FeedbackModal.tsx';
txt = fs.readFileSync(modal, 'utf8');
txt = txt.replace('correction")] && (', 'correction") && (');
txt = txt.replace('glitch)]</option>', 'glitch)</option>');
fs.writeFileSync(modal, txt, 'utf8');

// Footer
const footer = './src/components/Footer.tsx';
txt = fs.readFileSync(footer, 'utf8');
txt = txt.replace('new Date()].getFullYear()', 'new Date().getFullYear()');
fs.writeFileSync(footer, txt, 'utf8');

// NewsSection
const news = './src/components/NewsSection.tsx';
txt = fs.readFileSync(news, 'utf8');
txt = txt.replace(/\(news as any\)]\.eventDate/g, '(news as any).eventDate');
fs.writeFileSync(news, txt, 'utf8');

// PeopleSection
const people = './src/components/PeopleSection.tsx';
txt = fs.readFileSync(people, 'utf8');
txt = txt.replace('person.category === "Service")] && (', 'person.category === "Service") && (');
txt = txt.replace('person.category ==="Service")] && (', 'person.category === "Service") && (');
fs.writeFileSync(people, txt, 'utf8');

