import { X, Send, MessageSquare, AlertTriangle, Lightbulb, FileEdit, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FeedbackModal({ isOpen, onClose, initialType = 'feedback' }: { isOpen: boolean; onClose: () => void; initialType?: string }) {
  const [feedbackType, setFeedbackType] = useState(initialType);
  const [importance, setImportance] = useState('medium');

  useEffect(() => {
    if (isOpen) {
      setFeedbackType(initialType);
      setImportance('medium');
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name');
    const emailStr = fd.get('email');
    const description = fd.get('description');
    
    let text = `*🌟 CHALIYAM CONNECT: DESK SUBMISSION* 🌟\n\n`;
    text += `*Type:* ${feedbackType.toUpperCase()}\n`;
    if (feedbackType === 'bug' || feedbackType === 'correction') {
      text += `*Priority/Severity:* ${importance.toUpperCase()}\n`;
    }
    text += `\n*From:* ${name} ${emailStr ? `(${emailStr})` : ''}\n\n`;
    text += `*Message / Details:*\n${description}\n\n`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappNumber = "919846750898"; // Admin whatsapp reference
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
    onClose();
  };

  const getIcon = () => {
    switch(feedbackType) {
      case 'bug': return <AlertTriangle size={20} className="text-red-400" />;
      case 'suggestion': return <Lightbulb size={20} className="text-yellow-400" />;
      case 'correction': return <FileEdit size={20} className="text-blue-400" />;
      case 'contribute': return <Users size={20} className="text-emerald-400" />;
      default: return <MessageSquare size={20} className="text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[120] flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-[fadeUp_0.3s_ease] relative my-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 md:p-5 border-b border-white/10 bg-slate-900/50">
          <h3 className="font-yatra text-xl md:text-2xl text-gold-light flex items-center gap-2">
            {getIcon()} Advanced Feedback Desk
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleFeedbackSubmit} className="p-4 md:p-5 flex flex-col gap-4">
          <p className="text-[11px] md:text-sm text-slate-300 mb-1 leading-relaxed bg-white/5 border border-white/5 p-3 md:p-4 rounded-xl shadow-inner">
            <strong className="text-gold-light">Help us improve:</strong> Experiencing a bug, want to contribute to the directory, or have a suggestion? Fill out the details below and it will be sent directly to our development team via WhatsApp!
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Request Type</label>
              <select 
                value={feedbackType} 
                onChange={(e) => setFeedbackType(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 shadow-inner cursor-pointer"
              >
                <option value="feedback">General Feedback</option>
                <option value="bug">Report a Bug / Issue</option>
                <option value="correction">Data Correction</option>
                <option value="suggestion">Feature Suggestion</option>
                <option value="contribute">Contribute Directory Info</option>
              </select>
            </div>
            
            {(feedbackType === 'bug' || feedbackType === 'correction') && (
              <div className="col-span-2 sm:col-span-1 animate-[fadeIn_0.2s_ease]">
                <label className="block text-sm font-medium text-slate-200 mb-1.5">Severity</label>
                <select 
                  value={importance} 
                  onChange={(e) => setImportance(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 shadow-inner cursor-pointer"
                >
                  <option value="low">Low (Minor typo/glitch)</option>
                  <option value="medium">Medium (Annoying but usable)</option>
                  <option value="high">High (Broken feature)</option>
                  <option value="critical">Critical (App crashing)</option>
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Your Name</label>
              <input type="text" name="name" required placeholder="John Doe" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-slate-200 mb-1.5">Email / Phone (Optional)</label>
              <input type="text" name="email" placeholder="To reach back..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              {feedbackType === 'contribute' ? 'Information Details' : 'Description'}
            </label>
            <textarea name="description" required rows={4} placeholder={feedbackType === 'bug' ? "What happened? How can we reproduce it?" : feedbackType === 'contribute' ? "E.g., Please add 'Ameen Supermarket' with contact 9876543210..." : "Tell us what's on your mind..."} className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner resize-none"></textarea>
          </div>
          
          <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-[#25D366]/20 transition-all text-base mt-2">
            <Send size={20} /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
