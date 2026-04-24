import fs from 'fs';
let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Imports
content = content.replace(/Camera,\n} from "lucide-react";/g, 'Camera,\n  Star,\n} from "lucide-react";');

// Data
const adsData = `

const promoAds = [
  {
    id: 1,
    title: "New Supermarket in Town!",
    cta: "Get 50% Off",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Monsoon Sale - Electronics",
    cta: "View Offers",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Chaliyam Football Fest",
    cta: "Join Now",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  },
];
`;
content = content.replace(/export default function Home\(\) {/, adsData + '\nexport default function Home() {\n  const [currentAdIndex, setCurrentAdIndex] = useState(0);\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setCurrentAdIndex((prev) => (prev + 1) % promoAds.length);\n    }, 5000);\n    return () => clearInterval(timer);\n  }, []);\n');

// Secondary Actions
const secActions = `const secondaryActions = [
    { id: "news", path: "/news", label: "News & Events", icon: Newspaper, tag: null },
    { id: "people", path: "/people", label: "Special Persons", icon: Users, tag: null },
    { id: "spots", path: "/spots", label: "Popular Spots", icon: Camera, tag: null },
    { id: "promo", path: "/marketplace", label: "Local Deals", icon: Star, tag: "Featured", customColor: "bg-amber-50 text-amber-600" },
  ];`;
content = content.replace(/const secondaryActions = \[[\s\S]*?\];/, secActions);

// Secondary Actions render block
content = content.replace(/<div className="grid grid-cols-3 gap-3">/g, '<div className="grid grid-cols-2 md:grid-cols-4 gap-3">');

const sliderJSX = `
      {/* Promo Carousel (Top Slot) */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-6 relative z-20 mb-6">
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg border border-[var(--color-outline)] cursor-pointer active:scale-[0.98] transition-transform duration-300">
          {promoAds.map((ad, index) => (
            <div 
              key={ad.id} 
              className={\`absolute inset-0 transition-opacity duration-1000 ease-in-out \${index === currentAdIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}\`}
            >
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-white font-extrabold text-xl md:text-2xl mb-2 tracking-tight">{ad.title}</h3>
                <div className="bg-white text-[var(--color-on-surface)] font-bold text-xs md:text-sm px-5 py-2 rounded-full w-max shadow-md">
                  {ad.cta}
                </div>
              </div>
            </div>
          ))}
          {/* Indicators */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
            {promoAds.map((_, index) => (
              <div key={index} className={\`h-1.5 rounded-full transition-all duration-300 \${index === currentAdIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}\`} />
            ))}
          </div>
        </div>
      </div>
`;
content = content.replace(/{\/\* Grid Menu \(Primary\)\] \*\/}/, sliderJSX + '\n      {/* Grid Menu (Primary)] */}');

content = content.replace(
  /<div className="font-semibold text-xs text-\[var\(--color-on-surface\)\] text-center leading-tight">\s*{action\.label}\s*<\/div>/g,
  `<div className="font-semibold text-xs text-[var(--color-on-surface)] text-center leading-tight">
                {action.label}
              </div>
              {action.tag && (
                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                  {action.tag}
                </div>
              )}`
);

content = content.replace(
  /<div className="text-\[var\(--color-on-surface-variant\)\] p-2">/g,
  `<div className={\`p-2 rounded-xl \${action.customColor || 'text-[var(--color-on-surface-variant)]'}\`}>`
);

content = content.replace(
  /className="bg-\[var\(--color-surface\)\] border border-\[var\(--color-outline\)\] rounded-2xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-\[var\(--color-surface-variant\)\] transition-colors active:scale-95"/g,
  'className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[var(--color-surface-variant)] transition-colors active:scale-95 relative"'
);

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
