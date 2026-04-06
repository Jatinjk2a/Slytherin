import React from "react"
import { Link } from "react-router-dom"

export default function Setup() {
  return (
    <>
      

<header className="fixed top-0 w-full z-50 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-xl">
<div className="flex justify-between items-center px-6 py-4 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-800 flex items-center justify-center text-white">
<span className="material-symbols-outlined">terminal</span>
</div>
<h1 className="text-xl font-bold bg-gradient-to-br from-indigo-500 to-indigo-800 bg-clip-text text-transparent font-manrope tracking-tight">README AI</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="Close-up portrait of a professional developer in a soft-lit modern office environment, clean minimal photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlQ0B8ObtPl9QohOj90mYPQIl6f9AiQyHTQejDSlD5tgWymDTQUWJZ9LuUo1WnqJ7xZoGgFXHQ8MbQd2mGGRTEr7ee5ZPUmdHSfNZNJ3mtQGqawVG07lkg9Eu6DrKowv46_JKJKhbVSEI7kvNKAjOKjfsE1x94osqiLVLBuIFAqOr5B2obKCANcy0DL_2fSO3Y8VAsC3afk28bLk0cgG-PnIHiOdvE1PPFwTfhs7A5wBjfGFm57o5ZuRE7d-BSY9QqiXiZvWmCXQ_C"/>
</div>
</div>
</header>
<main className="mt-24 px-6 space-y-8 max-w-md mx-auto">

<section>
<h2 className="font-headline text-3xl font-extrabold tracking-tight text-slate-900 mb-2">Repository Setup</h2>
<p className="text-slate-500 font-body text-sm">Configure how AI interprets and documents your codebase.</p>
</section>

<section className="bg-slate-50 rounded-2xl p-6 shadow-sm">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-hazelnut">auto_awesome</span>
<h3 className="font-headline font-bold text-slate-800">Documentation Tone</h3>
</div>
<div className="flex flex-wrap gap-3">

<button className="flex items-center gap-2 px-4 py-2 rounded-full bg-hazelnut text-white font-medium text-sm transition-all shadow-md shadow-hazelnut/20">
<span className="material-symbols-outlined text-[18px]">code</span>
                    Technical
                </button>

<button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm hover:border-hazelnut/50 transition-colors">
<span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                    Conversational
                </button>

<button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm hover:border-hazelnut/50 transition-colors">
<span className="material-symbols-outlined text-[18px]">short_text</span>
                    Minimalist
                </button>
</div>
<p className="mt-4 text-xs text-slate-400 font-body italic leading-relaxed">
                Technical tone focuses on architecture, API references, and implementation details.
            </p>
</section>

<section className="bg-slate-50 rounded-2xl p-6 shadow-sm">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-hazelnut">visibility_off</span>
<h3 className="font-headline font-bold text-slate-800">Ignore Paths</h3>
</div>
<div className="relative mb-6">
<input className="w-full bg-white border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-hazelnut rounded-xl px-4 py-3 text-sm font-body text-slate-700 transition-all outline-none" placeholder="Add path (e.g. docs/*.md)" type="text"/>
<button className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-hazelnut hover:text-white transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
</div>
<div className="space-y-3">

<div className="flex items-center justify-between p-3 bg-white rounded-xl ring-1 ring-slate-100">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-slate-400 text-[20px]">folder</span>
<code className="font-mono text-xs text-slate-600">node_modules/</code>
</div>
<button className="text-slate-300 hover:text-red-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>

<div className="flex items-center justify-between p-3 bg-white rounded-xl ring-1 ring-slate-100">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-slate-400 text-[20px]">description</span>
<code className="font-mono text-xs text-slate-600">.env</code>
</div>
<button className="text-slate-300 hover:text-red-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>

<div className="flex items-center justify-between p-3 bg-white rounded-xl ring-1 ring-slate-100">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-slate-400 text-[20px]">inventory_2</span>
<code className="font-mono text-xs text-slate-600">build/</code>
</div>
<button className="text-slate-300 hover:text-red-400 transition-colors">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
</div>
</section>

<section className="pt-4 pb-10">
<button className="w-full hazelnut-gradient text-white font-headline font-bold py-4 rounded-2xl shadow-xl shadow-hazelnut/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined">save</span>
                SAVE CONFIGURATION
            </button>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-2xl rounded-t-[1.5rem] z-50 shadow-[0px_-10px_30px_rgba(0,0,0,0.05)]">
<div className="flex justify-around items-center px-4 pb-6 pt-2">

<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-3 hover:text-indigo-500 transition-colors" href="#">
<span className="material-symbols-outlined">folder_open</span>
<span className="font-inter text-[10px] font-bold uppercase tracking-widest mt-1">Projects</span>
</a>

<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-3 hover:text-indigo-500 transition-colors" href="#">
<span className="material-symbols-outlined">auto_awesome</span>
<span className="font-inter text-[10px] font-bold uppercase tracking-widest mt-1">Generate</span>
</a>

<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-3 hover:text-indigo-500 transition-colors" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-inter text-[10px] font-bold uppercase tracking-widest mt-1">History</span>
</a>

<a className="flex flex-col items-center justify-center bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl p-3 active:scale-90 transition-transform duration-300 ease-out" href="#">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>settings</span>
<span className="font-inter text-[10px] font-bold uppercase tracking-widest mt-1">Settings</span>
</a>
</div>
</nav>

<div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-hazelnut/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
<div className="fixed bottom-0 left-0 -z-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

    </>
  )
}
