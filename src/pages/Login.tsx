import { Link } from 'react-router';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const { user, isLoading, logout } = useAuth();

  const handleLogin = () => {
    // Kimi OAuth login URL
    const appId = import.meta.env.VITE_APP_ID || '';
    const authUrl = import.meta.env.VITE_KIMI_AUTH_URL || '';
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);
    const url = `${authUrl}?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=basic&state=${state}`;
    window.location.href = url;
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl font-bold">{user.name?.[0] || 'U'}</span>
        </div>
        <h1 className="text-xl font-bold mb-1">Welcome, {user.name || 'User'}</h1>
        <p className="text-sm text-neutral-500 mb-6">{user.email}</p>
        <div className="space-y-3">
          <Link to="/" className="block w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">Go to Home</Link>
          <button onClick={logout} className="block w-full py-3 border border-neutral-300 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 mb-6"><ArrowLeft className="w-4 h-4" /> Back</Link>
      <h1 className="text-2xl font-bold mb-2">Sign In</h1>
      <p className="text-neutral-500 mb-8">Sign in to access your account, orders, and saved items.</p>
      <button onClick={handleLogin} disabled={isLoading} className="w-full py-3 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"><LogIn className="w-4 h-4" /> {isLoading ? 'Signing in...' : 'Sign in with Kimi'}</button>
      <p className="text-xs text-neutral-400 text-center mt-4">Secure authentication powered by Kimi OAuth</p>
    </div>
  );
}
