import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Backgrounds
  content = content.replace(/bg-slate-900\/?[0-9]*/g, 'bg-[var(--color-surface)]');
  content = content.replace(/bg-slate-800\/?[0-9]*/g, 'bg-[var(--color-surface-variant)]');
  content = content.replace(/bg-white\/5(?!0)/g, 'bg-[var(--color-surface-variant)]');
  content = content.replace(/bg-gray-50/g, 'bg-[var(--color-background)]');
  content = content.replace(/bg-gray-100/g, 'bg-[var(--color-surface-variant)]');
  content = content.replace(/bg-gray-200/g, 'bg-[var(--color-outline)]');
  content = content.replace(/bg-indigo-50/g, 'bg-[var(--color-primary-container)]');
  content = content.replace(/bg-indigo-100/g, 'bg-[var(--color-primary-container)]');
  content = content.replace(/bg-indigo-600/g, 'bg-[var(--color-primary)]');
  content = content.replace(/bg-gold\/20/g, 'bg-[var(--color-primary-container)]');
  content = content.replace(/bg-gold\/10/g, 'bg-[var(--color-primary-container)]');
  content = content.replace(/bg-gold/g, 'bg-[var(--color-primary)]');
  
  // Text colors
  content = content.replace(/text-slate-200/g, 'text-[var(--color-on-surface)]');
  content = content.replace(/text-slate-300/g, 'text-[var(--color-on-surface-variant)]');
  content = content.replace(/text-slate-400/g, 'text-[var(--color-on-surface-variant)]');
  content = content.replace(/text-gray-400/g, 'text-[var(--color-on-surface-variant)]');
  content = content.replace(/text-gray-500/g, 'text-[var(--color-on-surface-variant)]');
  content = content.replace(/text-gray-600/g, 'text-[var(--color-on-surface-variant)]');
  content = content.replace(/text-gray-700/g, 'text-[var(--color-on-surface)]');
  content = content.replace(/text-gold-light/g, 'text-[var(--color-primary)]');
  content = content.replace(/text-gold/g, 'text-[var(--color-primary)]');
  content = content.replace(/text-indigo-600/g, 'text-[var(--color-primary)]');
  content = content.replace(/text-indigo-700/g, 'text-[var(--color-primary)]');

  // Borders
  content = content.replace(/border-white\/10/g, 'border-[var(--color-outline)]');
  content = content.replace(/border-gray-100/g, 'border-[var(--color-outline)]');
  content = content.replace(/border-gray-200/g, 'border-[var(--color-outline)]');
  content = content.replace(/border-gold\/30/g, 'border-[var(--color-primary)]');
  content = content.replace(/border-gold\/50/g, 'border-[var(--color-primary)]');
  content = content.replace(/border-indigo-100/g, 'border-[var(--color-primary)]');
  
  // Specific dark class stripping (dark:text-white -> text-[var(--color-on-surface)])
  content = content.replace(/dark:bg-slate-900/g, '');
  content = content.replace(/dark:bg-slate-800/g, '');
  content = content.replace(/dark:text-white/g, '');
  content = content.replace(/dark:text-slate-[0-9]{3}/g, '');
  content = content.replace(/dark:text-gold-light/g, '');
  content = content.replace(/dark:text-gold/g, '');
  content = content.replace(/dark:border-white\/10/g, '');
  content = content.replace(/dark:border-slate-[0-9]{3}/g, '');
  content = content.replace(/dark:hover:[a-zA-Z0-9-\/\[\]]+/g, '');
  content = content.replace(/dark:focus:[a-zA-Z0-9-\/\[\]]+/g, '');
  content = content.replace(/dark:bg-[a-zA-Z0-9-\/\[\]]+/g, '');
  
  // Emergency specific (red-500 -> danger)
  content = content.replace(/text-red-500/g, 'text-[var(--color-danger)]');
  content = content.replace(/text-red-400/g, 'text-[var(--color-danger)]');
  content = content.replace(/bg-red-500/g, 'bg-[var(--color-danger)]');
  content = content.replace(/bg-red-600/g, 'bg-[var(--color-danger)]');
  content = content.replace(/border-red-500\/[0-9]+/g, 'border-transparent');
  content = content.replace(/border-red-500/g, 'border-[var(--color-danger)]');

  // Clean up any double spaces introduced by removing dark:
  content = content.replace(/\s+/g, ' ');
  content = content.replace(/class=" /g, 'class="');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

processDirectory('./src/components');
