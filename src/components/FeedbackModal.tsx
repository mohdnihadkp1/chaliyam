import {
  X,
  Send,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  FileEdit,
  Users,
  User,
  AtSign,
  AlignLeft,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function FeedbackModal({
  isOpen,
  onClose,
  initialType = "feedback",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialType?: string;
}) {
  const [feedbackType, setFeedbackType] = useState(initialType);
  const [importance, setImportance] = useState("medium");

  useEffect(() => {
    if (isOpen) {
      setFeedbackType(initialType);
      setImportance("medium");
    }
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const emailStr = fd.get("email");
    const description = fd.get("description");

    let text = `*🌟 CHALIYAM CONNECT: DESK SUBMISSION* 🌟\n\n`;
    text += `*Type:* ${feedbackType.toUpperCase()}\n`;
    if (feedbackType === "bug" || feedbackType === "correction") {
      text += `*Priority/Severity:* ${importance.toUpperCase()}\n`;
    }
    text += `\n*From:* ${name} ${emailStr ? `(${emailStr})` : ""}\n\n`;
    text += `*Message / Details:*\n${description}\n\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappNumber = "919846750898";
    /* Admin whatsapp reference */
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, "_blank");
    onClose();
  };

  const getIcon = () => {
    switch (feedbackType) {
      case "bug":
        return <AlertTriangle size={20} className="text-red-500" />;
      case "suggestion":
        return <Lightbulb size={20} className="text-amber-500" />;
      case "correction":
        return <FileEdit size={20} className="text-blue-500" />;
      case "contribute":
        return <Users size={20} className="text-emerald-500" />;
      default:
        return <MessageSquare size={20} className="text-indigo-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border border-slate-100 relative animate-slide-up sm:animate-scale-up-center flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-3">
            <div className={`p-2 rounded-xl ${
              feedbackType === 'bug' ? 'bg-red-100' :
              feedbackType === 'suggestion' ? 'bg-amber-100' :
              feedbackType === 'correction' ? 'bg-blue-100' :
              feedbackType === 'contribute' ? 'bg-emerald-100' :
              'bg-indigo-100'
            }`}>
              {getIcon()}
            </div>
            Advanced Feedback Desk
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full active:scale-95 transition-all outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleFeedbackSubmit}
          className="p-5 md:p-6 flex flex-col gap-5 overflow-y-auto pb-safe-bottom"
        >
          <p className="text-sm text-slate-500 mb-1 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-2xl">
            <strong className="text-slate-800 font-bold block mb-1">Help us improve:</strong>
            Experiencing a bug, want to contribute to the directory, or have a suggestion? Fill out the details below and it will be sent directly to our development team via WhatsApp!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Request Type</label>
              <div className="relative flex items-center group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
                >
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Report a Bug / Issue</option>
                  <option value="correction">Data Correction</option>
                  <option value="suggestion">Feature Suggestion</option>
                  <option value="contribute">Contribute Directory Info</option>
                </select>
              </div>
            </div>

            {(feedbackType === "bug" || feedbackType === "correction") && (
              <div className="group flex flex-col gap-1.5 animate-[fadeIn_0.2s_ease]">
                <label className="text-sm font-semibold text-slate-700 ml-1">Severity</label>
                <div className="relative flex items-center group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
                  <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer font-medium"
                  >
                    <option value="low">Low (Minor typo/glitch)</option>
                    <option value="medium">Medium (Annoying but usable)</option>
                    <option value="high">High (Broken feature)</option>
                    <option value="critical">Critical (App crashing)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Your Name</label>
              <div className="relative flex items-center group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
                <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all font-medium"
                />
              </div>
            </div>

            <div className="group flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email / Phone (Optional)</label>
              <div className="relative flex items-center group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
                <div className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <AtSign size={18} />
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="To reach back..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="group flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">
              {feedbackType === "contribute" ? "Information Details" : "Description"}
            </label>
            <div className="relative flex items-start group-focus-within:ring-2 ring-indigo-500/20 rounded-2xl transition-all">
              <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <AlignLeft size={18} />
              </div>
              <textarea
                name="description"
                required
                rows={4}
                placeholder={
                  feedbackType === "bug"
                    ? "What happened? How can we reproduce it?"
                    : feedbackType === "contribute"
                    ? "E.g., Please add 'Ameen Supermarket' with contact 9876543210..."
                    : "Tell us what's on your mind..."
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-11 pr-4 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 resize-none transition-all"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all text-base mt-2 active:scale-95"
          >
            <Send size={18} className="animate-pulse" /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
