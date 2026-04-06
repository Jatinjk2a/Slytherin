import React from "react"
import { Link } from "react-router-dom"

export default function PasswordReset() {
  return (
    <>
      

<main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

<div className="absolute -top-24 -left-24 w-96 h-96 bg-hazelnut/5 rounded-full blur-[100px]"></div>
<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
<div className="w-full max-w-md bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-2xl shadow-on-surface/5 relative z-10">

<div className="flex flex-col items-center mb-8">
<div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-hazelnut text-3xl" data-icon="lock_open">lock_open</span>
</div>
<h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface mb-2">Forgot Password?</h1>
<p className="text-on-surface-variant text-center text-sm leading-relaxed max-w-[280px]">
                    Enter your email to receive a password reset link.
                </p>
</div>

<form className="space-y-6" onsubmit="return false;">
<div className="space-y-2">
<label className="font-label text-xs font-semibold uppercase tracking-wider text-outline px-1" htmlFor="email">Email Address</label>
<div className="relative group">
<input className="w-full h-14 bg-surface-container-low border-0 rounded-2xl px-6 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-hazelnut/30 transition-all outline-none" id="email" name="email" placeholder="yourname@example.com" type="email"/>
</div>
</div>
<button className="w-full h-14 glow-button text-white font-label font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all" type="submit">
                    Send Reset Link
                    <span className="material-symbols-outlined text-xl" data-icon="arrow_forward">arrow_forward</span>
</button>
</form>

<div className="relative my-10 flex items-center">
<div className="flex-grow border-t border-outline-variant/30"></div>
<span className="flex-shrink mx-4 text-[10px] font-bold tracking-[0.2em] text-outline uppercase">OR CONTINUE WITH</span>
<div className="flex-grow border-t border-outline-variant/30"></div>
</div>

<div className="grid grid-cols-2 gap-4 mb-10">
<button className="flex items-center justify-center gap-3 h-14 bg-surface-container-low hover:bg-surface-container-high rounded-2xl transition-colors group">
<img alt="Google Logo" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" data-alt="minimalist google logo icon with clean edges" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWc0BV81ZsOacKJQJmM0LR4zyWTB4h4gVz3j2L_Xrve9Seqo7wSFfaGLS4MY-Is_k0DKOeiUP1PItKFHKCL8AYyvG2Gq_iw1Wfi2stuy6Crs_5_WhreJaMYJBOu-Tj9WiNN0r857Nr4R6eroWOM0oUFCVgWND_739jG3JmfZ8ec6TiZDKskF4rQ7PXUCY5qHnhm9nPhJwVqmqv8bh3BlWo-JAHkt0p0RePKfbWUB8wPd6c5uqJM52oyAp17dzgNFtKDZK1Z8T1Z5eK"/>
<span className="font-label text-sm font-semibold text-on-surface-variant group-hover:text-on-surface">Google</span>
</button>
<button className="flex items-center justify-center gap-3 h-14 bg-surface-container-low hover:bg-surface-container-high rounded-2xl transition-colors group">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface" data-icon="terminal">terminal</span>
<span className="font-label text-sm font-semibold text-on-surface-variant group-hover:text-on-surface">GitHub</span>
</button>
</div>

<div className="text-center">
<a className="inline-flex items-center gap-1 text-sm text-on-surface-variant hover:text-hazelnut transition-colors font-medium" href="#">
                    Wait, I remember it! <span className="text-hazelnut font-bold">Log In</span>
</a>
</div>
</div>
</main>

<footer className="w-full py-8">
<div className="flex flex-col items-center gap-4 w-full">
<p className="font-inter text-[10px] tracking-widest uppercase text-zinc-400">© 2024 Luminescent Logic. Editorial Documentation.</p>
<div className="flex gap-6">
<a className="font-inter text-xs tracking-wide uppercase text-zinc-400 hover:text-zinc-900 transition-opacity duration-200" href="#">Privacy Policy</a>
<a className="font-inter text-xs tracking-wide uppercase text-zinc-400 hover:text-zinc-900 transition-opacity duration-200" href="#">Terms of Service</a>
<a className="font-inter text-xs tracking-wide uppercase text-zinc-400 hover:text-zinc-900 transition-opacity duration-200" href="#">Help Center</a>
</div>
</div>
</footer>

    </>
  )
}
