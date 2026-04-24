import { Link } from 'react-router-dom';
import { Compass, Home, Map as MapIcon } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 animate-fade-in text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-full max-h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[var(--color-primary)] blur-[60px] rounded-full opacity-30 animate-pulse"></div>
        <div className="relative bg-white w-24 h-24 md:w-32 md:h-32 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[var(--color-outline)] flex items-center justify-center">
          <Compass size={64} className="text-[var(--color-primary)] animate-[spin_8s_linear_infinite]" />
        </div>
      </div>
      
      <h1 className="font-yatra text-7xl md:text-9xl text-slate-900 mb-2 tracking-tight drop-shadow-sm">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
        Out of Bounds
      </h2>
      
      <p className="text-[var(--color-on-surface-variant)] max-w-md mx-auto mb-10 text-base md:text-lg font-medium">
        Looks like you've wandered off the map. The page you are looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link 
          to="/" 
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-slate-900/20"
        >
          <Home size={20} />
          Go to Home
        </Link>
        <Link 
          to="/directory" 
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-[var(--color-on-surface)] border border-[var(--color-outline)] rounded-2xl font-bold transition-all active:scale-95 shadow-sm"
        >
          <MapIcon size={20} />
          Explore Directory
        </Link>
      </div>
    </div>
  );
}
