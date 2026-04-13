import { useState } from 'react';
import { NEWS } from '../data';
import { Search, Plus, X, Share2, Copy, MessageCircle, ChevronDown, ChevronUp, Calendar, Bell, Leaf, AlertCircle, Trophy, FileText, Newspaper } from 'lucide-react';

export default function NewsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', date: '', type: 'Event', name: '' });
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [shareModal, setShareModal] = useState<any>(null);

  const filteredNews = NEWS.filter(n => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = n.title.toLowerCase().includes(q) || 
           n.desc.toLowerCase().includes(q) || 
           n.type.toLowerCase().includes(q);
    
    const matchesDate = filterDate ? (n as any).eventDate === filterDate : true;
    
    return matchesSearch && matchesDate;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleShare = (news: any) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.desc,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setShareModal(news);
    }
  };

  const copyToClipboard = () => {
    if (!shareModal) return;
    const text = `${shareModal.title}\n${shareModal.desc}\n\nRead more on Chaliyam Connect: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
    setShareModal(null);
  };

  const shareToWhatsApp = () => {
    if (!shareModal) return;
    const text = `${shareModal.title}\n${shareModal.desc}\n\nRead more on Chaliyam Connect: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    setShareModal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Submission for Chaliyam Connect*\n\n*Type:* ${formData.type}\n*Title:* ${formData.title}\n*Date:* ${formData.date}\n*Description:* ${formData.desc}\n*Submitted by:* ${formData.name}`;
    window.open(`https://wa.me/919846750898?text=${encodeURIComponent(message)}`, '_blank');
    setIsSubmitModalOpen(false);
    setFormData({ title: '', desc: '', date: '', type: 'Event', name: '' });
  };

  const getNewsIcon = (type: string) => {
    switch(type) {
      case 'Event': return <Calendar size={24} />;
      case 'Notice': return <Bell size={24} />;
      case 'News': return <Leaf size={24} />;
      case 'Alert': return <AlertCircle size={24} />;
      case 'Sports': return <Trophy size={24} />;
      case 'Govt': return <FileText size={24} />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-yatra text-2xl md:text-3xl mb-1.5 flex items-center gap-3 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            <Newspaper className="text-gold-light" size={28} />
            News & <span className="text-gold-light">Events</span>
          </h2>
          <p className="text-slate-400 text-sm">
            ചാലിയം വാർത്തകൾ — Community news, events and announcements
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold-light px-4 py-2.5 rounded-xl font-medium hover:bg-gold/30 transition-colors shadow-inner backdrop-blur-md"
        >
          <Plus size={18} />
          Submit News
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search news, events, announcements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 placeholder:text-slate-500 shadow-inner"
          />
        </div>
        <div className="relative">
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full md:w-auto px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 shadow-inner"
          />
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-400"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
          className="px-4 py-3 rounded-xl border border-white/10 bg-slate-900 text-sm font-sans text-slate-200 outline-none transition-colors focus:border-gold/50 appearance-none cursor-pointer min-w-[140px] shadow-inner"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sortedNews.length > 0 ? (
          sortedNews.map((news, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <div 
                key={index} 
                onClick={() => toggleExpand(index)}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(201,148,26,0.1)] cursor-pointer"
              >
                {news.image ? (
                  <div className={`w-full relative overflow-hidden transition-all duration-300 ${isExpanded ? 'h-64' : 'h-48'}`}>
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/10">
                      <span className="text-gold-light">{getNewsIcon(news.type)}</span>
                      <span className="text-[11px] font-bold tracking-wide uppercase text-gold-light">{news.type}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/50 p-5 flex items-center gap-3.5 border-b border-white/10 shadow-inner">
                    <div className="text-gold-light">{getNewsIcon(news.type)}</div>
                    <div className="text-white">
                      <div>
                        <span className="bg-gold/20 border border-gold/30 text-gold-light px-2 py-0.5 rounded text-[11px] font-semibold">
                          {news.type}
                        </span>
                      </div>
                      <div className="text-[11px] opacity-70 mt-1 flex items-center gap-1"><Calendar size={12} /> {news.date}</div>
                    </div>
                  </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[11px] text-gold-light font-medium flex items-center gap-1"><Calendar size={12} /> {news.date}</div>
                    {(news as any).eventDate && (
                      <div className="text-[10px] bg-white/10 text-gold-light px-2 py-1 rounded-md font-semibold border border-white/10">
                        Event: {(news as any).eventDate}
                      </div>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-200 mb-2">{news.title}</h3>
                  
                  <div className="mb-4">
                    <p className={`text-[13px] text-slate-400 leading-[1.6] ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {news.desc}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }} 
                      className="text-gold-light hover:text-gold transition-colors text-xs font-semibold mt-1.5 flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>Read Less <ChevronUp size={14} /></>
                      ) : (
                        <>Read More <ChevronDown size={14} /></>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-end">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(news);
                      }}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-gold-light transition-colors text-sm font-medium"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center text-slate-400">
            No news or events found matching your search.
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-white/10 bg-slate-800/50">
              <h3 className="font-semibold text-lg text-gold-light">Share News</h3>
              <button onClick={() => setShareModal(null)} className="text-slate-400 hover:text-red-400 transition-colors bg-white/5 p-1.5 rounded-full border border-white/10">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <button 
                onClick={shareToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366]/90 hover:bg-[#25D366] border border-[#25D366]/50 text-white py-3 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(37,211,102,0.2)]"
              >
                <MessageCircle size={20} />
                Share via WhatsApp
              </button>
              <button 
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 py-3 rounded-xl font-medium transition-colors border border-white/10"
              >
                <Copy size={20} />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="bg-slate-800/50 border-b border-white/10 p-4 flex items-center justify-between text-white">
              <h3 className="font-yatra text-xl text-gold-light">Submit News / Event</h3>
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 hover:text-red-400 text-slate-400 transition-colors border border-white/10"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 outline-none focus:border-gold/50 focus:bg-white/10 appearance-none shadow-inner"
                  required
                >
                  <option value="Event" className="bg-slate-900">Event</option>
                  <option value="News" className="bg-slate-900">News</option>
                  <option value="Notice" className="bg-slate-900">Notice</option>
                  <option value="Alert" className="bg-slate-900">Alert</option>
                  <option value="Sports" className="bg-slate-900">Sports</option>
                  <option value="Govt" className="bg-slate-900">Govt</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 outline-none focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500 shadow-inner"
                  placeholder="e.g. Football Tournament"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date / Time</label>
                <input 
                  type="text" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 outline-none focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500 shadow-inner"
                  placeholder="e.g. Next Sunday, 4 PM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                <textarea 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 outline-none focus:border-gold/50 focus:bg-white/10 min-h-[100px] resize-none placeholder:text-slate-500 shadow-inner"
                  placeholder="Provide details about the news or event..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-200 outline-none focus:border-gold/50 focus:bg-white/10 placeholder:text-slate-500 shadow-inner"
                  placeholder="Your name for reference"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#25D366]/90 hover:bg-[#25D366] border border-[#25D366]/50 text-white font-medium py-3 rounded-xl transition-colors mt-2 shadow-[0_0_15px_rgba(37,211,102,0.2)]"
              >
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
