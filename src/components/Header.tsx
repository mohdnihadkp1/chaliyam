import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useCart } from "../context/CartContext";
import InstallAppBtn from "./InstallAppBtn";
import {
  Home,
  Map as MapIcon,
  Camera,
  Bus,
  Phone,
  Store,
  Newspaper,
  ClipboardList,
  Briefcase,
  Menu,
  X,
  Info,
  Users,
  Palmtree,
  ShoppingBag,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { cartCount } = useCart();
  const activeSection =
    location.pathname === "/" ? "home" : location.pathname.substring(1);
    
  /* Close dropdown on click outside */ 
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  /* Close menus on route change */ 
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, [location.pathname]);
 const navItems = [
 { id:"home", path:"/", label:"Home", icon: Home },
 { id:"store", path:"/store", label:"Store", icon: ShoppingBag },
 { id:"directory", path:"/directory", label:"Directory", icon: Store },
 {
 id:"marketplace",
 path:"/marketplace",
 label:"Marketplace",
 icon: Briefcase,
 },
 { id:"bus", path:"/bus", label:"Bus", icon: Bus },
 { id:"news", path:"/news", label:"News", icon: Newspaper },
 ];
 const moreNavItems = [
 { id:"spots", path:"/spots", label:"Spots", icon: Camera },
 { id:"people", path:"/people", label:"People", icon: Users },
 { id:"map", path:"/map", label:"Map", icon: MapIcon },
 { id:"tasks", path:"/tasks", label:"Tasks", icon: ClipboardList },
 { id:"emergency", path:"/emergency", label:"Emergency", icon: Phone },
 ];
 const allNavItems = [...navItems, ...moreNavItems];
 return (
 <>
 {""}
 <header className="bg-[var(--color-surface)] px-4 md:px-6 sticky top-0 z-50 shadow-sm transition-all duration-300 ease-in-out">
 {""}
 <div className="max-w-7xl mx-auto flex items-center justify-between h-[64px] gap-4">
 {""}
 {/* Logo brand */}{""}
 <Link
 to="/"
 className="flex items-center gap-3 no-underline text-left group shrink-0"
 >
 {""}
 <div className="flex items-center justify-center text-[var(--color-primary)] shrink-0">
  {""}
  <Logo className="h-10 md:h-11 w-auto object-contain rounded-[10px] shadow-md hover:scale-105 transition-transform" />
 </div>{""}
 <div className="flex flex-col justify-center">
 {""}
 <span className="font-extrabold text-xl md:text-2xl text-[var(--color-on-surface)] leading-none tracking-tight">
 Chaliyam
 </span>{""}
 <span className="text-[10px] md:text-[11px] text-[var(--color-on-surface-variant)] tracking-widest uppercase mt-0.5 font-bold">
 Connect • KL85
 </span>{""}
 </div>{""}
 </Link>{""}
 {/* Desktop Nav */}{""}
 <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
 {""}
 {navItems.map((item) => {
 const isActive = activeSection === item.id;
 return (
 <Link
 key={item.id}
 to={item.path}
 className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline ${isActive ?"bg-[var(--color-primary-container)] text-[var(--color-primary)] shadow-sm" :"text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]"}`}
 >
 {""}
 <item.icon
 size={16}
 className={
 isActive
 ?"text-[var(--color-primary)]"
 :"opacity-70"
 }
 />{""}
 {item.label}{""}
 </Link>
 );
 })}{""}
 {/* More Dropdown */}{""}
 <div className="relative" ref={dropdownRef}>
 {""}
 <button
 onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
 className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${moreNavItems.some((i) => i.id === activeSection) || isMoreDropdownOpen ?"bg-[var(--color-primary-container)] text-[var(--color-primary)] shadow-sm" :"text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]"}`}
 >
 {""}
 More{""}
 <ChevronDown
 size={16}
 className={`transition-transform duration-300 ${isMoreDropdownOpen ?"rotate-180" :""}`}
 />{""}
 </button>{""}
 {/* Dropdown Menu */}{""}
 {isMoreDropdownOpen && (
 <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[var(--color-outline)] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1 ,0,0,0.5 p-2 animate-[fadeUp_0.2s_ease] z-50">
 {""}
 {moreNavItems.map((item) => {
 const isActive = activeSection === item.id;
 return (
 <Link
 key={item.id}
 to={item.path}
 className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors no-underline ${isActive ?"bg-[var(--color-primary-container)] text-[var(--color-primary)]" :"text-[var(--color-on-surface)] hover:bg-[var(--color-background)]"}`}
 >
 {""}
 <div
 className={`p-1.5 rounded-lg ${isActive ?"bg-[var(--color-primary-container)]" :"bg-[var(--color-surface-variant)]"}`}
 >
 {""}
 <item.icon
 size={16}
 className={
 isActive
 ?"text-[var(--color-primary)]"
 :"text-[var(--color-on-surface-variant)]"
 }
 />{""}
 </div>{""}
 {item.label}{""}
 </Link>
 );
 })}{""}
 </div>
 )}{""}
 </div>{""}
 </nav>{""}
 {/* Right Controls */}{""}
 <div className="flex items-center gap-2 sm:gap-3 shrink-0">
 {""}
 <Link
   to="/cart"
   className="relative flex items-center justify-center p-2 rounded-xl text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)] transition-all active:scale-95"
 >
   <ShoppingCart size={20} />
   {cartCount > 0 && (
     <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-on-primary)] text-[9px] font-bold rounded-full border-2 border-[var(--color-surface)] shadow-sm translate-x-1/2 -translate-y-1/2 cursor-pointer">
       {cartCount}
     </span>
   )}
 </Link>
 <InstallAppBtn variant="header" />{""}
 <button
 onClick={() => setIsAboutModalOpen(true)}
 className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-background)] border border-[var(--color-outline)] text-[var(--color-on-surface)] hover:bg-[var(--color-surface-variant)] hover:text-[var(--color-primary)] transition-all text-sm font-semibold"
 >
 {""}
 <Info size={16} /> About{""}
 </button>{""}
 {""}
 <button
 className="lg:hidden w-10 h-10 rounded-xl bg-[var(--color-surface-variant)] flex items-center justify-center text-[var(--color-on-surface)] hover:bg-[var(--color-outline)] transition-colors shrink-0 active:scale-95 transition-all duration-150"
 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 >
 {""}
 {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}{""}
 </button>{""}
 </div>{""}
 </div>{""}
 </header>{""}
 {/* Mobile Menu Backdrop */}{""}
 {isMobileMenuOpen && (
 <div
 className="xl:hidden fixed inset-0 top-[70px] bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
 onClick={() => setIsMobileMenuOpen(false)}
 />
 )}{""}
 {/* Mobile Side Drawer */}{""}
 <div
 className={`lg:hidden fixed right-0 top-[64px] md:top-[76px] bottom-0 w-[85vw] sm:w-[320px] bg-white border-l border-[var(--color-outline)] shadow-[-10px_0_40px_rgba(0,0,0,0.1 ,0,0,0.5 z-40 flex flex-col p-4 transition-transform duration-300 ease-in-out pb-20 overflow-y-auto ${isMobileMenuOpen ?"translate-x-0" :"translate-x-full"}`}
 >
 {""}
 <div className="flex flex-col gap-1.5 mb-6">
 {""}
 <InstallAppBtn variant="mobile" />{""}
 <div className="text-[10px] sm:text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1 ml-2 mt-4">
 Navigation
 </div>{""}
 {allNavItems.map((item) => (
 <Link
 key={item.id}
 to={item.path}
 onClick={() => setIsMobileMenuOpen(false)}
 className={`flex items-center gap-3 p-2 rounded-xl no-underline transition-all duration-200 ${activeSection === item.id ?"bg-[var(--color-primary-container)] text-[var(--color-primary)] border border-[var(--color-primary)] shadow-sm" :"text-[var(--color-on-surface-variant)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"}`}
 >
 {""}
 <div
 className={`p-1.5 rounded-lg ${activeSection === item.id ?"bg-[var(--color-primary-container)]" :"bg-[var(--color-surface-variant)]"}`}
 >
 {""}
 <item.icon
 size={18}
 className={
 activeSection === item.id
 ?"text-[var(--color-primary)]"
 :"text-[var(--color-on-surface-variant)]"
 }
 />{""}
 </div>{""}
 <span className="text-sm font-semibold">{item.label}</span>{""}
 </Link>
 ))}{""}
 <div className="h-px w-full bg-[var(--color-outline)] my-2" />{""}
 <button
 onClick={() => {
 setIsAboutModalOpen(true);
 setIsMobileMenuOpen(false);
 }}
 className="flex items-center gap-3 p-2 rounded-xl no-underline transition-all duration-200 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)] text-left"
 >
 {""}
 <div className="p-1.5 rounded-lg bg-[var(--color-surface-variant)]">
 {""}
 <Info
 size={18}
 className="text-[var(--color-on-surface-variant)]"
 />{""}
 </div>{""}
 <span className="text-sm font-semibold">About Us</span>{""}
 </button>{""}
 </div>{""}
 </div>{""}
 {/* Mobile Navigation (Bottom) - MD3 Style */}{""}
 <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-outline)]/30 z-40 pb-safe-bottom">
 {""}
 <div className="flex justify-evenly items-center h-[64px]">
 {""}
 {[
 { id:"home", path:"/", label:"Home", icon: Home },
 {
 id:"directory",
 path:"/directory",
 label:"Directory",
 icon: Store,
 },
 {
 id:"marketplace",
 path:"/marketplace",
 label:"Marketplace",
 icon: Briefcase,
 },
 {
 id:"menu",
 path:"#",
 label:"Menu",
 icon: Menu,
 action: () => setIsMobileMenuOpen(true),
 },
 ].map((item) => {
 const isActive = item.id !=="menu" && activeSection === item.id;
 return item.id ==="menu" ? (
 <button
 key={item.id}
 onClick={item.action}
 className="flex flex-col items-center justify-center gap-0.5 w-[56px] h-[56px] group border-none bg-transparent cursor-pointer relative active:scale-95 transition-all duration-150"
 >
 {""}
 <div
 className={`w-[56px] h-[28px] flex items-center justify-center rounded-2xl transition-all duration-300 bg-transparent group-hover:bg-[var(--color-outline)]/20`}
 >
 {""}
 <item.icon
 size={20}
 className={`transition-all duration-300 ease-in-out text-[var(--color-on-surface-variant)]`}
 fill="none"
 strokeWidth={1.5}
 />{""}
 </div>{""}
 <span
 className={`text-[10px] font-medium tracking-wide transition-all duration-300 ease-in-out text-[var(--color-on-surface-variant)]`}
 >
 {""}
 {item.label}{""}
 </span>{""}
 {/* Visual indicator for new notifications, optional */}{""}
 {/* <div className="absolute top-2 right-4 w-2 h-2 bg-[var(--color-danger)] rounded-full border border-white"></div> */}{""}
 </button>
 ): (
 <Link
 key={item.id}
 to={item.path}
 className="flex flex-col items-center justify-center gap-0.5 w-[56px] h-[56px] no-underline group active:scale-95"
 >
 {""}
 <div
 className={`w-[56px] h-[28px] flex items-center justify-center rounded-2xl transition-all duration-300 ${isActive ?"bg-[var(--color-primary-container)]" :"bg-transparent group-hover:bg-[var(--color-outline)]/20"}`}
 >
 {""}
 <item.icon
 size={20}
 className={`transition-all duration-300 ease-in-out ${isActive ?"text-[var(--color-on-primary-container)]" :"text-[var(--color-on-surface-variant)]"}`}
 fill={isActive ?"currentColor" :"none"}
 strokeWidth={isActive ? 2 : 1.5}
 />{""}
 </div>{""}
 <span
 className={`text-[10px] font-medium tracking-wide transition-all duration-300 ease-in-out ${isActive ?"text-[var(--color-on-surface)] font-semibold" :"text-[var(--color-on-surface-variant)]"}`}
 >
 {""}
 {item.label}{""}
 </span>{""}
 </Link>
 );
 })}{""}
 </div>{""}
 </nav>{""}
 {/* About Us Modal */}{""}
 {isAboutModalOpen && (
 <div
 className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
 onClick={() => setIsAboutModalOpen(false)}
 >
 {""}
 <div
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-up-center relative"
 onClick={(e) => e.stopPropagation()}
 >
 {""}
 <button
 onClick={() => setIsAboutModalOpen(false)}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-outline)]/50 text-[var(--color-on-surface-variant)] hover:bg-gray-300 hover:text-[var(--color-danger)] transition-colors border border-transparent z-10"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 <div className="bg-[var(--color-background)] p-5 rounded-xl border border-[var(--color-outline)]">
 {""}
 <div className="flex items-center gap-3 mb-4">
 {""}
 <div className="flex items-center justify-center text-[var(--color-primary)] shrink-0">
  <Logo className="w-12 h-12 object-contain" />
 </div>{""}
 <div>
 {""}
 <h3 className="font-yatra text-2xl text-gray-900">
 About Us
 </h3>{""}
 <p className="text-xs text-[var(--color-on-surface-variant)]">
 Community Platform
 </p>{""}
 </div>{""}
 </div>{""}
 <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-4">
 {""}
 Chaliyam Connect is a dedicated community platform designed to
 bring the people of Chaliyam closer together. Our mission is to
 provide a centralized hub for local information, essential
 services, and community updates.{""}
 </p>{""}
 <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed mb-6">
 {""}
 From bus timings and emergency contacts to local news and a
 community marketplace, we aim to make daily life in Chaliyam
 more connected and convenient.{""}
 </p>{""}
 <div className="bg-white p-4 rounded-xl border border-[var(--color-outline)] shadow-sm">
 {""}
 <h5 className="font-bold text-gray-900 mb-1">
 Developers & Contributors
 </h5>{""}
 <p className="text-xs text-[var(--color-on-surface-variant)] mb-2">
 {""}
 Built with ❤️ for the community by{""}
 <a
 href="https://mohdnihadkp.vercel.app"
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--color-primary)] hover:underline font-bold"
 >
 mohdnihadkp
 </a>
 .{""}
 </p>{""}
 <p className="text-xs text-[var(--color-on-surface-variant)]">
 {""}
 Have suggestions? Contact us via the News section or reach out
 to our team.{""}
 </p>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 </>
 );
}
