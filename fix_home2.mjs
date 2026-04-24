import fs from 'fs';
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  'Camera,\n} from"lucide-react";',
  'Camera,\n  Star,\n} from "lucide-react";'
);
content = content.replace(
  'Camera,\n} from "lucide-react";',
  'Camera,\n  Star,\n} from "lucide-react";'
);
// just in case
if (!content.includes('Star,')) {
    content = content.replace('Camera,', 'Camera, Star,');
}

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
