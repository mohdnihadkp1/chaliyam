import fs from 'fs';
import path from 'path';

// 1. Clean Header
let headerPath = './src/components/Header.tsx';
let headerContent = fs.readFileSync(headerPath, 'utf8');

// Remove Moon, Sun
headerContent = headerContent.replace(/Moon,\s*/g, '');
headerContent = headerContent.replace(/Sun,\s*/g, '');

// Remove isDarkMode state
headerContent = headerContent.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(true\);\n/g, '');

// Remove useEffect for dark mode
headerContent = headerContent.replace(/useEffect\(\(\) => \{\n\s*if \(isDarkMode\) \{\n\s*document.documentElement.classList.add\("dark"\);\n\s*\} else \{\n\s*document.documentElement.classList.remove\("dark"\);\n\s*\}\n\s*\}, \[isDarkMode\]\);\n/g, '');
// Handle different formatting if necessary
headerContent = headerContent.replace(/useEffect\(\(\) => \{\s*if \(isDarkMode\) \{\s*document.documentElement.classList.add\("dark"\);\s*\} else \{\s*document.documentElement.classList.remove\("dark"\);\s*\}\s*\}, \[isDarkMode\]\);/g, '');

// Remove dark mode button
// We'll just replace the whole button markup.
headerContent = headerContent.replace(/<button[^>]*onClick=\{\(\) => setIsDarkMode\(!isDarkMode\)\}[^>]*>[\s\S]*?<\/button>/g, '');

fs.writeFileSync(headerPath, headerContent, 'utf8');

// 2. Remove dark: classes from all components
const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Match any dark:classname
  content = content.replace(/dark:[^\s"']+/g, '');

  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed dark classes in ${file}`);
  }
}
