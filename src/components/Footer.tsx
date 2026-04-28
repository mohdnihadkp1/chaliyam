import { useState } from "react";
import Logo from "./Logo";
import InstallAppBtn from "./InstallAppBtn";
import {
  Instagram,
  Facebook,
  X,
  Palmtree,
  Mail,
  Shield,
  MessageSquare,
  Send,
  BookOpen,
  Info,
} from "lucide-react";
import FeedbackModal from "./FeedbackModal";

export default function Footer() {
 const [isAboutOpen, setIsAboutOpen] = useState(false);
 const [isIgOpen, setIsIgOpen] = useState(false);
 const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
 const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
 const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
 const [feedbackInitialType, setFeedbackInitialType] = useState("feedback");
 const igPages = [
 {
 name:"@kl85chaliyam",
 url:"https://www.instagram.com/kl85chaliyam/?utm_source=ig_web_button_share_sheet",
 },
 {
 name:"@chaliyam.official",
 url:"https://www.instagram.com/chaliyam.official/?utm_source=ig_web_button_share_sheet",
 },
 {
 name:"@chaliyam_official",
 url:"https://www.instagram.com/chaliyam_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
 },
 {
 name:"@explore_chaliyam",
 url:"https://www.instagram.com/explore_chaliyam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
 },
 ];
 return (
 <footer className="bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] border-t border-[var(--color-outline)] mt-10 md:mt-16 pb-[100px] md:pb-0">
 {""}
 <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
 {""}
 <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
 {""}
 {/* Brand Info */}{""}
 <div className="flex flex-col items-start text-left col-span-2 md:col-span-1 lg:col-span-1">
 {""}
 <div className="font-yatra text-2xl lg:text-3xl text-[var(--color-primary)] mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
 {""}
 <div className="flex items-center justify-center text-[var(--color-primary)] shrink-0">
 {""}
  <Logo className="h-8 w-auto md:h-10 object-contain" />
 </div>{""}
 <span className="text-[var(--color-primary)]">
 {""}
 Chaliyam{""}
 </span>{""}
 </div>{""}
 <p className="text-sm md:text-sm leading-relaxed mb-5 md:mb-6 max-w-xs">
 {""}
 Kozhikode, Kerala's premier coastal community block. Connecting
 locals through a reliable, integrated community platform.{""}
 </p>{""}
 <div className="flex gap-2.5 md:gap-3">
 {""}
 <button
 onClick={() => setIsIgOpen(true)}
 className="w-10 h-10 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] flex items-center justify-center hover:bg-[var(--color-primary-container)] hover:text-[var(--color-on-primary-container)] transition-all cursor-pointer shadow-sm hover:-translate-y-1"
 title="Instagram Pages"
 >
 {""}
 <Instagram className="w-[18px] h-[18px]" />{""}
 </button>{""}
 <a
 href="https://www.facebook.com/share/1BW6L4yPdY/"
 target="_blank"
 rel="noopener noreferrer"
 className="w-10 h-10 rounded-full bg-[var(--color-surface-variant)] border border-[var(--color-outline)] flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm hover:-translate-y-1"
 title="Facebook Page"
 >
 {""}
 <Facebook className="w-[18px] h-[18px]" />{""}
 </a>{""}
 </div>{""}
 </div>{""}
 {/* Quick Links */}{""}
 <div className="text-left col-span-1">
 {""}
 <h4 className="text-[var(--color-on-surface)] font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2 leading-tight">
 {""}
 <BookOpen className="w-4 h-4 text-[var(--color-primary)]" /> Quick
 Access{""}
 </h4>{""}
 <ul className="flex flex-col gap-3">
 {""}
 <li>
 <button
 onClick={() => window.scrollTo(0, 0)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Directory
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => window.scrollTo(0, 0)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Bus Timings
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => window.scrollTo(0, 0)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Local News
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => window.scrollTo(0, 0)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Live Map
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => window.scrollTo(0, 0)}
 className="text-sm font-medium flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 <Shield className="w-3.5 h-3.5" /> Emergency Contacts
 </button>
 </li>{""}
 </ul>{""}
 </div>{""}
 {/* Information */}{""}
 <div className="text-left col-span-1">
 {""}
 <h4 className="text-[var(--color-on-surface)] font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2 leading-tight">
 {""}
 <Info className="w-4 h-4 text-[var(--color-primary)]" /> Platform
 Info{""}
 </h4>{""}
 <ul className="flex flex-col gap-3">
 {""}
 <li>
 <button
 onClick={() => setIsAboutOpen(true)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 About Us
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => setIsGuidelinesOpen(true)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Community Guidelines
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => setIsPrivacyOpen(true)}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 Privacy Policy
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => {
 setFeedbackInitialType("contribute");
 setIsFeedbackOpen(true);
 }}
 className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full inline-block"
 >
 Submit Marketplace Listing
 </button>
 </li>{""}
 <li>
 <button
 onClick={() => {
 setFeedbackInitialType("feedback");
 setIsFeedbackOpen(true);
 }}
 className="text-sm font-medium flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors text-left leading-tight w-full"
 >
 <MessageSquare className="w-3.5 h-3.5" /> Send Feedback
 </button>
 </li>{""}
 </ul>{""}
 </div>{""}
          {/* Help & Support */}{""}
          <div className="text-left col-span-2 md:col-span-1">
            {""}
            <h4 className="text-[var(--color-on-surface)] font-bold mb-3 md:mb-4 uppercase tracking-wider text-sm">
              Need Help?
            </h4>{""}
            <div className="bg-[var(--color-surface-variant)] p-4 rounded-2xl border border-[var(--color-outline)]">
              {""}
              <p className="text-sm mb-4 leading-relaxed">
                {""}
                Found a bug? Data looks incorrect? Or want to contribute to the
                community directory?{""}
              </p>{""}
              <button
                onClick={() => {
                  setFeedbackInitialType("bug");
                  setIsFeedbackOpen(true);
                }}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-on-primary)] transition-colors rounded-xl text-sm font-semibold shadow-sm hover:shadow-md "
              >
                {""}
                <MessageSquare className="w-4 h-4" />{""}
                <span>Get In Touch</span>{""}
              </button>{""}
            </div>{""}
            <InstallAppBtn variant="footer" />
          </div>{""}
        </div>{""}
 <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-16 pt-6 border-t border-[var(--color-outline)] gap-4">
 {""}
 <p className="text-[12px] font-medium order-2 md:order-1">
 {""}
 © {new Date().getFullYear()} Chaliyam Connect. Made with{""}
 <span className="text-[var(--color-danger)]">❤️</span> by{""}
 <a
 href="https://mohdnihadkp.vercel.app"
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--color-primary)] hover:underline font-bold"
 >
 mohdnihadkp
 </a>{""}
 </p>{""}
 <div className="flex items-center gap-4 order-1 md:order-2">
 {""}
 <span className="text-[10px] md:text-xs font-semibold px-3 py-1 bg-[var(--color-surface-variant)] rounded-full border border-[var(--color-outline)] text-[var(--color-on-surface-variant)]">
 {""}
 App v2.1.0{""}
 </span>{""}
 </div>{""}
 </div>{""}
 </div>{""}
 {/* About Modal */}{""}
 {isAboutOpen && (
 <div
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
 onClick={() => setIsAboutOpen(false)}
 >
 {""}
 <div
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-[24px] p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]"
 onClick={(e) => e.stopPropagation()}
 >
 {""}
 <button
 onClick={() => setIsAboutOpen(false)}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors cursor-pointer"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 <h3 className="font-yatra text-2xl text-[var(--color-on-surface)] mb-3">
 About Chaliyam Connect
 </h3>{""}
 <p className="text-[14px] text-[var(--color-on-surface-variant)] leading-relaxed mb-5">
 {""}
 Chaliyam Connect is a dedicated community platform designed to
 bring the people of Chaliyam together. It provides essential local
 information, bus timings, emergency contacts, and a local
 marketplace, all in one accessible place.{""}
 </p>{""}
 <div className="bg-[var(--color-surface-variant)] p-4 rounded-xl border border-[var(--color-outline)]">
 {""}
 <p className="text-[14px] text-[var(--color-on-surface)] font-medium m-0">
 {""}
 Developed by{""}
 <a
 href="https://mohdnihadkp.vercel.app"
 target="_blank"
 rel="noopener noreferrer"
 className="text-[var(--color-primary)] font-bold hover:underline transition-colors"
 >
 mohdnihadkp
 </a>{""}
 </p>{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 {/* Guidelines Modal */}{""}
 {isGuidelinesOpen && (
 <div
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
 onClick={() => setIsGuidelinesOpen(false)}
 >
 {""}
 <div
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-[24px] p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]"
 onClick={(e) => e.stopPropagation()}
 >
 {""}
 <button
 onClick={() => setIsGuidelinesOpen(false)}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors cursor-pointer"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 <h3 className="font-yatra text-2xl text-[var(--color-on-surface)] mb-3 flex items-center gap-2">
 {""}
 <BookOpen
 size={24}
 className="text-[var(--color-primary)]"
 />{""}
 Community Guidelines{""}
 </h3>{""}
 <div className="text-[14px] text-[var(--color-on-surface-variant)] leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
 {""}
 <p className="mb-3">
 {""}
 Welcome to Chaliyam Connect! To keep this platform helpful and
 safe for everyone, please adhere to the following
 guidelines:{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 1. Respectful Interaction:
 </strong>{""}
 Treat all community members with respect. Harassment, hate
 speech, and abusive language will not be tolerated in comments
 or submissions.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 2. Accurate Information:
 </strong>{""}
 When submitting marketplace listings, news, or profiles, ensure
 the information is accurate and up-to-date. Do not post
 misleading content.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 3. No Spam:
 </strong>{""}
 Avoid posting repetitive content, irrelevant links, or excessive
 self-promotion outside of the designated Business
 Directory.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 4. Privacy Matters:
 </strong>{""}
 Do not share personal information (like phone numbers or
 addresses)] of others without their explicit consent.{""}
 </p>{""}
 <p>
 {""}
 <strong className="text-[var(--color-on-surface)]">
 5. Local Relevance:
 </strong>{""}
 Keep content relevant to the Chaliyam community, its people,
 events, and marketplace listings.{""}
 </p>{""}
 </div>{""}
 <div className="mt-5 pt-4 border-t border-[var(--color-outline)] flex justify-end">
 {""}
 <button
 onClick={() => setIsGuidelinesOpen(false)}
 className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-on-primary)] px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
 >
 {""}
 I Agree{""}
 </button>{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 {/* Privacy Modal */}{""}
 {isPrivacyOpen && (
 <div
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
 onClick={() => setIsPrivacyOpen(false)}
 >
 {""}
 <div
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-[24px] p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]"
 onClick={(e) => e.stopPropagation()}
 >
 {""}
 <button
 onClick={() => setIsPrivacyOpen(false)}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors cursor-pointer"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 <h3 className="font-yatra text-2xl text-[var(--color-on-surface)] mb-3 flex items-center gap-2">
 {""}
 <Shield size={24} className="text-[var(--color-primary)]" />{""}
 Privacy Policy{""}
 </h3>{""}
 <div className="text-[14px] text-[var(--color-on-surface-variant)] leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
 {""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 1. Information Collection:
 </strong>{""}
 We collect minimal information necessary to provide community
 services. This may include names, contact numbers, and
 marketplace details submitted voluntarily by users.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 2. Use of Information:
 </strong>{""}
 The information provided is used solely for displaying in the
 community directory (People, Business, News)] to help locals
 connect with each other.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 3. Data Sharing:
 </strong>{""}
 We do not sell or share your personal information with third
 parties for marketing purposes. Information displayed on the
 platform is public to other users of Chaliyam Connect.{""}
 </p>{""}
 <p className="mb-3">
 {""}
 <strong className="text-[var(--color-on-surface)]">
 4. User Control:
 </strong>{""}
 You can request the removal or modification of your listed
 information at any time by contacting us.{""}
 </p>{""}
 <p>
 {""}
 <strong className="text-[var(--color-on-surface)]">
 5. Cookies:
 </strong>{""}
 We may use basic cookies to enhance user experience (like
 keeping you logged in or remembering preferences)].{""}
 </p>{""}
 </div>{""}
 <div className="mt-5 pt-4 border-t border-[var(--color-outline)] flex justify-end">
 {""}
 <button
 onClick={() => setIsPrivacyOpen(false)}
 className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-[var(--color-on-primary)] px-6 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
 >
 {""}
 Understood{""}
 </button>{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 {/* Instagram Modal */}{""}
 {isIgOpen && (
 <div
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
 onClick={() => setIsIgOpen(false)}
 >
 {""}
 <div
 className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-[24px] p-6 max-w-sm w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]"
 onClick={(e) => e.stopPropagation()}
 >
 {""}
 <button
 onClick={() => setIsIgOpen(false)}
 className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-colors cursor-pointer"
 >
 {""}
 <X size={18} />{""}
 </button>{""}
 <h3 className="font-yatra text-xl text-[var(--color-on-surface)] mb-5 flex items-center gap-2">
 {""}
 <Instagram className="text-pink-500" size={22} /> Chaliyam on
 Instagram{""}
 </h3>{""}
 <div className="flex flex-col gap-3">
 {""}
 {igPages.map((page, idx) => (
 <a
 key={idx}
 href={page.url}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-outline)] hover:bg-[var(--color-surface-variant)] transition-all no-underline group"
 >
 {""}
 <span className="font-medium text-[14px] text-[var(--color-on-surface)] group-hover:text-[var(--color-primary)] transition-colors">
 {page.name}
 </span>{""}
 <span className="text-[11px] font-semibold text-[var(--color-primary)] bg-[var(--color-primary-container)] border border-[var(--color-primary)]/10 px-3 py-1 rounded-full uppercase tracking-wide">
 Visit
 </span>{""}
 </a>
 ))}{""}
 </div>{""}
 </div>{""}
 </div>
 )}{""}
 {/* Advanced Feedback Modal */}{""}
 <FeedbackModal
 isOpen={isFeedbackOpen}
 onClose={() => setIsFeedbackOpen(false)}
 initialType={feedbackInitialType}
 />{""}
 </footer>
 );
}
