import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import MapSection from './components/MapSection';
import SpotsSection from './components/SpotsSection';
import BusSection from './components/BusSection';
import EmergencySection from './components/EmergencySection';
import DirectorySection from './components/DirectorySection';
import NewsSection from './components/NewsSection';
import BusinessSection from './components/BusinessSection';
import PeopleSection from './components/PeopleSection';
import CalicutStore from './components/CalicutStore';
import Footer from './components/Footer';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col antialiased selection:bg-gold/30 selection:text-gold-light transition-colors duration-300 bg-slate-950 text-slate-200">
      <Header />
      
      <main className="flex-1 pb-4 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapSection />} />
          <Route path="/spots" element={<SpotsSection />} />
          <Route path="/bus" element={<BusSection />} />
          <Route path="/emergency" element={<EmergencySection />} />
          <Route path="/directory" element={<DirectorySection />} />
          <Route path="/news" element={<NewsSection />} />
          <Route path="/business" element={<BusinessSection />} />
          <Route path="/people" element={<PeopleSection />} />
          <Route path="/store" element={<CalicutStore />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
