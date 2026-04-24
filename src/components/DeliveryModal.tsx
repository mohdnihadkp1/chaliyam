import { X, Send, ShoppingBag, MapPin, Phone, ListChecks } from "lucide-react";

export default function DeliveryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const handleSimpleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const request = fd.get("request");
    const address = fd.get("address");
    const phone = fd.get("phone");

    let text = `*🛍️ CHALIYAM CONNECT: HOME DELIVERY ORDER* 🛍️\n\n`;
    text += `*Order Details:*\n${request}\n\n`;
    text += `*Delivery Address:*\n${address}\n\n`;
    text += `*Contact Number:*\n${phone}\n\n`;
    text += `Please arrange delivery. Thank you!`;

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = "919846750898"; /* Admin whatsapp reference */
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl relative animate-slide-up sm:animate-scale-up-center flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
              <ShoppingBag size={20} />
            </div>
            Home Delivery Request
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full active:scale-95 transition-all outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSimpleOrder} className="p-5 md:p-6 flex flex-col gap-5 overflow-y-auto pb-safe-bottom">
          <p className="text-sm text-slate-500 mb-2 leading-relaxed bg-indigo-50 border border-indigo-100/50 p-4 rounded-2xl">
            <strong className="text-indigo-700 font-bold block mb-1">How it works:</strong>
            List out what you need to buy and from which shops. Provide your accurate address and phone number. We'll purchase the items and deliver directly to your beautiful home!
          </p>

          <div className="group flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">What do you need?</label>
            <div className="relative flex items-start group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
              <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <ListChecks size={18} />
              </div>
              <textarea
                name="request"
                required
                rows={3}
                placeholder="E.g., 1kg Ayala from Beach Fish Market, 2 milk packets..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 resize-none transition-all"
              ></textarea>
            </div>
          </div>

          <div className="group flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Delivery Address</label>
            <div className="relative flex items-start group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
              <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <MapPin size={18} />
              </div>
              <textarea
                name="address"
                required
                rows={2}
                placeholder="Your house name, exact location, or nearby landmark"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 resize-none transition-all"
              ></textarea>
            </div>
          </div>

          <div className="group flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Contact Number</label>
            <div className="relative flex items-center group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
              <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all text-base mt-2 active:scale-95"
          >
            <Send size={18} className="animate-pulse" /> Send Order via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
