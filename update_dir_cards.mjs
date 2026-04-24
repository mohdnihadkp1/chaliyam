import fs from 'fs';

const dirFile = 'src/components/DirectorySection.tsx';
let content = fs.readFileSync(dirFile, 'utf8');

const regex = /className="bg-\[var\(--color-surface\)\] p-3 md:p-4 rounded-2xl border border-\[var\(--color-outline\)\][^"]*"/g;

const advanced = 'className="bg-white p-3 md:p-4 rounded-[1.25rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 ease-in-out w-full flex items-center justify-between cursor-pointer group relative overflow-hidden"';

content = content.replace(regex, advanced);
fs.writeFileSync(dirFile, content, 'utf8');
