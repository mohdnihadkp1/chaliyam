import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  /  ShoppingBag,\n  ClipboardList,\n  Truck,\n} from "lucide-react";/,
  '} from "lucide-react";'
)

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
