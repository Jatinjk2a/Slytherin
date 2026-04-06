import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
<div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#faf9f8]">
<main className="w-full max-w-md px-6 py-12 z-10">
<div className="flex flex-col items-center mb-12">
<div className="mb-8 p-4 rounded-3xl bg-surface-container-low">
<span className="material-symbols-outlined text-4xl text-[#cfb095]" data-icon="auto_awesome">auto_awesome</span>
</div>
<h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-3">README AI</h1>
<p className="text-on-surface-variant font-light tracking-tight">Welcome back to the digital curator.</p>
</div>
<div className="bg-white p-8 rounded-3xl transition-all">
<form className="space-y-6" onSubmit={handleLogin}>
<div>
<label className="block text-xs font-semibold text-outline mb-2 ml-1 uppercase tracking-widest" htmlFor="email">Work Email</label>
<input className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-[#cfb095]/40 transition-all outline-none" id="email" placeholder="curator@readme.ai" type="email"/>
</div>
<div>
<div className="flex justify-between items-center mb-2 ml-1">
<label className="block text-xs font-semibold text-outline uppercase tracking-widest" htmlFor="password">Password</label>
<Link className="text-xs font-medium text-[#cfb095] hover:underline transition-all" to="/forgot">Forgot?</Link>
</div>
<input className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 rounded-2xl p-4 text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-[#cfb095]/40 transition-all outline-none" id="password" placeholder="••••••••" type="password"/>
</div>
<button className="hazelnut-btn w-full py-4 rounded-2xl font-headline font-bold text-sm tracking-widest uppercase shadow-sm hover:shadow-lg transition-all active:scale-[0.98]" type="submit">
                    Sign In
                </button>
</form>
<div className="relative my-10">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-outline-variant/20"></div>
</div>
<div className="relative flex justify-center text-xs uppercase tracking-widest">
<span className="bg-white px-4 text-outline font-medium">Or continue with</span>
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<button onClick={() => alert('Google OAuth coming soon!')} className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl ring-1 ring-outline-variant/30 hover:bg-surface-container-low transition-all text-sm font-medium text-on-surface">
<span className="material-symbols-outlined text-xl" data-icon="brand_family_google">google</span>
                    Google
                </button>
<button onClick={() => alert('GitHub OAuth coming soon!')} className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl ring-1 ring-outline-variant/30 hover:bg-surface-container-low transition-all text-sm font-medium text-on-surface">
<span className="material-symbols-outlined text-xl" data-icon="code">code</span>
                    GitHub
                </button>
</div>
</div>
<footer className="mt-12 text-center">
<p className="text-sm text-outline-variant">
                New to the platform? 
                <Link className="text-[#cfb095] font-semibold hover:text-[#c4a184] transition-colors ml-1" to="/signup">Create an account</Link>
</p>
</footer>
</main>
<div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
<div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#cfb095]/5 blur-[120px] rounded-full"></div>
<div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-primary-container/5 blur-[120px] rounded-full"></div>
</div>

</div>
  )
}
