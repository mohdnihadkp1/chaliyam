import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const promoAdsArr = `
const promoAds = [
  {
    id: 1,
    title: "Calicut Store",
    subtitle: "Fast & Fresh",
    desc: "Premium Local Products Delivered to Your Door",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=80",
    path: "/marketplace",
  },
  {
    id: 2,
    title: "Monsoon Sale - Electronics",
    subtitle: "Limited Time Offer",
    desc: "Up to 50% off on all home appliances.",
    cta: "View Offers",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 3,
    title: "Chaliyam Football Fest",
    subtitle: "Sports Event",
    desc: "Join the biggest local tournament this weekend.",
    cta: "Join Now",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    path: "/news",
  },
  {
    id: 4,
    title: "New Bakery Opened",
    subtitle: "Grand Opening",
    desc: "Freshly baked goods every morning.",
    cta: "Visit",
    image: "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 5,
    title: "Weekend Seafood Market",
    subtitle: "Fresh Catch",
    desc: "Straight from the harbor to your plate.",
    cta: "Explore",
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1200&q=80",
    path: "/marketplace",
  },
  {
    id: 6,
    title: "Tech Gadgets Expo",
    subtitle: "Gadgets & More",
    desc: "Discover the latest tech in town.",
    cta: "See More",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
    path: "/directory",
  },
  {
    id: 7,
    title: "Local Art Exhibition",
    subtitle: "Arts & Culture",
    desc: "Support local artists at the town square.",
    cta: "Get Directions",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
    path: "/spots",
  },
  {
    id: 8,
    title: "Medical Camp 2024",
    subtitle: "Health & Wellness",
    desc: "Free checkups for everyone this Sunday.",
    cta: "Details",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&w=1200&q=80",
    path: "/news",
  },
];
`;

content = content.replace(/export default function Home\(\) {/, promoAdsArr + '\nexport default function Home() {\n  const [currentAdIndex, setCurrentAdIndex] = useState(0);\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setCurrentAdIndex((prev) => (prev + 1) % promoAds.length);\n    }, 5000);\n    return () => clearInterval(timer);\n  }, []);\n');

const bannerContentRegex = /{\/\* Calicut Store Banner \*\/}[\s\S]*?(?={\/\* Home Delivery Guide Section \*\/})/;

const newCarouselJSX = `
      {/* Promo Carousel (Top Slot) */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 -mt-6 relative z-20 mb-6">
        <div className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden shadow-lg border border-[var(--color-outline)] cursor-pointer active:scale-[0.98] transition-transform duration-300">
          {promoAds.map((ad, index) => (
            <div 
              key={ad.id} 
              onClick={() => navigate(ad.path)}
              className={\`absolute inset-0 transition-opacity duration-1000 ease-in-out \${index === currentAdIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}\`}
            >
              <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent flex flex-col justify-center p-6 md:p-8">
                <span className="text-emerald-400 font-bold text-xs tracking-wider uppercase mb-1 drop-shadow-sm">{ad.subtitle}</span>
                <h2 className="text-white font-extrabold text-2xl md:text-3xl mb-1 tracking-tight drop-shadow-md">{ad.title}</h2>
                <p className="text-slate-200 text-sm md:text-base font-medium mb-4 max-w-[200px] md:max-w-xs drop-shadow">{ad.desc}</p>
                <div className="bg-[var(--color-primary)] hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-full w-max shadow-md shadow-indigo-600/30 transition-all active:scale-95">
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
content = content.replace(bannerContentRegex, newCarouselJSX + "\n      ");

fs.writeFileSync('src/components/Home.tsx', content, 'utf8');
