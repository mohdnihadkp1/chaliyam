import { X, Send, ShoppingBag } from 'lucide-react';

export default function DeliveryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleSimpleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const request = fd.get('request');
    const address = fd.get('address');
    const phone = fd.get('phone');
    
    let text = `*🛍️ CHALIYAM CONNECT: HOME DELIVERY ORDER* 🛍️\n\n`;
    text += `*Order Details:*\n${request}\n\n`;
    text += `*Delivery Address:*\n${address}\n\n`;
    text += `*Contact Number:*\n${phone}\n\n`;
    text += `Please arrange delivery. Thank you!`;

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = "919846750898"; // Admin whatsapp reference
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[120] flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-[fadeUp_0.3s_ease] relative my-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 md:p-5 border-b border-white/10 bg-slate-900/50">
          <h3 className="font-yatra text-xl md:text-2xl text-gold-light flex items-center gap-2">
            <ShoppingBag size={22} /> Home Delivery Request
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSimpleOrder} className="p-5 flex flex-col gap-4">
          <p className="text-[11px] md:text-xs text-slate-400 mb-1 leading-relaxed bg-white/5 border border-white/5 p-3 rounded-lg shadow-inner">
            <strong className="text-gold-light">How it works:</strong> Simply list out what you need to buy and from which shops. Provide your accurate address and phone number. We'll read your list, purchase the items, and deliver directly to your beautiful home!
          </p>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">What do you need?</label>
            <textarea name="request" required rows={4} placeholder="E.g., 1kg Ayala from Beach Fish Market, 2 milk packets from Ameen Supermarket..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner resize-none"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">Delivery Address</label>
            <textarea name="address" required rows={2} placeholder="Your house name, exact location, or nearby landmark" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner resize-none"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">Contact Number</label>
            <input type="tel" name="phone" required placeholder="e.g. +91 98765 43210" className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-gold/50 placeholder:text-slate-600 shadow-inner" />
          </div>

          <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-[#25D366]/20 transition-all text-base mt-2">
            <Send size={20} /> Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
