import { useNavigate } from "react-router-dom";

export default function InFeedAdCard({
  title,
  description,
  image,
  cta,
  path,
}: {
  title: string;
  description: string;
  image: string;
  cta: string;
  path?: string;
}) {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => path ? navigate(path) : null}
        className={`bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[1.25rem] overflow-hidden shadow-[0_8px_30px_rgba(79,70,229,0.15)] relative group transition-all duration-300 border border-indigo-500/20 w-full ${path ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(79,70,229,0.25)]' : ''}`}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="absolute top-3 left-3 bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest text-white uppercase z-20 shadow-sm border border-emerald-400/30">
        Promoted Content
      </div>
      <div className="h-32 md:h-48 w-full relative overflow-hidden bg-indigo-950 z-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>
      <div className="p-4 md:p-5 flex flex-col gap-2 relative z-10">
        <h4 className="font-extrabold text-white text-base md:text-lg line-clamp-1 group-hover:text-emerald-400 transition-colors drop-shadow-sm">{title}</h4>
        <p className="text-xs md:text-sm text-indigo-200 line-clamp-2 font-medium leading-relaxed">{description}</p>
        <button className="text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg mt-2 flex items-center justify-center gap-1.5 w-max transition-all border border-white/10 active:scale-95 shadow-sm group/btn">
          {cta} <span className="group-hover/btn:translate-x-0.5 transition-transform">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
