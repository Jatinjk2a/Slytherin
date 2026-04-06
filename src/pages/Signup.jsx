import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "@/context/AppProvider"

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    // TODO: Replace with real API call. Currently uses mock auth.
    setTimeout(() => {
      login({ name: name.trim(), email });
      setLoading(false);
      navigate('/dashboard', { replace: true });
    }, 800);
  };

  return (
    <>
      <main className="flex min-h-screen w-full items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[400px] flex flex-col items-center">

          <div className="mb-8 w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center text-brand-hazel soft-elevation">
            <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface mb-3">
              Create your account
            </h1>
            <p className="font-body text-zinc-500 text-sm leading-relaxed max-w-[280px] mx-auto">
              Join 2,000+ developers documenting with README AI.
            </p>
          </div>

          <form className="w-full space-y-4 mb-8" onSubmit={handleSignup} noValidate>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <input
                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400"
                placeholder="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <input
                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400"
                placeholder="Work Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                disabled={loading}
              />
            </div>
            <div className="space-y-1.5">
              <div className="relative group">
                <input
                  className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400"
                  placeholder="Password (min. 6 characters)"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-hazel transition-colors"
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              className="w-full h-14 hazel-gradient text-white font-bold rounded-2xl text-sm tracking-widest uppercase transition-transform active:scale-95 shadow-lg shadow-brand-hazel/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : 'Sign Up'}
            </button>
          </form>

          <div className="w-full flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-zinc-100"></div>
            <span className="text-[10px] font-bold tracking-[0.1em] text-zinc-400 uppercase">OR CONTINUE WITH</span>
            <div className="h-[1px] flex-1 bg-zinc-100"></div>
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mb-10">
            <button
              disabled
              title="Google OAuth — coming soon"
              className="flex items-center justify-center gap-3 h-14 bg-white border border-zinc-100 rounded-2xl text-sm font-medium text-zinc-400 cursor-not-allowed opacity-60"
            >
              <span className="material-symbols-outlined text-[20px]">brand_family_google</span>
              <span>Google</span>
            </button>
            <button
              disabled
              title="GitHub OAuth — coming soon"
              className="flex items-center justify-center gap-3 h-14 bg-white border border-zinc-100 rounded-2xl text-sm font-medium text-zinc-400 cursor-not-allowed opacity-60"
            >
              <span className="material-symbols-outlined text-[20px]">code</span>
              <span>GitHub</span>
            </button>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-zinc-500">
              Already have an account?&nbsp;
              <Link className="text-brand-hazel font-bold hover:underline decoration-2 underline-offset-4" to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50/50 to-transparent pointer-events-none"></div>
    </>
  )
}


