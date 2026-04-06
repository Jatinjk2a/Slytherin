import React from "react"
import { Link } from "react-router-dom"

export default function Signup() {
  return (
    <>
      

<main className="flex min-h-screen w-full items-center justify-center p-6 bg-white">
<div className="w-full max-w-[400px] flex flex-col items-center">

<div className="mb-8 w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center text-brand-hazel soft-elevation">
<span className="material-symbols-outlined text-3xl" data-icon="terminal">terminal</span>
</div>

<div className="text-center mb-10">
<h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface mb-3">
                    Create your account
                </h1>
<p className="font-body text-zinc-500 text-sm leading-relaxed max-w-[280px] mx-auto">
                    Join 2,000+ developers documenting with README AI.
                </p>
</div>

<form className="w-full space-y-4 mb-8">
<div className="space-y-1.5">
<div className="relative group">
<input className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400" placeholder="Full Name" type="text"/>
</div>
</div>
<div className="space-y-1.5">
<div className="relative group">
<input className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400" placeholder="Work Email" type="email"/>
</div>
</div>
<div className="space-y-1.5">
<div className="relative group">
<input className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl text-sm focus:ring-2 focus:ring-brand-hazel/30 transition-all outline-none placeholder:text-zinc-400" placeholder="Password" type="password"/>
<button className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-hazel transition-colors" type="button">
<span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
</button>
</div>
</div>

<button className="w-full h-14 hazel-gradient text-white font-bold rounded-2xl text-sm tracking-widest uppercase transition-transform active:scale-95 shadow-lg shadow-brand-hazel/20 mt-2" type="submit">
                    Sign Up
                </button>
</form>

<div className="w-full flex items-center gap-4 mb-8">
<div className="h-[1px] flex-1 bg-zinc-100"></div>
<span className="text-[10px] font-bold tracking-[0.1em] text-zinc-400 uppercase">OR CONTINUE WITH</span>
<div className="h-[1px] flex-1 bg-zinc-100"></div>
</div>

<div className="w-full grid grid-cols-2 gap-3 mb-10">
<button className="flex items-center justify-center gap-3 h-14 bg-white border border-zinc-100 rounded-2xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors active:scale-[0.98]">
<img alt="Google Logo" className="w-5 h-5 grayscale opacity-70" data-alt="minimalist monochrome google logo icon on a clean white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpsqpW47F2e25yjtrnrYT-LuVYT3Z-BUKMZoM_wHSdAEYjXSX5oZ5mADkkJ_d5xN36lFAVod3f3JIuTl4GNzmUit6vZwCOY23GtHLqA2ECkAaeplHR4mmIMcnYZeQC8JqubX7Lx8wgd-qd3Smp-kH3LyuRjUlcnwhlChLPnDQOy52t1Fb0cLmCa7TKZqhnFO10x7UDiGY9M7hwmD9VqaEF2niZcWLsJxGKRndxY5itSQbUSuXsk2uq83osrOQaimMWCS8I3lvQfiHz"/>
<span>Google</span>
</button>
<button className="flex items-center justify-center gap-3 h-14 bg-white border border-zinc-100 rounded-2xl text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined text-[20px] text-zinc-400" data-icon="code">code</span>
<span>GitHub</span>
</button>
</div>

<div className="mt-auto">
<p className="text-sm text-zinc-500">
                    Already have an account? 
                    <Link className="text-brand-hazel font-bold hover:underline decoration-2 underline-offset-4" to="/login">Log In</Link>
</p>
</div>
</div>
</main>

<div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-50/50 to-transparent pointer-events-none"></div>

    </>
  )
}
