import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { Layers, AlertTriangle, X, Home, Palmtree, Anchor, Waves, ShieldAlert, Ship, Bus, Landmark, Trees, MapPin, Info, Map as MapIcon, Download, Building, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { renderToString } from 'react-dom/server';

let OfflineTileLayer: any = null;

if (typeof window !== 'undefined' && L.TileLayer) {
  OfflineTileLayer = L.TileLayer.extend({
    createTile: function (coords: any, done: any) {
      const tile = document.createElement('img');
      
      L.DomEvent.on(tile, 'load', L.Util.bind(this._tileOnLoad, this, done, tile));
      L.DomEvent.on(tile, 'error', L.Util.bind(this._tileOnError, this, done, tile));

      if (this.options.crossOrigin || this.options.crossOrigin === '') {
        tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
      }

      tile.alt = '';
      tile.setAttribute('role', 'presentation');

      const url = this.getTileUrl(coords);
      
      caches.match(url).then(response => {
        if (response) {
          return response.blob();
        }
        return fetch(url, { mode: 'cors' }).then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.blob();
        });
      }).then(blob => {
        tile.src = URL.createObjectURL(blob);
      }).catch(() => {
        tile.src = url; // fallback
      });

      return tile;
    }
  });
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.MarkerClusterGroup | null>(null);
  const baseLayer = useRef<L.TileLayer | null>(null);
  
  const [showEmergency, setShowEmergency] = useState(true);
  const [showTransport, setShowTransport] = useState(true);
  const [showSpots, setShowSpots] = useState(true);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [reportType, setReportType] = useState('issue');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isOfflineReady, setIsOfflineReady] = useState(false);

  useEffect(() => {
    caches.has('chaliyam-offline-map').then(hasCache => {
      if (hasCache) setIsOfflineReady(true);
    });
  }, []);

  const downloadOfflineMap = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    try {
      const cache = await caches.open('chaliyam-offline-map');
      const urlsToCache: string[] = [];
      const minZoom = 13;
      const maxZoom = 15;
      const bounds = {
        north: 11.2000,
        south: 11.1400,
        east: 75.8600,
        west: 75.7900
      };

      const lon2tile = (lon: number, zoom: number) => (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
      const lat2tile = (lat: number, zoom: number) => (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));

      for (let z = minZoom; z <= maxZoom; z++) {
        const topTile = lat2tile(bounds.north, z);
        const bottomTile = lat2tile(bounds.south, z);
        const leftTile = lon2tile(bounds.west, z);
        const rightTile = lon2tile(bounds.east, z);

        for (let x = leftTile; x <= rightTile; x++) {
          for (let y = topTile; y <= bottomTile; y++) {
            const subdomains = ['a', 'b', 'c'];
            const s = subdomains[(x + y) % 3];
            urlsToCache.push(`https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`);
          }
        }
      }

      let downloaded = 0;
      const total = urlsToCache.length;
      const batchSize = 5;

      for (let i = 0; i < urlsToCache.length; i += batchSize) {
        const batch = urlsToCache.slice(i, i + batchSize);
        await Promise.all(batch.map(async (url) => {
          try {
            const response = await fetch(url, { mode: 'cors' });
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch (e) {
            console.error('Failed to cache tile:', url);
          }
          downloaded++;
          setDownloadProgress(Math.round((downloaded / total) * 100));
        }));
      }
      
      setIsOfflineReady(true);
      setTimeout(() => setShowOfflineModal(false), 2000);
    } catch (error) {
      console.error("Error downloading offline map:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const markers = [
    { lat: 11.1559875, lng: 75.811267, name: "Chaliyam", color: "#2d7a4f", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1534091, lng: 75.8126858, name: "Chaliyam Angadi Area", color: "#2d7a4f", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1577716, lng: 75.8014325, name: "Chaliyam Beach Area", color: "#2d7a4f", icon: <Palmtree size={18} />, type: "spot" },
    { lat: 11.1734548, lng: 75.8352429, name: "Feroke", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1903272, lng: 75.8283545, name: "Cheruvannur", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1547608, lng: 75.8461698, name: "Mannoor Valavu", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1497017, lng: 75.8151679, name: "Kadukka Bazaar", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.185721, lng: 75.8410487, name: "Petta", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.169911, lng: 75.839402, name: "Nallur", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1626645, lng: 75.8355596, name: "Puttekadu", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.1598742, lng: 75.8477525, name: "Kallambara", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    { lat: 11.173585, lng: 75.8040022, name: "Beypore", color: "#c9941a", icon: <Building size={18} />, type: "spot" },
    // Adding some dummy transport and emergency markers to demonstrate the click-to-activate feature
    { lat: 11.1680, lng: 75.8060, name: "Chaliyam Police Station", color: "#c62828", icon: <AlertTriangle size={18} />, type: "emergency" },
    { lat: 11.1690, lng: 75.8020, name: "Chaliyam Junction (Bus Stop)", color: "#1565c0", icon: <Bus size={18} />, type: "transport" },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      // Initialize map with tight bounds to focus only on these areas
      const bounds = L.latLngBounds(
        [11.1400, 75.7900], // SouthWest
        [11.2000, 75.8600]  // NorthEast
      );

      mapInstance.current = L.map(mapRef.current, {
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
        minZoom: 13,
      }).setView([11.1650, 75.8200], 14);
      
      if (OfflineTileLayer) {
        baseLayer.current = new OfflineTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          crossOrigin: true
        }).addTo(mapInstance.current);
      } else {
        baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance.current);
      }

      // Highlight Chaliyam prominently
      L.circle([11.1559875, 75.811267], {
        color: '#c9941a',
        fillColor: '#c9941a',
        fillOpacity: 0.25,
        radius: 1200,
        weight: 3,
        dashArray: '5, 10'
      }).addTo(mapInstance.current).bindPopup('<strong>Chaliyam</strong>');

      markersLayer.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 40
      }).addTo(mapInstance.current);
    }

    if (baseLayer.current && mapInstance.current) {
      const currentUrl = baseLayer.current.getTileUrl({ x: 0, y: 0, z: 0 } as L.Coords);
      const isCurrentlySatellite = currentUrl.includes('ArcGIS');
      
      if (mapType === 'satellite' && !isCurrentlySatellite) {
        mapInstance.current.removeLayer(baseLayer.current);
        if (OfflineTileLayer) {
          baseLayer.current = new OfflineTileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            crossOrigin: true
          }).addTo(mapInstance.current);
        } else {
          baseLayer.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          }).addTo(mapInstance.current);
        }
      } else if (mapType === 'standard' && isCurrentlySatellite) {
        mapInstance.current.removeLayer(baseLayer.current);
        if (OfflineTileLayer) {
          baseLayer.current = new OfflineTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            crossOrigin: true
          }).addTo(mapInstance.current);
        } else {
          baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstance.current);
        }
      }
    }

    if (markersLayer.current) {
      markersLayer.current.clearLayers();

      markers.forEach(m => {
        if (
          (m.type === 'spot' && showSpots) ||
          (m.type === 'emergency' && showEmergency) ||
          (m.type === 'transport' && showTransport)
        ) {
          const iconHtml = renderToString(m.icon);
          const icon = L.divIcon({
            html: `<div style="background:${m.color}; color:white; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.5);">${iconHtml}</div>`,
            iconSize: [38, 38], 
            iconAnchor: [19, 19], 
            className: ''
          });
          
          const popupContent = `
            <div style="text-align: center; min-width: 160px; padding: 4px; font-family: inherit;">
              <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #1a2e20; font-weight: 600;">${m.name}</h4>
              <span style="display: inline-block; margin-bottom: 12px; font-size: 10px; padding: 3px 8px; border-radius: 12px; background-color: ${m.color}20; color: ${m.color}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${m.type}</span>
              <br/>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}" target="_blank" rel="noopener noreferrer" style="display: block; background-color: #2d7a4f; color: white; padding: 8px 12px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500; transition: background-color 0.2s; box-shadow: 0 2px 4px rgba(45,122,79,0.3);">
                Get Directions
              </a>
            </div>
          `;
          
          const marker = L.marker([m.lat, m.lng], { icon }).addTo(markersLayer.current!).bindPopup(popupContent);
          
          marker.on('click', () => {
            if (m.type === 'spot') setShowSpots(true);
            if (m.type === 'emergency') setShowEmergency(true);
            if (m.type === 'transport') setShowTransport(true);
          });
        }
      });
    }

    return () => {
      // Keep map instance alive, just clear layers if needed
    };
  }, [showEmergency, showTransport, showSpots, mapType]);

  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get('location');
    const desc = formData.get('desc');
    
    const message = `*Map Feedback (${reportType === 'issue' ? 'Issue' : 'Landmark'})*\n\n*Location:* ${location}\n*Description:* ${desc}`;
    
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    setIsReportModalOpen(false);
  };

  return (
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-yatra text-[28px] text-green-deep mb-1.5">
            Chaliyam <span className="text-gold">Village Map</span>
          </h2>
          <p className="text-text-light text-sm">
            ചാലിയം ഗ്രാമത്തിന്റെ ഭൂപടം — Explore our beautiful coastal village
          </p>
        </div>
        
        <button 
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium transition-colors border border-red-200 text-sm"
        >
          <AlertTriangle size={16} />
          Report Issue / Suggest Landmark
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Persistent Sidebar Control Panel */}
        <div className="w-full lg:w-72 shrink-0 bg-white dark:bg-[#1a2e20] rounded-2xl p-5 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] h-fit">
          <div className="flex items-center gap-2 text-green-deep dark:text-gold-light font-semibold text-lg mb-4 pb-3 border-b border-green-deep/10 dark:border-gold/10">
            <Layers size={20} />
            Map Layers
          </div>
          
          <div className="flex flex-col gap-3">
            {/* Map Type Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#0f2919] p-1.5 rounded-xl mb-2">
              <button
                onClick={() => setMapType('standard')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${mapType === 'standard' ? 'bg-white dark:bg-[#1a2e20] text-green-deep dark:text-gold-light shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <MapIcon size={16} />
                Standard
              </button>
              <button
                onClick={() => setMapType('satellite')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${mapType === 'satellite' ? 'bg-white dark:bg-[#1a2e20] text-green-deep dark:text-gold-light shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
              >
                <Globe size={16} />
                Satellite
              </button>
            </div>

            {/* Popular Spots Toggle */}
            <div 
              onClick={() => setShowSpots(!showSpots)}
              className={`flex items-center justify-between cursor-pointer p-3 rounded-xl border transition-all duration-200 ${showSpots ? 'bg-[#2d7a4f]/10 border-[#2d7a4f]/30 shadow-sm' : 'bg-gray-50 dark:bg-[#0f2919] border-transparent hover:bg-gray-100 dark:hover:bg-[#153621]'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${showSpots ? 'bg-[#2d7a4f] text-white' : 'bg-gray-200 dark:bg-[#1a2e20] text-gray-500 dark:text-gray-400'}`}>
                  <MapPin size={showSpots ? 20 : 18} className={showSpots ? 'stroke-[2.5px]' : ''} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${showSpots ? 'text-[#2d7a4f] dark:text-[#4caf50]' : 'text-text-dark dark:text-text-light'}`}>Popular Spots</span>
                  <div className="group relative inline-block">
                    <span className="text-[11px] text-text-light flex items-center gap-1 hover:text-green-deep transition-colors">
                      <Info size={12} /> What's this?
                    </span>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-xl z-50">
                      Displays key locations, beaches, and landmarks across the village.
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${showSpots ? 'border-[#2d7a4f] bg-[#2d7a4f]' : 'border-gray-300'}`}>
                {showSpots && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>

            {/* Emergency Contacts Toggle */}
            <div 
              onClick={() => setShowEmergency(!showEmergency)}
              className={`flex items-center justify-between cursor-pointer p-3 rounded-xl border transition-all duration-200 ${showEmergency ? 'bg-[#c62828]/10 border-[#c62828]/30 shadow-sm' : 'bg-gray-50 dark:bg-[#0f2919] border-transparent hover:bg-gray-100 dark:hover:bg-[#153621]'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${showEmergency ? 'bg-[#c62828] text-white' : 'bg-gray-200 dark:bg-[#1a2e20] text-gray-500 dark:text-gray-400'}`}>
                  <ShieldAlert size={showEmergency ? 20 : 18} className={showEmergency ? 'stroke-[2.5px]' : ''} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${showEmergency ? 'text-[#c62828] dark:text-[#ef5350]' : 'text-text-dark dark:text-text-light'}`}>Emergency</span>
                  <div className="group relative inline-block">
                    <span className="text-[11px] text-text-light flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Info size={12} /> What's this?
                    </span>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-xl z-50">
                      Shows police stations, hospitals, and emergency response centers.
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${showEmergency ? 'border-[#c62828] bg-[#c62828]' : 'border-gray-300'}`}>
                {showEmergency && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>

            {/* Transport Hubs Toggle */}
            <div 
              onClick={() => setShowTransport(!showTransport)}
              className={`flex items-center justify-between cursor-pointer p-3 rounded-xl border transition-all duration-200 ${showTransport ? 'bg-[#1565c0]/10 border-[#1565c0]/30 shadow-sm' : 'bg-gray-50 dark:bg-[#0f2919] border-transparent hover:bg-gray-100 dark:hover:bg-[#153621]'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${showTransport ? 'bg-[#1565c0] text-white' : 'bg-gray-200 dark:bg-[#1a2e20] text-gray-500 dark:text-gray-400'}`}>
                  <Bus size={showTransport ? 20 : 18} className={showTransport ? 'stroke-[2.5px]' : ''} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${showTransport ? 'text-[#1565c0] dark:text-[#42a5f5]' : 'text-text-dark dark:text-text-light'}`}>Transport Hubs</span>
                  <div className="group relative inline-block">
                    <span className="text-[11px] text-text-light flex items-center gap-1 hover:text-blue-500 transition-colors">
                      <Info size={12} /> What's this?
                    </span>
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-xl z-50">
                      Highlights bus stops, boat jetties, and major transit points.
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${showTransport ? 'border-[#1565c0] bg-[#1565c0]' : 'border-gray-300'}`}>
                {showTransport && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-green-deep/10 dark:border-gold/10">
            <button 
              onClick={() => setShowOfflineModal(true)}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl transition-colors font-medium text-sm border mb-3 ${isOfflineReady ? 'bg-green-600 hover:bg-green-700 text-white border-green-700' : 'bg-green-50 hover:bg-green-100 dark:bg-[#0f2919] dark:hover:bg-[#153621] text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30'}`}
            >
              {isOfflineReady ? <CheckCircle2 size={16} /> : <Download size={16} />}
              {isOfflineReady ? 'Offline Map Ready' : 'Download Offline Map'}
            </button>
            <p className="text-xs text-text-light leading-relaxed">
              The map is restricted to Chaliyam and surrounding key areas. Chaliyam is highlighted with a golden circle.
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-white dark:bg-[#1a2e20] rounded-2xl p-2 border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)]">
          <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden z-0">
            <div ref={mapRef} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2e20] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-green-deep/10 dark:border-gold/10">
              <h3 className="font-semibold text-lg text-text-dark dark:text-white flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                Map Feedback
              </h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-text-light hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-5">
              <div className="flex gap-2 mb-4">
                <button 
                  type="button"
                  onClick={() => setReportType('issue')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${reportType === 'issue' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-100 text-gray-600 dark:bg-[#0f2919] dark:text-gray-400'}`}
                >
                  Report Issue
                </button>
                <button 
                  type="button"
                  onClick={() => setReportType('landmark')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${reportType === 'landmark' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 dark:bg-[#0f2919] dark:text-gray-400'}`}
                >
                  Suggest Landmark
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Location Details</label>
                  <input name="location" required type="text" placeholder="e.g., Near Chaliyam Beach" className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2919] text-text-dark dark:text-white outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark dark:text-text-light mb-1">Description</label>
                  <textarea name="desc" required rows={4} placeholder={reportType === 'issue' ? "Describe the map issue..." : "Describe the landmark..."} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f2919] text-text-dark dark:text-white outline-none focus:border-green-500 resize-none"></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-green-deep hover:bg-green-mid text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  Submit via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offline Map Modal */}
      {showOfflineModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2e20] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-green-deep/10 dark:border-gold/10">
              <h3 className="font-semibold text-lg text-text-dark dark:text-white flex items-center gap-2">
                <Download size={20} className="text-green-deep dark:text-gold-light" />
                Offline Maps
              </h3>
              <button onClick={() => setShowOfflineModal(false)} className="text-text-light hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              {isOfflineReady && !isDownloading ? (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-xl mb-4 text-sm leading-relaxed flex items-start gap-3">
                  <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold mb-1">Map is available offline!</p>
                    <p>You can now view the Chaliyam area map even without an internet connection.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl mb-4 text-sm leading-relaxed">
                    <p className="mb-2"><strong>Download Map for Offline Use</strong></p>
                    <p>This will save the map tiles for the Chaliyam area to your device, allowing you to navigate the village without an active internet connection.</p>
                  </div>
                  
                  {isDownloading ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1 text-text-dark dark:text-white">
                        <span>Downloading...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${downloadProgress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={downloadOfflineMap}
                      className="w-full bg-green-deep hover:bg-green-mid text-white py-2.5 rounded-lg font-medium transition-colors mb-3 flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      Start Download
                    </button>
                  )}
                </>
              )}
              
              <button 
                onClick={() => setShowOfflineModal(false)}
                disabled={isDownloading}
                className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-[#0f2919] dark:hover:bg-[#153621] text-text-dark dark:text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
