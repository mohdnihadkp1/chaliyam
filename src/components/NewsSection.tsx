import InFeedAdCard from "./InFeedAdCard";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useState } from"react";
import { NEWS } from"../data";
import {
 Search,
 Plus,
 X,
 Share2,
 Copy,
 MessageCircle,
 ChevronDown,
 ChevronUp,
 Calendar,
 Bell,
 Leaf,
 AlertCircle,
 Trophy,
 FileText,
 Newspaper,
} from"lucide-react";
export default function NewsSection() {
 const [searchQuery, setSearchQuery] = useState("");
 const [filterDate, setFilterDate] = useState("");
 const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
 const [formData, setFormData] = useState({
 title:"",
 desc:"",
 date:"",
 type:"Event",
 name:"",
 });
 const [sortOrder, setSortOrder] = useState<"desc" |"asc">("desc");
 const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
 const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const shareModal = NEWS_UPDATES.find((d: any) => String(d.id || d.id) === selectedId) || null;
  const setShareModal = (item: any) => {
    if (item) {
      searchParams.set("id", String(item.id || item.id));
      setSearchParams(searchParams);
    } else {
      searchParams.delete("id");
      setSearchParams(searchParams);
    }
  };
 const filteredNews = NEWS.filter((n) => {
 const q = searchQuery.toLowerCase();
 const matchesSearch =
 n.title.toLowerCase().includes(q) ||
 n.desc.toLowerCase().includes(q) ||
 n.type.toLowerCase().includes(q);
 const matchesDate = filterDate ? (n as any).eventDate === filterDate : true;
 return matchesSearch && matchesDate;
 });
 const sortedNews = [...filteredNews].sort((a, b) => {
 const dateA = new Date(a.date).getTime();
 const dateB = new Date(b.date).getTime();
 return sortOrder ==="desc" ? dateB - dateA : dateA - dateB;
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
 navigator
 .share({
 title: news.title,
 text: news.desc,
 url: window.location.href,
 })
 .catch(console.error);
 } else {
 setShareModal(news);
 }
 };
 const copyToClipboard = () => {
 if (!shareModal) return;
 const text = `${shareModal.title}\n${shareModal.desc}\n\nRead more on Chaliyam Connect: ${window.location.href}`;
 navigator.clipboard.writeText(text);
 alert("Copied to clipboard!");
 setShareModal(null);
 };
 const shareToWhatsApp = () => {
 if (!shareModal) return;
 const text = `${shareModal.title}\n${shareModal.desc}\n\nRead more on Chaliyam Connect: ${window.location.href}`;
 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");
 setShareModal(null);
 };
 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 const message = `*New Submission for Chaliyam Connect*\n\n*Type:* ${formData.type}\n*Title:* ${formData.title}\n*Date:* ${formData.date}\n*Description:* ${formData.desc}\n*Submitted by:* ${formData.name}`;
 window.open(
 `https://wa.me/919846750898?text=${encodeURIComponent(message)}`,
"_blank",
 );
 setIsSubmitModalOpen(false);
 setFormData({ title:"", desc:"", date:"", type:"Event", name:"" });
 };
 const getNewsIcon = (type: string) => {
 switch (type) {
 case"Event":
 return <Calendar size={24} />;
 case"Notice":
 return <Bell size={24} />;
 case"News":
 return <Leaf size={24} />;
 case"Alert":
 return <AlertCircle size={24} />;
 case"Sports":
 return <Trophy size={24} />;
 case"Govt":
 return <FileText size={24} />;
 default:
 return <FileText size={24} />;
 }
 };
 return (
    <>
      <Helmet>
        {shareModal ? (
          <script type="application/ld+json">
            {`${JSON.stringify({ "@context": "https://schema.org", "@type": "Event", name: shareModal.title, description: shareModal.desc, startDate: shareModal.date, location: { "@type": "Place", name: "Chaliyam" } })}`}
          </script>
        ) : (
          <script type="application/ld+json">
            {`${JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": NEWS_UPDATES.slice(0, 10).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": "https://chaliyam-connect.web.app" + window.location.pathname + "?id=" + (item.id || item.id)
              }))
            })}`}
          </script>
        )}
      </Helmet>
      
 <div className="py-4 md:py-6 px-3 md:px-4 max-w-7xl mx-auto animate-fade-in">
 
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-5 md:mb-8">
 
 <div>
 
 <h2 className="font-yatra text-xl md:text-3xl mb-1 md:mb-1.5 flex items-center gap-2 md:gap-3 text-black">
 
 <Newspaper className="text-[var(--color-primary)] w-6 h-6 md:w-7 md:h-7" />
 News &
 <span className="text-[var(--color-primary)]">Events</span>
 </h2>
 <p className="text-slate-500 text-xs md:text-sm">
 
 ചാലിയം വാർത്തകൾ — Community news, events and announcements
 </p>
 </div>
 <button
 onClick={() => navigate('/news/add')}
 className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 text-sm md:text-base border-transparent"
 >
 <Plus size={18} /> Submit News
 </button>
 </div>
 <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 mb-4 md:mb-6">
 
 <div className="relative flex-1">
 
 <Search className="absolute left-3 md:left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 md:w-[18px] md:h-[18px]" />
 <input
 type="text"
 placeholder="Search news, events, announcements..."
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-slate-50 backdrop-blur-md text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] placeholder:text-slate-500 shadow-inner"
 />
 </div>
 <div className="relative">
 
 <input
 type="date"
 value={filterDate}
 onChange={(e) => setFilterDate(e.target.value)}
 className="w-full md:w-auto px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-slate-50 backdrop-blur-md text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] shadow-inner"
 />
 {filterDate && (
 <button
 onClick={() => setFilterDate("")}
 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[var(--color-danger)]"
 >
 
 <X size={14} />
 </button>
 )}
 </div>
 <select
 value={sortOrder}
 onChange={(e) => setSortOrder(e.target.value as"desc" |"asc")}
 className="px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-[var(--color-outline)] bg-[var(--color-surface)] text-xs md:text-sm font-sans text-slate-800 outline-none transition-colors focus:border-[var(--color-primary)] appearance-none cursor-pointer min-w-[120px] md:min-w-[140px] shadow-inner"
 >
 
 <option value="desc">Newest First</option>
 <option value="asc">Oldest First</option>
 </select>
 </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
 
 {sortedNews.length > 0 ? (
 sortedNews.map((news, index) => {
          const isAd = index === 3;
 const isExpanded = expandedItems.has(index);
 return (
            <React.Fragment key={index}>
              {isAd && (
                <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                  <InFeedAdCard 
                    title="Exclusive Deals on Local Products"
                    description="Support local businesses and get amazing discounts in our Marketplace."
                    image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    cta="Visit Marketplace"
                    path="/marketplace"
                  />
                </div>
              )}
            <div
 onClick={() => toggleExpand(index)}
 className="bg-white rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out flex flex-col cursor-pointer group"
 >
 
 {news.image ? (
 <div
 className={`w-full relative overflow-hidden transition-all duration-300 ${isExpanded ?"h-64" :"h-48"}`}
 >
 
 <img
 src={news.image}
 alt={news.title}
 className="w-full h-full object-cover"
 />
 <div className="absolute top-3 left-3 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[var(--color-outline)]">
 
 <span className="text-[var(--color-primary)]">
 {getNewsIcon(news.type)}
 </span>
 <span className="text-[11px] font-bold tracking-wide uppercase text-[var(--color-primary)]">
 {news.type}
 </span>
 </div>
 </div>
 ): (
 <div className="bg-[var(--color-surface)] p-5 flex items-center gap-3.5 border-b border-[var(--color-outline)] shadow-inner">
 
 <div className="text-[var(--color-primary)]">
 {getNewsIcon(news.type)}
 </div>
 <div className="text-white">
 
 <div>
 
 <span className="bg-[var(--color-primary-container)] border border-[var(--color-primary)] text-[var(--color-primary)] px-2 py-0.5 rounded text-[11px] font-semibold">
 
 {news.type}
 </span>
 </div>
 <div className="text-[11px] opacity-70 mt-1 flex items-center gap-1">
 <Calendar size={12} /> {news.date}
 </div>
 </div>
 </div>
 )}
 <div className="p-4 flex-1 flex flex-col">
 
 <div className="flex justify-between items-start mb-2">
 
 <div className="text-[11px] text-[var(--color-primary)] font-medium flex items-center gap-1">
 <Calendar size={12} /> {news.date}
 </div>
 {(news as any).eventDate && (
 <div className="text-[10px] bg-white/10 text-[var(--color-primary)] px-2 py-1 rounded-md font-semibold border border-[var(--color-outline)]">
 
 Event: {(news as any).eventDate}
 </div>
 )}
 </div>
 <h3
 className="text-[15px] font-semibold text-slate-800 mb-2 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
 onClick={(e) => {
 e.stopPropagation();
 toggleExpand(index);
 }}
 >
 
 {news.title}
 </h3>
 <div className="mb-4">
 
 <p
 className={`text-[13px] text-slate-500 leading-[1.6] ${isExpanded ?"" :"line-clamp-2"}`}
 >
 
 {news.desc}
 </p>
 <button
 onClick={(e) => {
 e.stopPropagation();
 toggleExpand(index);
 }}
 className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-xs font-semibold mt-1.5 flex items-center gap-1"
 >
 
 {isExpanded ? (
 <>
 Read Less <ChevronUp size={14} />
 </>
 ): (
 <>
 Read More <ChevronDown size={14} />
 </>
 )}
 </button>
 </div>
 <div className="mt-auto pt-4 border-t border-[var(--color-outline)] flex justify-end">
 
 <button
 onClick={(e) => {
 e.stopPropagation();
 handleShare(news);
 }}
 className="flex items-center gap-1.5 text-slate-500 hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
 >
 
 <Share2 size={16} /> Share
 </button>
 </div>
 </div>
 </div></React.Fragment>);})
 ) : (
 <div className="col-span-full py-10 text-center text-slate-500">
 
 No news or events found matching your search.
 </div>
 )}
 </div>
 {/* Share Modal */}
 {shareModal && (
 <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
 
 <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-scale-up-center">
 
 <div className="flex justify-between items-center p-4 border-b border-[var(--color-outline)] bg-slate-50">
 
 <h3 className="font-semibold text-lg text-[var(--color-primary)]">
 Share News
 </h3>
 <button
 onClick={() => setShareModal(null)}
 className="text-slate-500 hover:text-[var(--color-danger)] transition-colors bg-slate-50 p-1.5 rounded-full border border-[var(--color-outline)]"
 >
 
 <X size={18} />
 </button>
 </div>
 <div className="p-5 flex flex-col gap-3">
 
 <button
 onClick={shareToWhatsApp}
 className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(37,211,102,0.2 active:scale-95 transition-all duration-150"
 >
 
 <MessageCircle size={20} /> Share via WhatsApp
 </button>
 <button
 onClick={copyToClipboard}
 className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-white/10 text-slate-800 py-3 rounded-xl font-medium transition-colors border border-[var(--color-outline)] active:scale-95 transition-all duration-150"
 >
 
 <Copy size={20} /> Copy Link
 </button>
 </div>
 </div>
 </div>
 )}
 {isSubmitModalOpen && (
 <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
 
 <div className="bg-[var(--color-surface)] border border-[var(--color-outline)] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up-center">
 
 <div className="bg-slate-50 border-b border-[var(--color-outline)] p-4 flex items-center justify-between text-white">
 
 <h3 className="font-yatra text-xl text-[var(--color-primary)]">
 Submit News / Event
 </h3>
 <button
 onClick={() => setIsSubmitModalOpen(false)}
 className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-white/10 hover:text-[var(--color-danger)] text-slate-500 transition-colors border border-[var(--color-outline)]"
 >
 
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
 
 <div>
 
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Type
 </label>
 <select
 value={formData.type}
 onChange={(e) =>
 setFormData({ ...formData, type: e.target.value })
 }
 className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-outline)] bg-slate-50 text-slate-800 outline-none focus:border-[var(--color-primary)] focus:bg-white/10 appearance-none shadow-inner"
 required
 >
 
 <option value="Event" className="bg-[var(--color-surface)]">
 Event
 </option>
 <option value="News" className="bg-[var(--color-surface)]">
 News
 </option>
 <option value="Notice" className="bg-[var(--color-surface)]">
 Notice
 </option>
 <option value="Alert" className="bg-[var(--color-surface)]">
 Alert
 </option>
 <option value="Sports" className="bg-[var(--color-surface)]">
 Sports
 </option>
 <option value="Govt" className="bg-[var(--color-surface)]">
 Govt
 </option>
 </select>
 </div>
 <div>
 
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Title
 </label>
 <input
 type="text"
 value={formData.title}
 onChange={(e) =>
 setFormData({ ...formData, title: e.target.value })
 }
 className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-outline)] bg-slate-50 border-slate-200 text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all"
 placeholder="e.g. Football Tournament"
 required
 />
 </div>
 <div>
 
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Date / Time
 </label>
 <input
 type="text"
 value={formData.date}
 onChange={(e) =>
 setFormData({ ...formData, date: e.target.value })
 }
 className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-outline)] bg-slate-50 border-slate-200 text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all"
 placeholder="e.g. Next Sunday, 4 PM"
 required
 />
 </div>
 <div>
 
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Description
 </label>
 <textarea
 value={formData.desc}
 onChange={(e) =>
 setFormData({ ...formData, desc: e.target.value })
 }
 className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-outline)] bg-slate-50 text-slate-800 outline-none focus:border-[var(--color-primary)] focus:bg-white/10 min-h-[100px] resize-none placeholder:text-slate-500 shadow-inner"
 placeholder="Provide details about the news or event..."
 required
 />
 </div>
 <div>
 
 <label className="block text-sm font-medium text-slate-700 font-semibold ml-1 mb-1">
 Your Name
 </label>
 <input
 type="text"
 value={formData.name}
 onChange={(e) =>
 setFormData({ ...formData, name: e.target.value })
 }
 className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-outline)] bg-slate-50 border-slate-200 text-slate-800 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400 font-medium transition-all"
 placeholder="Your name for reference"
 required
 />
 </div>
 <button
 type="submit"
 className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-medium py-3 rounded-xl transition-colors mt-2 shadow-[0_0_15px_rgba(37,211,102,0.2 active:scale-95 transition-all duration-150"
 >
 
 Send via WhatsApp
 </button>
 </form>
 </div>
 </div>
 )}
 </div></>);
}