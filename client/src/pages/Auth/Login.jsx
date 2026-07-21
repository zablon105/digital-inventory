import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Loader2, Sparkles, UserCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@sewiyjnr.com');
  const [password, setPassword] = useState('admin123');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setLocalError('');
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLocalError(err.message || 'Invalid credentials');
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@sewiyjnr.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans selection:bg-[#10B981] selection:text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-80"></div>

        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-[#10B981] tracking-widest uppercase font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            LuxeStep & Linen Admin
          </div>
          <h2 className="text-white text-3xl font-bold font-serif">Sign In</h2>
          <p className="text-slate-400 text-xs font-medium">Use default admin credentials below to log in</p>
        </div>

        {localError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs text-center font-bold">
            {localError}
          </div>
        )}

        {/* Admin Credential Banner */}
        <div 
          onClick={handleFillAdmin}
          className="bg-emerald-500/10 border border-[#10B981]/30 rounded-xl p-3 text-xs text-slate-300 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#10B981]" />
            <div>
              <span className="font-bold text-white block">Default Admin Login</span>
              <span className="text-[10px] text-slate-400">admin@sewiyjnr.com / admin123</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#10B981] uppercase bg-[#10B981]/20 px-2 py-1 rounded-md">Click to fill</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold block" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sewiyjnr.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#10B981] text-xs font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold block" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#10B981] text-xs font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingLocal}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold py-3 rounded-xl shadow-lg shadow-[#10B981]/20 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loadingLocal ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In as Admin'
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 font-medium">
          Need guest checkout?{' '}
          <Link to="/" className="text-[#10B981] hover:underline font-bold">
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
