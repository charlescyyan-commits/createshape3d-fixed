import { useState } from 'react';
import { Link } from 'react-router';
import { LogIn, ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { buildCanonical } from '@/lib/seo';

export default function Login() {
  const { user, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => { window.location.href = '/'; },
    onError: (e) => { toast.error(e.message); setSubmitting(false); },
  });
  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => { window.location.href = '/'; },
    onError: (e) => { toast.error(e.message); setSubmitting(false); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    if (mode === 'login') {
      loginMutation.mutate({ email, password });
    } else {
      if (password.length < 6) { toast.error('Password must be at least 6 characters'); setSubmitting(false); return; }
      registerMutation.mutate({ email, password, name: name || undefined });
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <Helmet>
          <title>Account | CreateShape3D</title>
          <meta name="description" content="Manage your CreateShape3D account and access your profile." />
          <link rel="canonical" href={buildCanonical('/login')} />
        </Helmet>
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-bold">{user.name?.[0] || 'U'}</span>
        </div>
        <h1 className="text-xl font-bold mb-1">Welcome, {user.name || 'User'}</h1>
        <p className="text-sm text-neutral-500 mb-6">{user.email}</p>
        <div className="space-y-3">
          <Link to="/" className="block w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">Go to Home</Link>
          <Link to="/admin" className="block w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Go to Admin</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <Helmet>
        <title>{mode === 'login' ? 'Sign In' : 'Create Account'} | CreateShape3D</title>
        <meta
          name="description"
          content={mode === 'login' ? 'Sign in to access your CreateShape3D account.' : 'Create a CreateShape3D account to get started.'}
        />
        <link rel="canonical" href={buildCanonical('/login')} />
      </Helmet>
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <h1 className="text-2xl font-bold mb-2">{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
      <p className="text-neutral-500 mb-8">{mode === 'login' ? 'Sign in to access your account, orders, and saved items.' : 'Register a new account to get started.'}</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {mode === 'register' && (
          <div>
            <label className="text-xs font-medium text-neutral-500 mb-1 block">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full pl-9 pr-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
            </div>
          </div>
        )}
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-9 pr-3 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-neutral-500 mb-1 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === 'register' ? 'Min. 6 characters' : 'Your password'} required className="w-full pl-9 pr-10 py-2.5 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:border-neutral-900" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={submitting || isLoading} className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          <LogIn className="w-4 h-4" /> {submitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-neutral-500">
        {mode === 'login' ? (
          <>Don't have an account? <button type="button" onClick={() => setMode('register')} className="text-blue-600 hover:underline font-medium">Sign Up</button></>
        ) : (
          <>Already have an account? <button type="button" onClick={() => setMode('login')} className="text-blue-600 hover:underline font-medium">Sign In</button></>
        )}
      </p>
    </div>
  );
}
