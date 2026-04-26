import React, { useState } from 'react';
import { X, Copy, MessageCircle, Twitter, Facebook, Link as LinkIcon, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  url: string;
  imageUrl?: string;
}

export function ShareModal({ isOpen, onClose, title, text, url, imageUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `${title}${text ? `\n${text}` : ''}\n\nRead more on Chaliyam Connect: ${url}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    onClose();
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
    onClose();
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative z-10 animate-scale-up border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-slate-800">Share</h3>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {imageUrl && (
          <div className="w-full aspect-[2/1] rounded-xl overflow-hidden mb-5 bg-slate-50 border border-slate-100 shadow-inner block">
             <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mb-6">
          <button 
            onClick={shareToWhatsApp}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#E8F8F1] text-[#25D366] flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all">
              <MessageCircle size={24} />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">WhatsApp</span>
          </button>
          
          <button 
            onClick={shareToTwitter}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#E1F0F8] text-[#1DA1F2] flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all">
              <Twitter size={24} />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Twitter</span>
          </button>

          <button 
             onClick={shareToFacebook}
             className="flex flex-col items-center gap-2 group"
          >
            <div className="w-12 h-12 rounded-full bg-[#E7EFFF] text-[#1877F2] flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all">
               <Facebook size={24} />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Facebook</span>
          </button>

          <button 
             onClick={copyToClipboard}
             className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-700'}`}>
               {copied ? <Check size={24} /> : <LinkIcon size={24} />}
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              {copied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between gap-2">
            <span className="text-sm text-slate-500 truncate select-all">{url}</span>
            <button 
              onClick={copyToClipboard}
              className="p-2 shrink-0 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-lg transition-colors"
            >
              <Copy size={16} />
            </button>
        </div>
      </div>
    </div>
  );
}
