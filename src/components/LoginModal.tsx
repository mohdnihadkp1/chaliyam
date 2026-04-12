import { useState } from 'react';
import { X, Palmtree } from 'lucide-react';
import { useAuth } from '../AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    try {
      if (provider === 'google') await signInWithGoogle();
      if (provider === 'facebook') await signInWithFacebook();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#1a2e20] rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative animate-[fadeUp_0.2s_ease]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-green-pale dark:bg-green-deep/30 text-text-light hover:bg-green-deep/10 dark:hover:bg-green-deep/50 transition-colors border-none cursor-pointer">
          <X size={18} />
        </button>
        
        <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
          <Palmtree size={32} />
        </div>
        
        <h3 className="font-yatra text-2xl text-green-deep dark:text-gold-light mb-2">Welcome to Chaliyam Connect</h3>
        <p className="text-[14px] text-text-mid dark:text-text-light mb-6">Sign in to access community features and connect with locals.</p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => handleLogin('google')}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-white dark:bg-[#2d7a4f]/20 border border-gray-200 dark:border-green-deep/30 rounded-xl text-text-dark dark:text-white font-medium hover:bg-gray-50 dark:hover:bg-[#2d7a4f]/40 transition-colors disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => handleLogin('facebook')}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#1877F2] text-white rounded-xl font-medium hover:bg-[#166fe5] transition-colors disabled:opacity-50"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}