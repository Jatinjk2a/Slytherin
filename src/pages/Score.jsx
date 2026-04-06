import React from "react"
import { Link } from "react-router-dom"

export default function Score() {
  return (
    <>
      

<header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl">
<div className="flex items-center justify-between px-6 h-16 w-full">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-hazelnut active:scale-95 transition-transform duration-200 cursor-pointer" data-icon="arrow_back">arrow_back</span>
<h1 className="font-headline font-bold text-lg tracking-tight">Project Health</h1>
</div>
<div className="flex items-center">
<span className="material-symbols-outlined text-slate-500 active:scale-95 transition-transform duration-200 cursor-pointer" data-icon="more_vert">more_vert</span>
</div>
</div>
<div className="bg-slate-100 h-[1px] w-full"></div>
</header>
<main className="pt-24 pb-32 px-6 max-w-md mx-auto">

<section className="flex flex-col items-center justify-center mb-12">
<div className="relative flex items-center justify-center w-64 h-64">

<svg className="absolute w-full h-full" viewbox="0 0 100 100">
<circle className="text-slate-100 stroke-current" cx="50" cy="50" fill="transparent" r="42" strokeWidth="8"></circle>

<circle className="text-hazelnut stroke-current progress-ring-circle" cx="50" cy="50" fill="transparent" r="42" strokeDasharray="263.89" strokeDashoffset="15.83" strokeLinecap="round" strokeWidth="8"></circle>
</svg>

<div className="w-48 h-48 rounded-full bg-white glow-hazelnut flex flex-col items-center justify-center border border-hazelnut/10">
<span className="font-headline font-extrabold text-5xl text-hazelnut tracking-tighter">94</span>
<span className="font-label text-sm uppercase tracking-widest text-slate-400 font-bold">/ 100</span>
</div>
</div>
<div className="mt-8 text-center">
<h2 className="font-headline text-2xl font-extrabold text-slate-900">Excellent Status</h2>
<p className="text-slate-500 mt-1">Your README AI documentation is in top shape.</p>
</div>
</section>

<div className="grid grid-cols-2 gap-4">

<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-3 border border-transparent hover:border-hazelnut/20 transition-colors">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-hazelnut bg-white p-2 rounded-xl text-lg" data-icon="auto_stories">auto_stories</span>
<span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">High</span>
</div>
<div>
<p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Readability</p>
<p className="font-headline font-bold text-lg text-slate-900">Elite</p>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-3 border border-transparent hover:border-hazelnut/20 transition-colors">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-hazelnut bg-white p-2 rounded-xl text-lg" data-icon="verified_user">verified_user</span>
</div>
<div>
<p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Test Coverage</p>
<p className="font-headline font-bold text-lg text-slate-900">88.4%</p>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-3 border border-transparent hover:border-hazelnut/20 transition-colors">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-hazelnut bg-white p-2 rounded-xl text-lg" data-icon="checklist">checklist</span>
<span className="material-symbols-outlined text-emerald-500 text-sm" data-icon="check_circle" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completeness</p>
<p className="font-headline font-bold text-lg text-slate-900">Optimal</p>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col gap-3 border border-transparent hover:border-hazelnut/20 transition-colors">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-hazelnut bg-white p-2 rounded-xl text-lg" data-icon="gpp_maybe">gpp_maybe</span>
<span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Low</span>
</div>
<div>
<p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Vulnerabilities</p>
<p className="font-headline font-bold text-lg text-slate-900">2 Found</p>
</div>
</div>
</div>

<div className="mt-6 bg-slate-900 p-6 rounded-2xl relative overflow-hidden group">
<div className="relative z-10">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-hazelnut text-sm" data-icon="bolt" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
<span className="text-hazelnut text-[10px] font-bold uppercase tracking-widest">AI Insight</span>
</div>
<p className="text-white font-headline font-semibold text-lg leading-snug">Boost score to 98% by refining the 'Installation' section.</p>
<button className="mt-4 bg-hazelnut text-white px-4 py-2 rounded-xl font-label text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform">Optimize Now</button>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
<span className="material-symbols-outlined text-white text-9xl" data-icon="insights">insights</span>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-3 pb-8 bg-white/80 backdrop-blur-2xl z-50 rounded-t-[24px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">

<button className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 active:scale-90 transition-all duration-300 ease-out hover:text-hazelnut">
<span className="material-symbols-outlined mb-1" data-icon="folder_open">folder_open</span>
<span className="font-inter text-[11px] font-semibold tracking-wide uppercase">Projects</span>
</button>

<button className="flex flex-col items-center justify-center bg-hazelnut/10 text-hazelnut rounded-2xl px-5 py-2 active:scale-90 transition-all duration-300 ease-out">
<span className="material-symbols-outlined mb-1" data-icon="insights" style={{fontVariationSettings: "'FILL' 1"}}>insights</span>
<span className="font-inter text-[11px] font-semibold tracking-wide uppercase">Stats</span>
</button>

<button className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 active:scale-90 transition-all duration-300 ease-out hover:text-hazelnut">
<span className="material-symbols-outlined mb-1" data-icon="settings">settings</span>
<span className="font-inter text-[11px] font-semibold tracking-wide uppercase">Settings</span>
</button>
</nav>

    </>
  )
}
