import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from"react";
import L from"leaflet";
import"leaflet/dist/leaflet.css";
import"leaflet.markercluster";
import"leaflet.markercluster/dist/MarkerCluster.css";
import"leaflet.markercluster/dist/MarkerCluster.Default.css";
import {
 Layers,
 AlertTriangle,
 X,
 Home,
 Palmtree,
 Anchor,
 Waves,
 ShieldAlert,
 Ship,
 Bus,
 Landmark,
 Trees,
 MapPin,
 Info,
 Map as MapIcon,
 Download,
 Building,
 Globe,
 CheckCircle2,
 Loader2,
 Navigation,
} from"lucide-react";
import { renderToString } from"react-dom/server";
import { ShareModal } from './ShareModal';
import { advancedShare } from '../lib/shareUtils';
let OfflineTileLayer: any = null;
if (typeof window !=="undefined" && L.TileLayer) {
 OfflineTileLayer = L.TileLayer.extend({
 createTile: function (coords: any, done: any) {
 const tile = document.createElement("img");
 L.DomEvent.on(
 tile,
"load",
 L.Util.bind(this._tileOnLoad, this, done, tile),
 );
 L.DomEvent.on(
 tile,
"error",
 L.Util.bind(this._tileOnError, this, done, tile),
 );
 if (this.options.crossOrigin || this.options.crossOrigin ==="") {
 tile.crossOrigin =
 this.options.crossOrigin === true ?"" : this.options.crossOrigin;
 }
 tile.alt ="";
 tile.setAttribute("role","presentation");
 const url = this.getTileUrl(coords);
 caches
 .match(url)
 .then((response) => {
 if (response) {
 return response.blob();
 }
 return fetch(url, { mode:"cors" }).then((res) => {
 if (!res.ok) throw new Error("Network response was not ok");
 return res.blob();
 });
 })
 .then((blob) => {
 tile.src = URL.createObjectURL(blob);
 })
 .catch(() => {
 tile.src = url; /* fallback */
 });
 return tile;
 },
 });
}
export default function MapSection() {
  const navigate = useNavigate();
 const mapRef = useRef<HTMLDivElement>(null);
 const mapInstance = useRef<L.Map | null>(null);
 const markersLayer = useRef<L.MarkerClusterGroup | null>(null);
 const baseLayer = useRef<L.TileLayer | null>(null);
 const [showEmergency, setShowEmergency] = useState(true);
 const [showTransport, setShowTransport] = useState(true);
 const [showSpots, setShowSpots] = useState(true);
 const [mapType, setMapType] = useState<"standard" |"satellite">("standard");
 const [isReportModalOpen, setIsReportModalOpen] = useState(false);
 const [showOfflineModal, setShowOfflineModal] = useState(false);
 const [reportType, setReportType] = useState("issue");
 const [isDownloading, setIsDownloading] = useState(false);
 const [downloadProgress, setDownloadProgress] = useState(0);
 const [isOfflineReady, setIsOfflineReady] = useState(false);
 const centerOnUserLocation = () => {
 if (!mapInstance.current) return;
 if ("geolocation" in navigator) {
 navigator.geolocation.getCurrentPosition(
 (position) => {
 const { latitude, longitude } = position.coords;
 mapInstance.current?.setView([latitude, longitude], 15);
 L.circleMarker([latitude, longitude], {
 radius: 8,
 fillColor:"#3b82f6",
 color:"#ffffff",
 weight: 2,
 opacity: 1,
 fillOpacity: 1,
 }).addTo(mapInstance.current!);
 },
 (error) => {
 console.error("Error getting location:", error);
 alert("Unable to retrieve your location.");
 },
 );
 } else {
 alert("Geolocation is not supported by your browser.");
 }
 };
 useEffect(() => {
 caches.has("chaliyam-offline-map").then((hasCache) => {
 if (hasCache) setIsOfflineReady(true);
 });
 }, []);
 const downloadOfflineMap = async () => {
 setIsDownloading(true);
 setDownloadProgress(0);
 try {
 const cache = await caches.open("chaliyam-offline-map");
 const urlsToCache: string[] = [];
 const minZoom = 13;
 const maxZoom = 15;
 const bounds = { north: 11.2, south: 11.14, east: 75.86, west: 75.79 };
 const lon2tile = (lon: number, zoom: number) =>
 Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
 const lat2tile = (lat: number, zoom: number) =>
 Math.floor(
 ((1 -
 Math.log(
 Math.tan((lat * Math.PI) / 180) +
 1 / Math.cos((lat * Math.PI) / 180),
 ) /
 Math.PI) /
 2) *
 Math.pow(2, zoom),
 );
 for (let z = minZoom; z <= maxZoom; z++) {
 const topTile = lat2tile(bounds.north, z);
 const bottomTile = lat2tile(bounds.south, z);
 const leftTile = lon2tile(bounds.west, z);
 const rightTile = lon2tile(bounds.east, z);
 for (let x = leftTile; x <= rightTile; x++) {
 for (let y = topTile; y <= bottomTile; y++) {
 const subdomains = ["a","b","c"];
 const s = subdomains[(x + y) % 3];
 urlsToCache.push(
 `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`,
 );
 }
 }
 }
 let downloaded = 0;
 const total = urlsToCache.length;
 const batchSize = 5;
 for (let i = 0; i < urlsToCache.length; i += batchSize) {
 const batch = urlsToCache.slice(i, i + batchSize);
 await Promise.all(
 batch.map(async (url) => {
 try {
 const response = await fetch(url, { mode:"cors" });
 if (response.ok) {
 await cache.put(url, response);
 }
 } catch (e) {
 console.error("Failed to cache tile:", url);
 }
 downloaded++;
 setDownloadProgress(Math.round((downloaded / total) * 100));
 }),
 );
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
 {
 lat: 11.1559875,
 lng: 75.811267,
 name:"Chaliyam",
 color:"#2d7a4f",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1534091,
 lng: 75.8126858,
 name:"Chaliyam Angadi Area",
 color:"#2d7a4f",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1577716,
 lng: 75.8014325,
 name:"Chaliyam Beach Area",
 color:"#2d7a4f",
 icon: <Palmtree size={18} />,
 type:"spot",
 },
 {
 lat: 11.1734548,
 lng: 75.8352429,
 name:"Feroke",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1903272,
 lng: 75.8283545,
 name:"Cheruvannur",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1547608,
 lng: 75.8461698,
 name:"Mannoor Valavu",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1497017,
 lng: 75.8151679,
 name:"Kadukka Bazaar",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.185721,
 lng: 75.8410487,
 name:"Petta",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.169911,
 lng: 75.839402,
 name:"Nallur",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1626645,
 lng: 75.8355596,
 name:"Puttekadu",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.1598742,
 lng: 75.8477525,
 name:"Kallambara",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 {
 lat: 11.173585,
 lng: 75.8040022,
 name:"Beypore",
 color:"#c9941a",
 icon: <Building size={18} />,
 type:"spot",
 },
 /* Adding some dummy transport and emergency markers to demonstrate the click-to-activate feature */ {
 lat: 11.168,
 lng: 75.806,
 name:"Chaliyam Police Station",
 color:"#c62828",
 icon: <AlertTriangle size={18} />,
 type:"emergency",
 },
 {
 lat: 11.169,
 lng: 75.802,
 name:"Chaliyam Junction (Bus Stop)",
 color:"#1565c0",
 icon: <Bus size={18} />,
 type:"transport",
 },
 ];
 useEffect(() => {
 if (!mapRef.current) return;
 if (!mapInstance.current) {
 /* Initialize map with tight bounds to focus only on these areas */ const bounds =
 L.latLngBounds(
 [11.14, 75.79],
 /* SouthWest */ [11.2, 75.86] /* NorthEast */,
 );
 mapInstance.current = L.map(mapRef.current, {
 maxBounds: bounds,
 maxBoundsViscosity: 1.0,
 minZoom: 13,
 }).setView([11.165, 75.82], 14);
 if (OfflineTileLayer) {
 baseLayer.current = new OfflineTileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
 { attribution:"© OpenStreetMap contributors", crossOrigin: true },
 ).addTo(mapInstance.current);
 } else {
 baseLayer.current = L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
 { attribution:"© OpenStreetMap contributors" },
 ).addTo(mapInstance.current);
 }
 /* Highlight Chaliyam prominently */ L.circle([11.1559875, 75.811267], {
 color:"#c9941a",
 fillColor:"#c9941a",
 fillOpacity: 0.25,
 radius: 1200,
 weight: 3,
 dashArray:"5, 10",
 })
 .addTo(mapInstance.current)
 .bindPopup("<strong>Chaliyam</strong>");
 markersLayer.current = L.markerClusterGroup({
 showCoverageOnHover: false,
 maxClusterRadius: 40,
 }).addTo(mapInstance.current);
 }
 if (baseLayer.current && mapInstance.current) {
 const currentUrl = baseLayer.current.getTileUrl({
 x: 0,
 y: 0,
 z: 0,
 } as L.Coords);
 const isCurrentlySatellite = currentUrl.includes("ArcGIS");
 if (mapType ==="satellite" && !isCurrentlySatellite) {
 mapInstance.current.removeLayer(baseLayer.current);
 if (OfflineTileLayer) {
 baseLayer.current = new OfflineTileLayer(
"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
 {
 attribution:
"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
 crossOrigin: true,
 },
 ).addTo(mapInstance.current);
 } else {
 baseLayer.current = L.tileLayer(
"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
 {
 attribution:
"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
 },
 ).addTo(mapInstance.current);
 }
 } else if (mapType ==="standard" && isCurrentlySatellite) {
 mapInstance.current.removeLayer(baseLayer.current);
 if (OfflineTileLayer) {
 baseLayer.current = new OfflineTileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
 { attribution:"© OpenStreetMap contributors", crossOrigin: true },
 ).addTo(mapInstance.current);
 } else {
 baseLayer.current = L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
 { attribution:"© OpenStreetMap contributors" },
 ).addTo(mapInstance.current);
 }
 }
 }
 if (markersLayer.current) {
 markersLayer.current.clearLayers();
 markers.forEach((m) => {
 if (
 (m.type === "spot" && showSpots) ||
 (m.type === "emergency" && showEmergency) ||
 (m.type === "transport" && showTransport)
 ) {
 const iconHtml = renderToString(m.icon);
 const icon = L.divIcon({
 html: `<div style="background:${m.color}; color:white; border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; border:3px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.5);">${iconHtml}</div>`,
 iconSize: [38, 38],
 iconAnchor: [19, 19],
 className: "",
 });
 const popupContent = ` <div style="text-align: center; min-width: 160px; padding: 4px; font-family: inherit;"> <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #1a2e20; font-weight: 600;">${m.name}</h4> <span style="display: inline-block; margin-bottom: 12px; font-size: 10px; padding: 3px 8px; border-radius: 12px; background-color: ${m.color}20; color: ${m.color}; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${m.type}</span> <br/> <button id="share-marker-btn" data-lat="${m.lat}" data-lng="${m.lng}" data-name="${m.name}" data-type="${m.type}" style="display: block; width: 100%; margin-bottom: 8px; background-color: #f8fafc; color: #475569; padding: 8px 12px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600; transition: background-color 0.2s; border: 1px solid #e2e8f0; cursor: pointer;"> Share Location </button> <a href="https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}" target="_blank" rel="noopener noreferrer" style="display: block; background-color: #2d7a4f; color: white; padding: 8px 12px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 500; transition: background-color 0.2s; box-shadow: 0 2px 4px rgba(45,122,79,0.3);"> Get Directions </a> <a href="https://wa.me/919846750898?text=${encodeURIComponent('*Suggest Edit/Report Issue for ' + m.name + '*\n\nI would like to suggest changes:\n\nPlease describe the changes below:\n\n')}" target="_blank" rel="noopener noreferrer" style="display: block; width: 100%; margin-top: 10px; color: #64748b; font-size: 11px; text-decoration: none; font-weight: 500;"> Report Issue </a> </div> `;
 const marker = L.marker([m.lat, m.lng], { icon })
 .addTo(markersLayer.current!)
 .bindPopup(popupContent);
 marker.on("click", () => {
 if (m.type === "spot") setShowSpots(true);
 if (m.type === "emergency") setShowEmergency(true);
 if (m.type === "transport") setShowTransport(true);
 });
 }
 });
 if (markersLayer.current) {
 const bounds = markersLayer.current.getBounds();
 if (bounds.isValid() && mapInstance.current) {
 mapInstance.current.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, maxZoom: 16 });
 }
 }
 }
 if (mapInstance.current) {
    mapInstance.current.off('popupopen');
    mapInstance.current.on('popupopen', (e: any) => {
      const shareBtn = e.popup._contentNode?.querySelector('#share-marker-btn');
      if (shareBtn) {
        shareBtn.onclick = () => {
          const lat = shareBtn.getAttribute('data-lat');
          const lng = shareBtn.getAttribute('data-lng');
          const name = shareBtn.getAttribute('data-name');
          const type = shareBtn.getAttribute('data-type');
          if (lat && lng && name) {
             const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
             doShare({
                title: `${name} on Chaliyam Connect`,
                text: `Location: ${name} (${type})\nCheck it out here:`,
                url: mapsUrl
             });
          }
        };
      }
    });
  }
 return () => {
 /* Keep map instance alive, just clear layers if needed */
 };
 }, [showEmergency, showTransport, showSpots, mapType]);
 const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault();
 const formData = new FormData(e.currentTarget);
 const location = formData.get("location");
 const desc = formData.get("desc");
 const message = `*Map Feedback (${reportType ==="issue" ?"Issue" :"Landmark"})*\n\n*Location:* ${location}\n*Description:* ${desc}`;
 window.open(
 `https://wa.me/919846750898?text=${encodeURIComponent(message)}`,
"_blank",
 );
 setIsReportModalOpen(false);
 };
 return (
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 {""}
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-4 md:mb-6">
 {""}
 <div>
 {""}
 <h2 className="font-yatra text-xl md:text-[28px] text-black mb-1 md:mb-1.5">
 {""}
 Chaliyam{""}
 <span className="text-[var(--color-primary)] ml-2">
 Village Map
 </span>{""}
 </h2>{""}
 <p className="text-[var(--color-on-surface-variant)] text-xs md:text-sm">
 {""}
 ചാലിയം ഗ്രാമത്തിന്റെ ഭൂപടം — Explore our beautiful coastal
 village{""}
 </p>{""}
 </div>{""}
 <button
 onClick={() => navigate('/map/report')}
 className="flex items-center justify-center gap-1.5 md:gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold transition-all border border-red-200 text-xs md:text-sm active:scale-95 shadow-[0_2px_10px_rgba(239,68,68,0.1)] hover:shadow-[0_4px_15px_rgba(239,68,68,0.15)]"
 >
 {""}
 <AlertTriangle size={14} className="md:w-4 md:h-4" /> Report Issue /
 Suggest Landmark{""}
 </button>{""}
 </div>{""}
 <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-6">
 {""}
 {/* Persistent Sidebar Control Panel */}{""}
 <div className="w-full lg:w-72 shrink-0 bg-[var(--color-surface-variant)] rounded-xl md:rounded-2xl p-3 md:p-5 border border-[var(--color-outline)] shadow-[0_4px_24px_rgba(0,0,0,0.2 h-fit backdrop-blur-md">
 {""}
 <div className="flex items-center justify-between text-[var(--color-primary)] font-semibold text-sm md:text-lg mb-2 md:mb-4 pb-2 md:pb-3 border-b border-[var(--color-outline)]">
 {""}
 <div className="flex items-center gap-2">
 {""}
 <Layers size={16} className="md:w-5 md:h-5" /> Map Layers{""}
 </div>{""}
 </div>{""}
 <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3">
 {""}
 {/* Map Type Toggle */}{""}
 <div className="col-span-2 lg:col-span-1 flex items-center gap-1.5 md:gap-2 bg-[var(--color-surface)] p-1 md:p-1.5 rounded-lg md:rounded-xl mb-1 border border-white/5 shadow-inner">
 {""}
 <button
 onClick={() => setMapType("standard")}
 className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-1.5 md:py-2 rounded md:rounded-lg text-xs md:text-sm font-medium transition-colors ${mapType ==="standard" ?"bg-white/10 text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]" :"text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
 >
 {""}
 <MapIcon size={14} className="md:w-4 md:h-4" /> Standard{""}
 </button>{""}
 <button
 onClick={() => setMapType("satellite")}
 className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-1.5 md:py-2 rounded md:rounded-lg text-xs md:text-sm font-medium transition-colors ${mapType ==="satellite" ?"bg-white/10 text-[var(--color-primary)] shadow-sm border border-[var(--color-outline)]" :"text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"}`}
 >
 {""}
 <Globe size={14} className="md:w-4 md:h-4" /> Satellite{""}
 </button>{""}
 </div>{""}
 {/* Popular Spots Toggle */}{""}
 <div
 onClick={() => setShowSpots(!showSpots)}
 className={`flex items-center justify-between cursor-pointer p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-200 ${showSpots ?"bg-[var(--color-primary-container)] border-[var(--color-primary)] shadow-[0_0_15px_rgba(201,148,26,0.1" :"bg-[var(--color-surface-variant)] border-[var(--color-outline)] hover:bg-white/10"}`}
 >
 {""}
 <div className="flex items-center gap-2 md:gap-3">
 {""}
 <div
 className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${showSpots ?"bg-[var(--color-primary)] text-slate-900" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-white/5"}`}
 >
 {""}
 <MapPin
 size={showSpots ? 16 : 14}
 className={
 showSpots
 ?"stroke-[2.5px] md:w-5 md:h-5"
 :"md:w-[18px] md:h-[18px]"
 }
 />{""}
 </div>{""}
 <div className="flex flex-col">
 {""}
 <span
 className={`text-xs md:text-sm font-semibold ${showSpots ?"text-[var(--color-primary)]" :"text-[var(--color-on-surface-variant)]"}`}
 >
 Spots
 </span>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 {/* Emergency Contacts Toggle */}{""}
 <div
 onClick={() => setShowEmergency(!showEmergency)}
 className={`flex items-center justify-between cursor-pointer p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-200 ${showEmergency ?"bg-[var(--color-danger)]/10 border-transparent shadow-[0_0_15px_rgba(239,68,68,0.1" :"bg-[var(--color-surface-variant)] border-[var(--color-outline)] hover:bg-white/10"}`}
 >
 {""}
 <div className="flex items-center gap-2 md:gap-3">
 {""}
 <div
 className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${showEmergency ?"bg-[var(--color-danger)] text-white" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-white/5"}`}
 >
 {""}
 <ShieldAlert
 size={showEmergency ? 16 : 14}
 className={
 showEmergency
 ?"stroke-[2.5px] md:w-5 md:h-5"
 :"md:w-[18px] md:h-[18px]"
 }
 />{""}
 </div>{""}
 <div className="flex flex-col">
 {""}
 <span
 className={`text-xs md:text-sm font-semibold ${showEmergency ?"text-[var(--color-danger)]" :"text-[var(--color-on-surface-variant)]"}`}
 >
 Emergency
 </span>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 {/* Transport Hubs Toggle */}{""}
 <div
 onClick={() => setShowTransport(!showTransport)}
 className={`flex items-center justify-between cursor-pointer p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-200 col-span-2 lg:col-span-1 ${showTransport ?"bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1" :"bg-[var(--color-surface-variant)] border-[var(--color-outline)] hover:bg-white/10"}`}
 >
 {""}
 <div className="flex items-center gap-2 md:gap-3">
 {""}
 <div
 className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors ${showTransport ?"bg-blue-500 text-white" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-white/5"}`}
 >
 {""}
 <Bus
 size={showTransport ? 16 : 14}
 className={
 showTransport
 ?"stroke-[2.5px] md:w-5 md:h-5"
 :"md:w-[18px] md:h-[18px]"
 }
 />{""}
 </div>{""}
 <div className="flex flex-col">
 {""}
 <span
 className={`text-xs md:text-sm font-semibold ${showTransport ?"text-blue-400" :"text-[var(--color-on-surface-variant)]"}`}
 >
 Transport Hubs
 </span>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 <div className="mt-3 md:mt-6 pt-3 md:pt-4 border-t border-[var(--color-outline)]">
 {""}
 <button
 onClick={() => setShowOfflineModal(true)}
 className={`w-full flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-colors font-medium text-xs md:text-sm border mb-2 md:mb-3 ${isOfflineReady ?"bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/40" :"bg-[var(--color-surface-variant)] hover:bg-white/10 text-[var(--color-on-surface-variant)] border-[var(--color-outline)]"}`}
 >
 {""}
 {isOfflineReady ? (
 <CheckCircle2 size={14} className="md:w-4 md:h-4" />
 ): (
 <Download size={14} className="md:w-4 md:h-4" />
 )}{""}
 {isOfflineReady
 ?"Offline Map Ready"
 :"Download Offline Map"}{""}
 </button>{""}
 <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed text-center lg:text-left">
 {""}
 restricted to Chaliyam & surrounding areas.{""}
 </p>{""}
 </div>{""}
 </div>{""}
 {/* Map Container */}{""}
 <div className="flex-1 bg-[var(--color-surface-variant)] rounded-xl md:rounded-2xl p-1 md:p-2 border border-[var(--color-outline)] shadow-[0_4px_24px_rgba(0,0,0,0.2 backdrop-blur-md relative">
 {""}
 <div className="relative w-full h-[350px] md:h-[600px] rounded-lg md:rounded-xl overflow-hidden z-0 border border-white/5">
 {""}
 <div ref={mapRef} className="w-full h-full" />{""}
 </div>{""}
 <button
 onClick={centerOnUserLocation}
 className="absolute bottom-6 right-6 z-10 bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-slate-100 transition-colors flex items-center justify-center active:scale-95 transition-all duration-150"
 title="My Location"
 >
 {""}
 <Navigation size={20} className="text-blue-600" />{""}
 </button>{""}
 </div>{""}
 </div>{""}
 {/* Report Modal */}{""}
 {isReportModalOpen && (
 <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
 {""}
 <div className="bg-[var(--color-surface)] w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border border-[var(--color-outline)] animate-scale-up-center">
 {""}
 <div className="flex justify-between items-center p-4 border-b border-[var(--color-outline)] bg-[var(--color-surface-variant)]">
 {""}
 <h3 className="font-semibold text-lg text-[var(--color-on-surface)] flex items-center gap-2">
 {""}
 <AlertTriangle
 size={20}
 className="text-[var(--color-danger)]"
 />{""}
 Map Feedback{""}
 </h3>{""}
 <button
 onClick={() => setIsReportModalOpen(false)}
 className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-danger)] transition-colors bg-[var(--color-surface-variant)] p-1.5 rounded-full border border-[var(--color-outline)]"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 </div>{""}
 <form onSubmit={handleReportSubmit} className="p-5">
 {""}
 <div className="flex gap-2 mb-4">
 {""}
 <button
 type="button"
 onClick={() => setReportType("issue")}
 className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${reportType ==="issue" ?"bg-[var(--color-danger)]/20 text-[var(--color-danger)] border border-transparent shadow-inner" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-[var(--color-outline)] hover:bg-white/10"}`}
 >
 {""}
 Report Issue{""}
 </button>{""}
 <button
 type="button"
 onClick={() => setReportType("landmark")}
 className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${reportType ==="landmark" ?"bg-green-500/20 text-green-400 border border-green-500/30 shadow-inner" :"bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] border border-[var(--color-outline)] hover:bg-white/10"}`}
 >
 {""}
 Suggest Landmark{""}
 </button>{""}
 </div>{""}
 <div className="space-y-4">
 {""}
 <div>
 {""}
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Location Details
 </label>{""}
 <input
 name="location"
 required
 type="text"
 placeholder="e.g., Near Chaliyam Beach"
 className="w-full px-3 py-2 rounded-lg border border-[var(--color-outline)] bg-slate-50 border-slate-200 text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all"
 />{""}
 </div>{""}
 <div>
 {""}
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Description
 </label>{""}
 <textarea
 name="desc"
 required
 rows={4}
 placeholder={
 reportType ==="issue"
 ?"Describe the map issue..."
 :"Describe the landmark..."
 }
 className="w-full px-3 py-2 rounded-lg border border-[var(--color-outline)] bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] outline-none focus:border-[var(--color-primary)] focus:bg-white/10 resize-none placeholder:text-slate-500 shadow-inner"
 ></textarea>{""}
 </div>{""}
 <button
 type="submit"
 className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(37,211,102,0.2 active:scale-95 transition-all duration-150"
 >
 {""}
 Submit via WhatsApp{""}
 </button>{""}
 </div>{""}
 </form>{""}
 </div>{""}
 </div>
 )}{""}
 {/* Offline Map Modal */}{""}
 {showOfflineModal && (
 <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
 {""}
 <div className="bg-[var(--color-surface)] w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border border-[var(--color-outline)] animate-scale-up-center">
 {""}
 <div className="flex justify-between items-center p-4 border-b border-[var(--color-outline)] bg-[var(--color-surface-variant)]">
 {""}
 <h3 className="font-semibold text-lg text-[var(--color-on-surface)] flex items-center gap-2">
 {""}
 <Download
 size={20}
 className="text-[var(--color-primary)]"
 />{""}
 Offline Maps{""}
 </h3>{""}
 <button
 onClick={() => setShowOfflineModal(false)}
 className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-danger)] transition-colors bg-[var(--color-surface-variant)] p-1.5 rounded-full border border-[var(--color-outline)]"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 </div>{""}
 <div className="p-5">
 {""}
 {isOfflineReady && !isDownloading ? (
 <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-4 text-sm leading-relaxed flex items-start gap-3 shadow-inner">
 {""}
 <CheckCircle2 className="shrink-0 mt-0.5" size={18} />{""}
 <div>
 {""}
 <p className="font-semibold mb-1 text-green-300">
 Map is available offline!
 </p>{""}
 <p>
 You can now view the Chaliyam area map even without an
 internet connection.
 </p>{""}
 </div>{""}
 </div>
 ): (
 <>
 {""}
 <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 p-4 rounded-xl mb-4 text-sm leading-relaxed shadow-inner">
 {""}
 <p className="mb-2 text-blue-200">
 <strong>Download Map for Offline Use</strong>
 </p>{""}
 <p>
 This will save the map tiles for the Chaliyam area to your
 device, allowing you to navigate the village without an
 active internet connection.
 </p>{""}
 </div>{""}
 {isDownloading ? (
 <div className="mb-4">
 {""}
 <div className="flex justify-between text-sm mb-1 text-[var(--color-on-surface-variant)]">
 {""}
 <span>Downloading...</span>{""}
 <span>{downloadProgress}%</span>{""}
 </div>{""}
 <div className="w-full bg-[var(--color-surface-variant)] rounded-full h-2.5 border border-white/5 shadow-inner">
 {""}
 <div
 className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-300"
 style={{ width: `${downloadProgress}%` }}
 ></div>{""}
 </div>{""}
 </div>
 ): (
 <button
 onClick={downloadOfflineMap}
 className="w-full bg-[var(--color-primary)]/90 hover:bg-[var(--color-primary)] text-slate-900 border border-[var(--color-primary)] py-2.5 rounded-lg font-medium transition-colors mb-3 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(201,148,26,0.2 active:scale-95 transition-all duration-150"
 >
 {""}
 <Download size={18} /> Start Download{""}
 </button>
 )}{""}
 </>
 )}{""}
 <button
 onClick={() => setShowOfflineModal(false)}
 disabled={isDownloading}
 className="w-full bg-[var(--color-surface-variant)] hover:bg-white/10 text-[var(--color-on-surface-variant)] border border-[var(--color-outline)] py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
 >
 {""}
 Close{""}
 </button>{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 <ShareModal 
        isOpen={!!shareData} 
        onClose={() => setShareData(null)} 
        title={shareData?.title || ''}
        text={shareData?.text || ''}
        url={shareData?.url || ''}
        imageUrl={shareData?.imageUrl}
      />
    </div>
  );
}
