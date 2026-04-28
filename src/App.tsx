import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Home from './components/Home';
import MapSection from './components/MapSection';
import SpotsSection from './components/SpotsSection';
import BusSection from './components/BusSection';
import EmergencySection from './components/EmergencySection';
import DirectorySection from './components/DirectorySection';
import NewsSection from './components/NewsSection';
import MarketplaceSection from './components/MarketplaceSection';
import PeopleSection from './components/PeopleSection';
import CalicutStore from './components/CalicutStore';
import Footer from './components/Footer';
import WelcomeDeliveryModal from './components/WelcomeDeliveryModal';
import Cart from './components/Cart';
import OrderPage from './components/OrderPage';
import NotFoundPage from './components/NotFoundPage';

import AddDirectory from './components/AddDirectory';
import AddMarketplace from './components/AddMarketplace';
import AddNews from './components/AddNews';
import AddPeople from './components/AddPeople';
import ReportMap from './components/ReportMap';
import TasksSection from './components/TasksSection';

import { X } from 'lucide-react';
import { useState } from 'react';

const routeSeo = {
  "/": { title: "Chaliyam Connect | Home", desc: "Discover the best of Chaliyam. Local businesses, news, spots, and more." },
  "/map": { title: "Explore Chaliyam Map | Spots & Navigation", desc: "Interactive map of Chaliyam. Find popular spots, businesses, and essential services." },
  "/map/report": { title: "Report Map Issue | Chaliyam Connect", desc: "Help us improve the Chaliyam map by reporting issues or inaccuracies." },
  "/spots": { title: "Popular Spots in Chaliyam | Tourism & Travel", desc: "Explore the most beautiful and popular spots around Chaliyam." },
  "/bus": { title: "Bus Timings | Chaliyam Transport", desc: "Find updated bus timings and routes for Chaliyam and nearby areas." },
  "/emergency": { title: "Emergency Contacts | Chaliyam", desc: "Important emergency contact numbers and resources for Chaliyam residents." },
  "/directory": { title: "Local Business Directory | Chaliyam Connect", desc: "Find local businesses, shops, and services in Chaliyam." },
  "/directory/add": { title: "Add Your Business | Chaliyam Connect", desc: "List your local business in the Chaliyam directory." },
  "/news": { title: "Latest News & Events | Chaliyam", desc: "Stay updated with the latest news, notices, and events in Chaliyam." },
  "/news/add": { title: "Submit News | Chaliyam", desc: "Share local news, events, or notices with the Chaliyam community." },
  "/marketplace": { title: "Marketplace | Buy & Sell in Chaliyam", desc: "Local classifieds. Buy, sell, or rent items in Chaliyam." },
  "/marketplace/add": { title: "Post an Ad | Chaliyam Marketplace", desc: "Post a free classified ad in the Chaliyam marketplace." },
  "/people": { title: "People & Professionals | Chaliyam", desc: "Connect with local professionals, tradespersons, and artists." },
  "/people/add": { title: "Submit Profile | Chaliyam Professionals", desc: "Add your professional profile to the Chaliyam network." },
  "/store": { title: "Calicut Store | Order Online", desc: "Order products online from the Calicut Store and get quick delivery." },
  "/cart": { title: "Your Cart | Calicut Store", desc: "View your shopping cart and checkout." },
  "/tasks": { title: "Tasks | Chaliyam Connect", desc: "Manage your personal tasks securely on your device." },
  "/order": { title: "Track Your Order | Calicut Store", desc: "Track your real-time order status and delivery updates." },
};

function DynamicHelmet() {
  const location = useLocation();
  const routeMeta = routeSeo[location.pathname as keyof typeof routeSeo] || { title: "Chaliyam Connect", desc: "Connecting the local community of Chaliyam." };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chaliyam Connect",
    "url": "https://chaliyam.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chaliyam.vercel.app/directory?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <title>{routeMeta.title}</title>
      <meta name="description" content={routeMeta.desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta property="og:title" content={routeMeta.title} />
      <meta property="og:description" content={routeMeta.desc} />
      <meta property="og:site_name" content="Chaliyam Connect" />
      <meta property="og:url" content={`https://chaliyam.vercel.app${location.pathname}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={routeMeta.title} />
      <meta name="twitter:description" content={routeMeta.desc} />
      <link rel="canonical" href={`https://chaliyam.vercel.app${location.pathname}`} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

export default function App() {
  const [showBottomAd, setShowBottomAd] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (showBottomAd) {
      const timer = setTimeout(() => {
        setShowBottomAd(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showBottomAd]);

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-primary transition-colors duration-300">
      <DynamicHelmet />
      <Header />
      
      <main className="flex-1 pb-nav md:pb-0 relative z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapSection />} />
          <Route path="/map/report" element={<ReportMap />} />
          <Route path="/spots" element={<SpotsSection />} />
          <Route path="/bus" element={<BusSection />} />
          <Route path="/emergency" element={<EmergencySection />} />
          
          <Route path="/directory" element={<DirectorySection />} />
          <Route path="/directory/add" element={<AddDirectory />} />
          
          <Route path="/news" element={<NewsSection />} />
          <Route path="/news/add" element={<AddNews />} />
          
          <Route path="/tasks" element={<TasksSection />} />

          <Route path="/marketplace" element={<MarketplaceSection />} />
          <Route path="/marketplace/add" element={<AddMarketplace />} />
          
          <Route path="/people" element={<PeopleSection />} />
          <Route path="/people/add" element={<AddPeople />} />
          
          <Route path="/store" element={<CalicutStore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {showBottomAd && (
        <div className="fixed bottom-[5.5rem] md:bottom-0 left-0 right-0 z-50 p-3 md:p-5 bg-transparent pointer-events-none flex justify-center pb-safe-bottom" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)' }}>
          <div className="bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl shadow-2xl shadow-emerald-900/20 w-full max-w-sm pointer-events-auto border border-emerald-500/20 overflow-hidden relative group animate-slide-up hover:scale-[1.02] transition-transform duration-300">
            {/* Progress bar for 5s timeout */}
            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full origin-left animate-shrink" />
            
            <div className="p-4 md:p-5 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1 opacity-90">Limited Offer</span>
                <span className="text-sm font-semibold tracking-tight text-white/95">Free Delivery on First Order!</span>
              </div>
              <button 
                onClick={() => setShowBottomAd(false)}
                className="bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white p-2 rounded-full transition-all active:scale-95"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
          </div>
        </div>
      )}

      <Footer />
      <WelcomeDeliveryModal />
    </div>
  );
}