import fs from 'fs';

// 1. DirectorySection.tsx 
// (143,31): error TS2339: Property 'phone' does not exist on type...
// We'll ignore `phone` TS error or fix it if we can find it.
// Actually let's just fix the crash errors first.

let code;

// --- MarketplaceSection.tsx ---
code = fs.readFileSync('src/components/MarketplaceSection.tsx', 'utf8');

if (!code.includes('useSearchParams')) {
   code = code.replace(/import { useNavigate } from ["']react-router-dom["'];?/, 'import { useNavigate, useSearchParams } from "react-router-dom";');
   if (!code.includes('useSearchParams')) {
      code = code.replace(/import React/, 'import { useNavigate, useSearchParams } from "react-router-dom";\nimport React');
   }
}
if (!code.includes('useNavigate,')) {
   if (code.includes('useSearchParams } from "react-router-dom"')) {
      code = code.replace('useSearchParams } from "react-router-dom"', 'useNavigate, useSearchParams } from "react-router-dom"');
   }
}

code = code.replace(/MARKETPLACE/g, 'BUSINESS_LISTINGS');

fs.writeFileSync('src/components/MarketplaceSection.tsx', code);

// --- NewsSection.tsx ---
code = fs.readFileSync('src/components/NewsSection.tsx', 'utf8');

if (!code.includes('useSearchParams')) {
   code = code.replace(/import React/, 'import { useNavigate, useSearchParams } from "react-router-dom";\nimport React');
}

code = code.replace(/NEWS_UPDATES.find/g, 'NEWS.find');
code = code.replace(/NEWS_UPDATES.slice/g, 'NEWS.slice');

fs.writeFileSync('src/components/NewsSection.tsx', code);


// --- PeopleSection.tsx ---
code = fs.readFileSync('src/components/PeopleSection.tsx', 'utf8');

if (!code.includes('useNavigate')) {
   code = code.replace(/import React/, 'import { useNavigate } from "react-router-dom";\nimport React');
}

// Remove the selectedItem logic from Helmet 
if (code.includes('{selectedItem ? (')) {
   code = code.replace(/\{selectedItem \? \([\s\S]*?\) : \(/, '');
   code = code.replace(/<\/[sS]cript>[\s\r\n]*\)}[\s\r\n]*<\/Helmet>/g, '</script>\n      </Helmet>');
}

// Ensure PeopleSection has navigate initialized if missing
if (!code.includes('const navigate = useNavigate();')) {
   code = code.replace('export default function PeopleSection() {', 'export default function PeopleSection() {\n  const navigate = useNavigate();');
}

fs.writeFileSync('src/components/PeopleSection.tsx', code);

// --- MapSection.tsx ---
code = fs.readFileSync('src/components/MapSection.tsx', 'utf8');

if (!code.includes('useNavigate')) {
   code = code.replace(/import React/, 'import { useNavigate } from "react-router-dom";\nimport React');
}
if (!code.includes('const navigate = useNavigate();')) {
   code = code.replace('export default function MapSection() {', 'export default function MapSection() {\n  const navigate = useNavigate();');
}

fs.writeFileSync('src/components/MapSection.tsx', code);

console.log('Fixed missing imports and variables');
