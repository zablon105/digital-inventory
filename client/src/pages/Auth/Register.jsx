import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Mail, Loader2, Sparkles, UserCheck } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Let developers toggle admin roles in MVP
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [localError, setLocalError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setLocalError('');
    try {
      const user = await register(name, email, password, role);
      if (user.role === 'admin') {
        navigate('/admin/inventory');
      } else {
        navigate('/');
      }
    } catch (err) {
      setLocalError(err.message || 'Registration failed');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 selection:bg-gold selection:text-dark-bg">
      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-65"></div>

        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-gold tracking-widest uppercase font-serif text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            LuxeStep & Linen
          </div>
          <h2 className="text-white text-3xl font-bold font-display">Create Account</h2>
          <p className="text-gray-400 text-sm mt-2">Join our premium client circle</p>
        </div>

        {localError && (
          <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/30 rounded-lg text-brand-red text-sm text-center">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-medium block" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-medium block" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-medium block" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••• (Min 6 chars)"
                className="w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
              />
            </div>
          </div>

          {/* Role selector for testing */}
          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-medium block">
              Account Role (MVP Toggle)
            </label>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  role === 'user'
                    ? 'bg-gold border-gold text-dark-bg'
                    : 'bg-dark-bg border-dark-border text-gray-400 hover:text-white'
                }`}
              >
                Customer Portal
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  role === 'admin'
                    ? 'bg-gold border-gold text-dark-bg'
                    : 'bg-dark-bg border-dark-border text-gray-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Store Administrator
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loadingLocal}
            className="w-full bg-gold hover:bg-gold-hover text-dark-bg font-semibold py-3 rounded-lg mt-2 shadow-lg hover:shadow-gold/10 transition-all duration-300 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loadingLocal ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Profile...
              </>
            ) : (
              'Create Profile'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-400">
          Already registered?{' '}
          <Link to="/login" className="text-gold hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
