import { X, Send, User, Phone, MapPin, Package, Clock, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const phone = fd.get("phone");
    const address = fd.get("address");
    const items = fd.get("items");
    const time = fd.get("time");
    const payment = fd.get("payment");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      let text = `*🛍️ NEW ADVANCED ORDER* 🛍️\n\n`;
      text += `*Customer:* ${name}\n`;
      text += `*Phone:* ${phone}\n`;
      text += `*Delivery Address:*\n${address}\n\n`;
      text += `*Order Items:*\n${items}\n\n`;
      text += `*Preferred Time:* ${time}\n`;
      text += `*Payment Method:* ${payment}\n\n`;
      
      const encodedText = encodeURIComponent(text);
      const whatsappNumber = "919846750898";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
      
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/');
      }, 1500);
    }, 1500); // Simulate network request
  };

  return (
    <div className="w-full pb-24 md:pb-8 min-h-screen bg-gray-50 animate-fade-in pt-6 px-4 md:px-8 max-w-2xl mx-auto flex flex-col justify-center">
      <div className={`bg-white w-full sm:rounded-3xl rounded-3xl overflow-hidden shadow-sm border border-[var(--color-outline)] relative  ${isSuccess ? 'h-64 flex items-center justify-center' : ''}`}>
        {isSuccess ? (
          <div className="text-center animate-fade-in flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Order Placed!</h3>
            <p className="text-slate-500 mt-2">Redirecting to WhatsApp...</p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 flex justify-between items-center p-5 border-b border-[var(--color-outline)]">
              <div>
                <h3 className="font-yatra text-2xl text-[var(--color-primary)] flex items-center gap-2">
                  Place Order
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Fast Home Delivery in Chaliyam</p>
              </div>
              <button
                onClick={handleClose}
                className="text-[var(--color-on-surface-variant)] hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full active:scale-95 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="relative border border-[var(--color-outline)] rounded-2xl focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all bg-slate-50 overflow-hidden flex items-center">
                   <div className="pl-4 text-slate-400">
                      <User size={18} />
                   </div>
                   <input
                     type="text"
                     name="name"
                     required
                     placeholder="Full Name"
                     className="w-full bg-transparent p-3.5 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none"
                   />
                </div>
                {/* Phone */}
                <div className="relative border border-[var(--color-outline)] rounded-2xl focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all bg-slate-50 overflow-hidden flex items-center">
                   <div className="pl-4 text-slate-400">
                      <Phone size={18} />
                   </div>
                   <input
                     type="tel"
                     name="phone"
                     required
                     placeholder="Phone Number"
                     className="w-full bg-transparent p-3.5 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none"
                   />
                </div>
              </div>

              {/* Address */}
              <div className="relative border border-[var(--color-outline)] rounded-2xl focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all bg-slate-50 overflow-hidden">
                <div className="absolute top-4 left-4 text-slate-400">
                  <MapPin size={18} />
                </div>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="Delivery Address (House Name, Landmark...)"
                  className="w-full bg-transparent py-3.5 pr-4 pl-12 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* Items */}
              <div className="relative border border-[var(--color-outline)] rounded-2xl focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all bg-slate-50 overflow-hidden">
                <div className="absolute top-4 left-4 text-slate-400">
                  <Package size={18} />
                </div>
                <textarea
                  name="items"
                  required
                  rows={3}
                  placeholder="What do you need? (e.g. 1kg Fish, 2 Packets Milk)"
                  className="w-full bg-transparent py-3.5 pr-4 pl-12 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none resize-none leading-relaxed"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Time Preference */}
                <div className="relative border border-[var(--color-outline)] rounded-2xl focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all bg-slate-50 overflow-hidden flex items-center pr-2">
                  <div className="pl-4 text-slate-400">
                    <Clock size={18} />
                  </div>
                  <select
                    name="time"
                    className="w-full bg-transparent p-3.5 text-slate-800 text-sm focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="As Soon As Possible">As Soon As Possible</option>
                    <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div className="border border-[var(--color-outline)] rounded-2xl bg-slate-50 p-3.5 flex flex-col gap-2 relative">
                   <div className="text-xs font-bold text-[var(--color-on-surface-variant)] uppercase tracking-wider mb-1 flex items-center gap-1.5 flex-wrap"><CreditCard size={14}/> Payment</div>
                   <div className="flex items-center gap-4">
                     <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                       <input type="radio" name="payment" value="Cash on Delivery" className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-slate-300" defaultChecked />
                       COD
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                       <input type="radio" name="payment" value="UPI / Online" className="w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-slate-300" />
                       UPI / Online
                     </label>
                   </div>
                </div>
              </div>

              <div className="pt-2 sticky bottom-0 bg-white pb-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-primary)] hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all text-base active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} /> Submit Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
