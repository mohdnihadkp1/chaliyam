import { useState } from 'react';
import { Instagram, Facebook, X, Palmtree, Mail, Shield, MessageSquare, Send, BookOpen } from 'lucide-react';

export default function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isIgOpen, setIsIgOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  const igPages = [
    { name: "@kl85chaliyam", url: "https://www.instagram.com/kl85chaliyam/?utm_source=ig_web_button_share_sheet" },
    { name: "@chaliyam.official", url: "https://www.instagram.com/chaliyam.official/?utm_source=ig_web_button_share_sheet" },
    { name: "@chaliyam_official", url: "https://www.instagram.com/chaliyam_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
    { name: "@explore_chaliyam", url: "https://www.instagram.com/explore_chaliyam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-center py-[30px] px-6 mt-10 border-t border-white/10 relative">
      <div className="font-yatra text-2xl text-gold-light mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
        <Palmtree size={24} className="text-gold-light" /> Chaliyam Connect
      </div>
      <p className="text-[13px] leading-[1.8] text-slate-400">ചാലിയം • Kozhikode, Kerala — A free community platform for the people of Chaliyam</p>
      
      <div className="flex justify-center gap-5 mt-5 mb-2">
        <button 
          onClick={() => setIsIgOpen(true)} 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-gold-light transition-all cursor-pointer backdrop-blur-md hover:shadow-[0_0_15px_rgba(201,148,26,0.15)]"
          title="Instagram Pages"
        >
          <Instagram size={18} />
        </button>
        <a 
          href="https://www.facebook.com/share/1BW6L4yPdY/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-gold-light transition-all backdrop-blur-md hover:shadow-[0_0_15px_rgba(201,148,26,0.15)]"
          title="Facebook Page"
        >
          <Facebook size={18} />
        </a>
      </div>

      <div className="flex justify-center gap-5 my-4 flex-wrap">
        <button onClick={() => setIsAboutOpen(true)} className="text-slate-400 bg-transparent border-none cursor-pointer text-[13px] transition-colors hover:text-gold-light p-0 flex items-center gap-1.5"><Palmtree size={14}/> About</button>
        <button onClick={() => setIsGuidelinesOpen(true)} className="text-slate-400 bg-transparent border-none cursor-pointer text-[13px] transition-colors hover:text-gold-light p-0 flex items-center gap-1.5"><BookOpen size={14}/> Guidelines</button>
        <a href="mailto:mohdnihadkp@gmail.com?subject=Contact%20Chaliyam%20Connect" className="text-slate-400 no-underline text-[13px] transition-colors hover:text-gold-light flex items-center gap-1.5"><Mail size={14}/> Contact</a>
        <a href="mailto:mohdnihadkp@gmail.com?subject=Submit%20Info%20for%20Chaliyam%20Connect" className="text-slate-400 no-underline text-[13px] transition-colors hover:text-gold-light flex items-center gap-1.5"><Send size={14}/> Submit Info</a>
        <button onClick={() => setIsPrivacyOpen(true)} className="text-slate-400 bg-transparent border-none cursor-pointer text-[13px] transition-colors hover:text-gold-light p-0 flex items-center gap-1.5"><Shield size={14}/> Privacy</button>
        <a href="mailto:mohdnihadkp@gmail.com?subject=Feedback%20for%20Chaliyam%20Connect" className="text-slate-400 no-underline text-[13px] transition-colors hover:text-gold-light flex items-center gap-1.5"><MessageSquare size={14}/> Feedback</a>
      </div>
      
      <p className="text-[11px] text-slate-500">Made with ❤️ for the people of Chaliyam | Data may not be 100% accurate — verify before use</p>

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
                Developed by <a href="https://mohdnihadkp.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gold-light font-bold hover:text-gold transition-colors">Mohd Nihad KP</a>
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
    </footer>
  );
}
