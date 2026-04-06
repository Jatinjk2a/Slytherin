import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Curator() {
  const navigate = useNavigate()
  const [fixes, setFixes] = useState({ license: true, contributing: false, apiTable: true })

  const handleRegenerate = () => alert('Regenerating README...')
  const handleApplyAll = () => alert('Applying all selected fixes...')
  const toggleFix = (key) => setFixes(prev => ({ ...prev, [key]: !prev[key] }))
  return (
    <>
      
{/* SideNavBar */}

{/* TopAppBar */}
<header className="relative w-full w-full z-50 flex justify-between items-center px-8 h-16 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-200/10 ">
<div className="flex items-center gap-4">
<span className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 font-manrope">Luminescent Logic</span>
</div>
<div className="flex items-center gap-6">
<div className="hidden sm:flex items-center gap-6 text-sm font-manrope">
<a className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 transition-colors" href="#">Documentation</a>
<a className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 transition-colors" href="#">Community</a>
</div>
<div className="flex items-center gap-3">
<button className="p-2 text-zinc-500 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined">notifications</span></button>
<button className="p-2 text-zinc-500 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined">help</span></button>
<div className="h-8 w-8 rounded-full overflow-hidden bg-zinc-200 ml-2">
<img alt="User profile" data-alt="professional headshot of a software developer with a friendly expression in a modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-as2lAeANVWRtl5S03cq0fZXzw6Zz2eY4_dp5-wvZgyWPs3-fpygbIJVNZQvs_xo2KBSCYa1iqvm_th2EjCFT2k7Nfyi2-Eh5aGw7qS_LYoA1LC-Bl-2uLW-dKvmmR4vxd07XAD7fQAvrt2OVVcsOkb5GlvqYoo8awLFhgJ-k3VuG-47HKD7lmL8Y0I6B2o0QBx6AomWUn8DQ_ESBQSZKwvYIjeysTftkSyOgU2T0hSBjwWNqKAYjPPThc_NzIYqLohXz07ARMQ7V"/>
</div>
</div>
</div>
</header>
{/* Main Content */}
<main className="pt-24 pb-12  px-8 min-h-screen bg-white">
<div className="max-w-6xl mx-auto">
{/* Page Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div className="space-y-2">
<div className="inline-flex items-center gap-2 text-hazelnut font-semibold text-sm tracking-wider uppercase">
<span className="material-symbols-outlined text-sm">analytics</span>
                        Curator Analysis
                    </div>
<h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900">README Analysis: Lucid Flow Engine</h1>
<p className="text-zinc-500 text-lg">Detailed audit of documentation health for <span className="font-mono text-sm bg-zinc-100 px-2 py-0.5 rounded">v2.4.0-stable</span></p>
</div>
<button onClick={handleRegenerate} className="px-8 py-4 bg-hazelnut text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-hazelnut/20 active:scale-95 text-lg">
<span className="material-symbols-outlined">refresh</span>
                    Regenerate README
                </button>
</div>
{/* Dashboard Grid */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Score & Details */}
<div className="lg:col-span-8 space-y-8">
{/* Curator Score Card */}
<div className="bg-surface-container-low rounded-2xl p-10 flex flex-col md:flex-row items-center gap-12 border border-white/40">
<div className="relative w-48 h-48 flex items-center justify-center">
<svg className="w-full h-full -rotate-90">
<circle cx="96" cy="96" fill="transparent" r="88" stroke="#f2f3ff" strokeWidth="12"></circle>
<circle cx="96" cy="96" fill="transparent" r="88" stroke="#cfb095" strokeDasharray="552.92" strokeDashoffset="44.23" strokeLinecap="round" strokeWidth="12"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-5xl font-black text-zinc-900">92%</span>
<span className="text-xs font-bold text-hazelnut uppercase tracking-widest mt-1">Excellent</span>
</div>
</div>
<div className="flex-1 space-y-4 text-center md:text-left">
<h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Curator Score</h2>
<p className="text-zinc-600 leading-relaxed max-w-md">Your documentation is performing exceptionally well. Minor refinements in licensing and contributor guidelines could push this to a perfect score.</p>
<div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
<span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold text-zinc-500 border border-zinc-100">Performance: 98%</span>
<span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold text-zinc-500 border border-zinc-100">Legibility: 89%</span>
<span className="px-4 py-1.5 bg-white rounded-full text-xs font-bold text-zinc-500 border border-zinc-100">Setup: 100%</span>
</div>
</div>
</div>
{/* Detailed Review Section */}
<div className="grid md:grid-cols-2 gap-6">
{/* Strengths */}
<div className="bg-surface-container-lowest rounded-2xl p-8 border border-zinc-100">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
</div>
<h3 className="text-xl font-bold text-zinc-900">Strengths</h3>
</div>
<ul className="space-y-4">
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-emerald-500 mt-0.5 group-hover:scale-110 transition-transform">check</span>
<span className="text-zinc-600">Comprehensive Installation Guide</span>
</li>
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-emerald-500 mt-0.5 group-hover:scale-110 transition-transform">check</span>
<span className="text-zinc-600">Clear Feature List &amp; Value Prop</span>
</li>
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-emerald-500 mt-0.5 group-hover:scale-110 transition-transform">check</span>
<span className="text-zinc-600">High-quality Visual Diagrams</span>
</li>
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-emerald-500 mt-0.5 group-hover:scale-110 transition-transform">check</span>
<span className="text-zinc-600">Standardized Heading Hierarchy</span>
</li>
</ul>
</div>
{/* Weaknesses */}
<div className="bg-surface-container-lowest rounded-2xl p-8 border border-zinc-100">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
</div>
<h3 className="text-xl font-bold text-zinc-900">Weaknesses</h3>
</div>
<ul className="space-y-4">
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-amber-500 mt-0.5 group-hover:scale-110 transition-transform">error</span>
<span className="text-zinc-600">Missing License Information</span>
</li>
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-amber-500 mt-0.5 group-hover:scale-110 transition-transform">error</span>
<span className="text-zinc-600">Contribution Guidelines are vague</span>
</li>
<li className="flex items-start gap-3 group">
<span className="material-symbols-outlined text-amber-500 mt-0.5 group-hover:scale-110 transition-transform">error</span>
<span className="text-zinc-600">Broken links in API Reference</span>
</li>
</ul>
</div>
</div>
{/* AI Suggested Fixes */}
<div className="bg-zinc-900 rounded-2xl p-8 text-white">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>magic_button</span>
</div>
<div>
<h3 className="text-xl font-bold">AI Suggested Fixes</h3>
<p className="text-zinc-400 text-sm">Select changes to apply automatically</p>
</div>
</div>
<button onClick={handleApplyAll} className="text-hazelnut font-bold text-sm hover:underline">Apply All Selected</button>
</div>
<div className="space-y-4">
<label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
<div className="flex items-center gap-4">
<input checked={fixes.license} onChange={() => toggleFix('license')} className="w-5 h-5 rounded border-white/20 bg-transparent text-hazelnut focus:ring-hazelnut" type="checkbox"/>
<div className="flex flex-col">
<span className="font-semibold">Auto-generate MIT License file</span>
<span className="text-xs text-zinc-500 italic">Adds LICENSE.md to root directory</span>
</div>
</div>
<span className="px-3 py-1 bg-hazelnut/20 text-hazelnut rounded-full text-[10px] font-bold uppercase tracking-wider">+4% Score</span>
</label>
<label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
<div className="flex items-center gap-4">
<input checked={fixes.contributing} onChange={() => toggleFix('contributing')} className="w-5 h-5 rounded border-white/20 bg-transparent text-hazelnut focus:ring-hazelnut" type="checkbox"/>
<div className="flex flex-col">
<span className="font-semibold">Expand Contributing Guide</span>
<span className="text-xs text-zinc-500 italic">Adds PR templates and code style rules</span>
</div>
</div>
<span className="px-3 py-1 bg-hazelnut/20 text-hazelnut rounded-full text-[10px] font-bold uppercase tracking-wider">+3% Score</span>
</label>
<label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
<div className="flex items-center gap-4">
<input checked={fixes.apiTable} onChange={() => toggleFix('apiTable')} className="w-5 h-5 rounded border-white/20 bg-transparent text-hazelnut focus:ring-hazelnut" type="checkbox"/>
<div className="flex flex-col">
<span className="font-semibold">Fix API Table Formatting</span>
<span className="text-xs text-zinc-500 italic">Standardizes column widths for readability</span>
</div>
</div>
<span className="px-3 py-1 bg-hazelnut/20 text-hazelnut rounded-full text-[10px] font-bold uppercase tracking-wider">+1% Score</span>
</label>
</div>
</div>
</div>
{/* Right Column: History */}
<div className="lg:col-span-4 space-y-8">
<div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100">
<div className="flex items-center gap-3 mb-8">
<span className="material-symbols-outlined text-zinc-400">history</span>
<h3 className="text-xl font-bold text-zinc-900 tracking-tight">Iteration History</h3>
</div>
<div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-200">
{/* Current */}
<div className="relative pl-8 group">
<div className="absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full bg-hazelnut border-4 border-white z-10"></div>
<div className="flex flex-col">
<span className="text-xs font-bold text-hazelnut uppercase tracking-widest">Active</span>
<div className="flex justify-between items-end mt-1">
<span className="font-bold text-zinc-900">Current Audit</span>
<span className="text-2xl font-black text-zinc-900">92%</span>
</div>
<span className="text-[10px] text-zinc-400 font-mono mt-1">OCT 24, 2023 • 14:32</span>
</div>
</div>
{/* Previous */}
<div className="relative pl-8 group cursor-pointer">
<div className="absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full bg-zinc-300 border-4 border-white group-hover:bg-zinc-400 transition-colors z-10"></div>
<div className="flex flex-col">
<span className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600">Draft v4</span>
<div className="flex justify-between items-end mt-1">
<span className="font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors">Initial Repo Import</span>
<span className="text-xl font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">64%</span>
</div>
<span className="text-[10px] text-zinc-400 font-mono mt-1">OCT 22, 2023 • 09:15</span>
</div>
</div>
{/* Previous */}
<div className="relative pl-8 group cursor-pointer opacity-60">
<div className="absolute left-0 top-1.5 w-[24px] h-[24px] rounded-full bg-zinc-200 border-4 border-white z-10"></div>
<div className="flex flex-col">
<span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Legacy</span>
<div className="flex justify-between items-end mt-1">
<span className="font-medium text-zinc-500">External Import</span>
<span className="text-xl font-bold text-zinc-300">42%</span>
</div>
<span className="text-[10px] text-zinc-400 font-mono mt-1">SEP 15, 2023 • 18:44</span>
</div>
</div>
</div>
<div className="mt-12 p-6 bg-hazelnut/5 rounded-2xl border border-hazelnut/10">
<h4 className="text-sm font-bold text-hazelnut mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">trending_up</span>
                                Growth Insight
                            </h4>
<p className="text-xs text-zinc-600 leading-relaxed">Your documentation quality has improved by <strong className="text-zinc-900">43%</strong> since the initial import. Keep adding detailed usage examples to reach top tier.</p>
</div>
</div>
{/* Meta Info Card */}
<div className="bg-surface-container-high/50 rounded-2xl p-6 overflow-hidden relative">
<div className="relative z-10">
<h3 className="font-bold text-zinc-900 mb-4">Repository Health</h3>
<div className="space-y-4">
<div className="flex justify-between items-center text-sm">
<span className="text-zinc-500">Open Issues</span>
<span className="font-mono font-bold">12</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-zinc-500">PR Documentation</span>
<span className="text-emerald-600 font-bold flex items-center gap-1">
                                        Active <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
</span>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-zinc-500">Last Scanned</span>
<span className="text-zinc-900">2 mins ago</span>
</div>
</div>
</div>
<div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
<span className="material-symbols-outlined text-9xl">hub</span>
</div>
</div>
</div>
</div>
</div>
</main>
{/* Navigation Overlay for Mobile */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-zinc-100 flex items-center justify-around z-50">
<Link to="/dashboard" className="flex flex-col items-center justify-center text-zinc-400">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-bold">Home</span>
</Link>
<Link to="/history" className="flex flex-col items-center justify-center text-hazelnut">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
<span className="text-[10px] font-bold">History</span>
</Link>
<Link to="/settings" className="flex flex-col items-center justify-center text-zinc-400">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-bold">Settings</span>
</Link>
<Link to="/settings/billing" className="flex flex-col items-center justify-center text-zinc-400">
<span className="material-symbols-outlined">auto_awesome</span>
<span className="text-[10px] font-bold">Upgrade</span>
</Link>
</nav>

    </>
  )
}
