import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2, UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (userName: string) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsSuccess(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = mode === 'signup' && fullName ? fullName : email.split('@')[0] || 'Member';
    setIsSuccess(true);
    setTimeout(() => {
      onSuccessLogin(displayName);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="savorite-card max-w-md w-full rounded-3xl overflow-hidden border border-terracotta-500/40 p-6 sm:p-8 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
        >
          ✕
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
                Savorite Member Club
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
              </h2>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#111215] border border-white/10 rounded-full p-1 mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  mode === 'signin'
                    ? 'bg-terracotta-500 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 rounded-full transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  mode === 'signup'
                    ? 'bg-terracotta-500 text-white shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Aim'fiz Ibrahim"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="aimfiz@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Number for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Phone Number (M-Pesa / SMS)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+255 774 000 999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Forgot Password for Sign In */}
              {mode === 'signin' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-white/10 bg-[#111215] text-terracotta-500 focus:ring-0" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-terracotta-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="terracotta-btn w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl flex items-center justify-center space-x-2 mt-2"
              >
                <span>{mode === 'signin' ? 'Sign In to Account' : 'Create Member Account'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {/* Bottom Toggle Prompt */}
              <div className="text-center pt-3 text-xs text-slate-400">
                {mode === 'signin' ? (
                  <p>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-terracotta-400 font-semibold hover:underline"
                    >
                      Create Account
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-terracotta-400 font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 animate-bounce" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              {mode === 'signin' ? 'Welcome Back!' : 'Account Created Successfully!'}
            </h3>
            <p className="text-xs text-slate-300 font-light">
              Authenticating member session...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

