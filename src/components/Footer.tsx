import { useState } from 'react';
import { Instagram, Facebook, X, Palmtree, Mail, Shield, MessageSquare, Send, BookOpen, Info } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIgOpen, setIsIgOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackInitialType, setFeedbackInitialType] = useState('feedback');

  const igPages = [
    { name: "@kl85chaliyam", url: "https://www.instagram.com/kl85chaliyam/?utm_source=ig_web_button_share_sheet" },
    { name: "@chaliyam.official", url: "https://www.instagram.com/chaliyam.official/?utm_source=ig_web_button_share_sheet" },
    { name: "@chaliyam_official", url: "https://www.instagram.com/chaliyam_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "@explore_chaliyam", url: "https://www.instagram.com/explore_chaliyam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 text-gray-600 dark:text-slate-400 border-t border-gray-200 dark:border-white/10 mt-10 md:mt-16 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start text-left col-span-2 md:col-span-1 lg:col-span-1">
            <div className="font-yatra text-2xl lg:text-3xl text-indigo-600 dark:text-gold-light mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-gold-light shadow-sm shrink-0">
                <Palmtree className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className="bg-gradient-to-r from-indigo-700 to-indigo-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Chaliyam
              </span>
            </div>
            <p className="text-sm md:text-sm leading-relaxed mb-5 md:mb-6 max-w-xs text-gray-500 dark:text-slate-400">
              Kozhikode, Kerala's premier coastal community block. Connecting locals through a reliable, integrated community platform.
            </p>
            <div className="flex gap-2.5 md:gap-3">
              <button 
                onClick={() => setIsIgOpen(true)} 
                className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-gold-light transition-all cursor-pointer shadow-sm hover:-translate-y-1"
                title="Instagram Pages"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </button>
              <a 
                href="https://www.facebook.com/share/1BW6L4yPdY/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-gold-light transition-all cursor-pointer shadow-sm hover:-translate-y-1"
                title="Facebook Page"
              >
                <Facebook className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-left col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2 leading-tight">
              <BookOpen className="w-4 h-4 text-indigo-400 dark:text-gold-light/60"/> Quick Access
            </h4>
            <ul className="flex flex-col gap-3">
              <li><button onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Directory</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Bus Timings</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Local News</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Live Map</button></li>
              <li><button onClick={() => window.scrollTo(0, 0)} className="text-sm font-medium flex items-center gap-2 hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full"><Shield className="w-3.5 h-3.5"/> Emergency Contacts</button></li>
            </ul>
          </div>

          {/* Information */}
          <div className="text-left col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2 leading-tight">
              <Info className="w-4 h-4 text-indigo-400 dark:text-gold-light/60" /> Platform Info
            </h4>
            <ul className="flex flex-col gap-3">
              <li><button onClick={() => setIsAboutOpen(true)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">About Us</button></li>
              <li><button onClick={() => setIsGuidelinesOpen(true)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Community Guidelines</button></li>
              <li><button onClick={() => setIsPrivacyOpen(true)} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full">Privacy Policy</button></li>
              <li><button onClick={() => { setFeedbackInitialType('contribute'); setIsFeedbackOpen(true); }} className="text-sm font-medium hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full inline-block">Submit Business</button></li>
              <li><button onClick={() => { setFeedbackInitialType('feedback'); setIsFeedbackOpen(true); }} className="text-sm font-medium flex items-center gap-2 hover:text-indigo-600 dark:hover:text-gold-light transition-colors text-left leading-tight w-full"><MessageSquare className="w-3.5 h-3.5" /> Send Feedback</button></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="text-left col-span-2 md:col-span-1">
            <h4 className="text-gray-900 dark:text-white font-bold mb-3 md:mb-4 uppercase tracking-wider text-sm">Need Help?</h4>
            <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl md:rounded-2xl border border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed">
                Found a bug? Data looks incorrect? Or want to contribute to the community directory?
              </p>
              <button 
                onClick={() => { setFeedbackInitialType('bug'); setIsFeedbackOpen(true); }}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 dark:bg-white/10 text-white dark:text-white hover:bg-indigo-700 dark:hover:bg-white/20 transition-colors rounded-xl text-sm font-semibold shadow-sm"
              >
                <MessageSquare className="w-4 h-4" /> <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-16 pt-6 border-t border-gray-100 dark:border-white/10 gap-4">
          <p className="text-[12px] font-medium text-gray-500 dark:text-slate-500 order-2 md:order-1">
            © {new Date().getFullYear()} Chaliyam Connect. Made with <span className="text-red-500">❤️</span> by <a href="https://mohdnihadkp.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-gold-light hover:underline font-bold">mohdnihadkp</a>
          </p>
          <div className="flex items-center gap-4 order-1 md:order-2">
            <span className="text-[10px] md:text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-white/10 rounded-full border border-gray-200 dark:border-white/10">
              App v2.1.0
            </span>
          </div>
        </div>
      </div>

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setIsAboutOpen(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsAboutOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="font-yatra text-2xl text-gold-light mb-3">About Chaliyam Connect</h3>
            <p className="text-[14px] text-slate-300 leading-relaxed mb-5">
              Chaliyam Connect is a dedicated community platform designed to bring the people of Chaliyam together. It provides essential local information, bus timings, emergency contacts, and a directory of local businesses, all in one accessible place.
            </p>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-[14px] text-slate-200 font-medium m-0">
                Developed by <a href="https://mohdnihadkp.vercel.app" target="_blank" rel="noopener noreferrer" className="text-gold-light font-bold hover:text-gold transition-colors">mohdnihadkp</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Guidelines Modal */}
      {isGuidelinesOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setIsGuidelinesOpen(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsGuidelinesOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="font-yatra text-2xl text-gold-light mb-3 flex items-center gap-2">
              <BookOpen size={24} /> Community Guidelines
            </h3>
            <div className="text-[14px] text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <p className="mb-3">
                Welcome to Chaliyam Connect! To keep this platform helpful and safe for everyone, please adhere to the following guidelines:
              </p>
              <p className="mb-3">
                <strong>1. Respectful Interaction:</strong> Treat all community members with respect. Harassment, hate speech, and abusive language will not be tolerated in comments or submissions.
              </p>
              <p className="mb-3">
                <strong>2. Accurate Information:</strong> When submitting business listings, news, or profiles, ensure the information is accurate and up-to-date. Do not post misleading content.
              </p>
              <p className="mb-3">
                <strong>3. No Spam:</strong> Avoid posting repetitive content, irrelevant links, or excessive self-promotion outside of the designated Business Directory.
              </p>
              <p className="mb-3">
                <strong>4. Privacy Matters:</strong> Do not share personal information (like phone numbers or addresses) of others without their explicit consent.
              </p>
              <p>
                <strong>5. Local Relevance:</strong> Keep content relevant to the Chaliyam community, its people, events, and businesses.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => setIsGuidelinesOpen(false)}
                className="bg-gold hover:bg-gold-light text-slate-900 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setIsPrivacyOpen(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsPrivacyOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="font-yatra text-2xl text-gold-light mb-3 flex items-center gap-2">
              <Shield size={24} /> Privacy Policy
            </h3>
            <div className="text-[14px] text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <p className="mb-3">
                <strong>1. Information Collection:</strong> We collect minimal information necessary to provide community services. This may include names, contact numbers, and business details submitted voluntarily by users.
              </p>
              <p className="mb-3">
                <strong>2. Use of Information:</strong> The information provided is used solely for displaying in the community directory (People, Business, News) to help locals connect with each other.
              </p>
              <p className="mb-3">
                <strong>3. Data Sharing:</strong> We do not sell or share your personal information with third parties for marketing purposes. Information displayed on the platform is public to other users of Chaliyam Connect.
              </p>
              <p className="mb-3">
                <strong>4. User Control:</strong> You can request the removal or modification of your listed information at any time by contacting us.
              </p>
              <p>
                <strong>5. Cookies:</strong> We may use basic cookies to enhance user experience (like keeping you logged in or remembering preferences).
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="bg-gold hover:bg-gold-light text-slate-900 px-5 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Modal */}
      {isIgOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setIsIgOpen(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-sm w-full text-left shadow-2xl relative animate-[fadeUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsIgOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-red-400 transition-colors border border-white/10 cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="font-yatra text-xl text-gold-light mb-5 flex items-center gap-2">
              <Instagram className="text-pink-500" size={22} /> Chaliyam on Instagram
            </h3>
            <div className="flex flex-col gap-3">
              {igPages.map((page, idx) => (
                <a 
                  key={idx} 
                  href={page.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-slate-200 no-underline group"
                >
                  <span className="font-medium text-[14px] group-hover:text-gold-light transition-colors">{page.name}</span>
                  <span className="text-[11px] font-semibold text-gold-light bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-md uppercase tracking-wide">Visit</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        initialType={feedbackInitialType} 
      />
    </footer>
  );
}
