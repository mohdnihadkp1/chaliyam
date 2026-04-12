import { useState, useEffect } from 'react';
import { NEWS } from '../data';
import { Search, Plus, X, Share2, Copy, MessageCircle, ChevronDown, ChevronUp, Calendar, Bell, Leaf, AlertCircle, Trophy, FileText, Newspaper, Send } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, where, serverTimestamp } from 'firebase/firestore';

interface Comment {
  id: string;
  newsId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  createdAt: any;
}

function NewsComments({ newsId }: { newsId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'news_comments'), where('newsId', '==', newsId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments: Comment[] = [];
      snapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() } as Comment);
      });
      // Sort locally to avoid needing a composite index in Firestore
      fetchedComments.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeA - timeB; // Oldest first
      });
      setComments(fetchedComments);
    }, (error) => {
      console.error("Error fetching comments:", error);
    });

    return () => unsubscribe();
  }, [newsId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'news_comments'), {
        newsId,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'A')}&background=random`,
        text: newComment.trim(),
        createdAt: serverTimestamp()
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-green-pale dark:border-gold/10">
      <h4 className="text-sm font-semibold text-text-dark dark:text-white mb-3 flex items-center gap-2">
        <MessageCircle size={16} /> Comments ({comments.length})
      </h4>
      
      <div className="flex flex-col gap-3 mb-4 max-h-[200px] overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <p className="text-xs text-text-light italic">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2.5">
              <img 
                src={comment.userPhoto} 
                alt={comment.userName} 
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
              <div className="bg-green-pale/50 dark:bg-[#0f2919]/50 rounded-xl rounded-tl-none p-2.5 flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-semibold text-green-deep dark:text-gold-light">{comment.userName}</span>
                </div>
                <p className="text-[13px] text-text-dark dark:text-white/90 leading-snug">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-white dark:bg-[#143321] border border-green-deep/20 dark:border-gold/20 rounded-xl px-3 py-2 text-[13px] text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="bg-gold hover:bg-gold-light text-white w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors shrink-0"
          >
            <Send size={14} />
          </button>
        </form>
      ) : (
        <div className="bg-green-pale/30 dark:bg-white/5 rounded-xl p-3 text-center">
          <p className="text-xs text-text-light">Please log in to post a comment.</p>
        </div>
      )}
    </div>
  );
}

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
    <div className="py-10 px-6 max-w-7xl mx-auto animate-[fadeUp_0.4s_ease]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-yatra text-[28px] text-green-deep mb-1.5 flex items-center gap-3">
            <Newspaper className="text-gold" size={28} />
            News & <span className="text-gold">Events</span>
          </h2>
          <p className="text-text-light text-sm">
            ചാലിയം വാർത്തകൾ — Community news, events and announcements
          </p>
        </div>
        <button 
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 bg-gold text-white px-4 py-2.5 rounded-xl font-medium hover:bg-gold-light transition-colors shadow-sm"
        >
          <Plus size={18} />
          Submit News
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-light/70" size={18} />
          <input 
            type="text" 
            placeholder="Search news, events, announcements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold placeholder:text-text-light/70 dark:placeholder:text-text-light/50"
          />
        </div>
        <div className="relative">
          <input 
            type="date" 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full md:w-auto px-4 py-3 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold"
          />
          {filterDate && (
            <button 
              onClick={() => setFilterDate('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-red-500 bg-white dark:bg-[#1a2e20]"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
          className="px-4 py-3 rounded-xl border-[1.5px] border-green-deep/20 dark:border-gold/20 bg-white dark:bg-[#1a2e20] text-sm font-sans text-text-dark dark:text-white outline-none transition-colors focus:border-green-mid dark:focus:border-gold appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {sortedNews.length > 0 ? (
          sortedNews.map((news, index) => {
            const isExpanded = expandedItems.has(index);
            return (
              <div 
                key={index} 
                onClick={() => toggleExpand(index)}
                className="bg-white dark:bg-[#1a2e20] rounded-2xl overflow-hidden border border-green-deep/20 dark:border-gold/20 shadow-[0_4px_24px_rgba(26,74,46,0.12)] flex flex-col transition-transform duration-250 hover:-translate-y-1 cursor-pointer"
              >
                {news.image ? (
                  <div className={`w-full relative overflow-hidden transition-all duration-300 ${isExpanded ? 'h-64' : 'h-48'}`}>
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <span className="text-green-deep dark:text-gold-light">{getNewsIcon(news.type)}</span>
                      <span className="text-[11px] font-bold tracking-wide uppercase text-green-deep dark:text-gold-light">{news.type}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-green-deep to-green-mid dark:from-[#0f2919] dark:to-[#143321] p-5 flex items-center gap-3.5">
                    <div className="text-gold-light">{getNewsIcon(news.type)}</div>
                    <div className="text-white">
                      <div>
                        <span className="bg-gold text-white px-2 py-0.5 rounded text-[11px] font-semibold">
                          {news.type}
                        </span>
                      </div>
                      <div className="text-[11px] opacity-70 mt-1 flex items-center gap-1"><Calendar size={12} /> {news.date}</div>
                    </div>
                  </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-[11px] text-gold-dark dark:text-gold font-medium flex items-center gap-1"><Calendar size={12} /> {news.date}</div>
                    {(news as any).eventDate && (
                      <div className="text-[10px] bg-green-pale dark:bg-[#0f2919] text-green-deep dark:text-gold-light px-2 py-1 rounded-md font-semibold border border-green-deep/10 dark:border-gold/10">
                        Event: {(news as any).eventDate}
                      </div>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold text-text-dark dark:text-white mb-2">{news.title}</h3>
                  
                  <div className="mb-4">
                    <p className={`text-[13px] text-text-light leading-[1.6] ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {news.desc}
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }} 
                      className="text-gold-dark dark:text-gold hover:text-gold transition-colors text-xs font-semibold mt-1.5 flex items-center gap-1"
                    >
                      {isExpanded ? (
                        <>Read Less <ChevronUp size={14} /></>
                      ) : (
                        <>Read More <ChevronDown size={14} /></>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-green-pale dark:border-gold/10 flex justify-end">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(news);
                      }}
                      className="flex items-center gap-1.5 text-text-light hover:text-gold-dark dark:hover:text-gold transition-colors text-sm font-medium"
                    >
                      <Share2 size={16} />
                      Share
                    </button>
                  </div>
                  
                  {/* Comments Section */}
                  {isExpanded && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <NewsComments newsId={news.title} />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-10 text-center text-text-light">
            No news or events found matching your search.
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f2919] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="flex justify-between items-center p-4 border-b border-green-deep/10 dark:border-gold/10">
              <h3 className="font-semibold text-lg text-green-deep dark:text-gold-light">Share News</h3>
              <button onClick={() => setShareModal(null)} className="text-text-light hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <button 
                onClick={shareToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-medium transition-colors"
              >
                <MessageCircle size={20} />
                Share via WhatsApp
              </button>
              <button 
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 bg-green-pale dark:bg-white/5 hover:bg-green-deep hover:text-white dark:hover:bg-white/10 text-green-deep dark:text-white py-3 rounded-xl font-medium transition-colors"
              >
                <Copy size={20} />
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-green-deep/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1a2e20] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-[fadeUp_0.3s_ease]">
            <div className="bg-gradient-to-r from-green-deep to-green-mid p-4 flex items-center justify-between text-white">
              <h3 className="font-yatra text-xl text-gold-light">Submit News / Event</h3>
              <button 
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1">Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-transparent text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold"
                  required
                >
                  <option value="Event" className="text-text-dark">Event</option>
                  <option value="News" className="text-text-dark">News</option>
                  <option value="Notice" className="text-text-dark">Notice</option>
                  <option value="Alert" className="text-text-dark">Alert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-transparent text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold"
                  placeholder="e.g. Football Tournament"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1">Date / Time</label>
                <input 
                  type="text" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-transparent text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold"
                  placeholder="e.g. Next Sunday, 4 PM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1">Description</label>
                <textarea 
                  value={formData.desc}
                  onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-transparent text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold min-h-[100px] resize-none"
                  placeholder="Provide details about the news or event..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark dark:text-white mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl border border-green-deep/20 dark:border-gold/20 bg-transparent text-text-dark dark:text-white outline-none focus:border-green-mid dark:focus:border-gold"
                  placeholder="Your name for reference"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-white font-medium py-3 rounded-xl transition-colors mt-2"
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
