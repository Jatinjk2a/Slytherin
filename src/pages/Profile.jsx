import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  return (
    <>
      

<main className="pt-24 px-6 max-w-md mx-auto space-y-8">
      {/* Profile Section */}
<section className="flex flex-col items-center text-center space-y-4">
<div className="relative">
<div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#cfb095] to-secondary-container">
<img alt="Alex Rivera" className="w-full h-full object-cover rounded-full border-4 border-white" data-alt="Professional portrait of a man in his 30s, creative director style, bright clean background, high resolution" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhxFtxj9Pt1kFB5Sgpl-7YA5H_8H1DHcgCF-oBkfSd-6qydzccI5ZdWwVHhBllkNG0DAwd82QMJHUESfrbU8-oI80lwuYMMT1cfY7Wj1vpAHy55wcbFoe4mnkv0m8Eq7dpNTQ3YkuGhAKa9ZTx-jzuQGEQdcf6cOB4phvo08v2mmt1NXSPhSrQdUq5gFt2E-Ax4Fppf6QU6sVVfbkQcCvaYcyTC-0h61fCD-2EqJ7aL253wwiUf4bIQbFvmufBVCDES9OfiJVTX8Ct"/>
</div>
<div className="absolute bottom-0 right-0 bg-[#cfb095] text-white p-1.5 rounded-full border-2 border-white flex items-center justify-center">
<span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
</div>
<div>
<h2 className="text-2xl font-extrabold tracking-tight text-on-surface">Alex Rivera</h2>
<p className="text-zinc-500 font-medium">Pro Curator</p>
</div>
<button onClick={() => navigate('/settings')} className="bg-[#cfb095] text-white px-8 py-3 rounded-2xl font-bold tracking-wide flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#cfb095]/20">
                EDIT PROFILE
            </button>
</section>
      {/* Stats Section (Bento Style) */}
<section className="space-y-4">
<h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 px-1">Developer Stats</h3>
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col justify-between h-32 border border-outline-variant/10">
<span className="material-symbols-outlined text-[#cfb095]" data-icon="inventory_2">inventory_2</span>
<div>
<div className="text-2xl font-black text-on-surface">42</div>
<div className="text-xs font-semibold text-zinc-500 uppercase tracking-tighter">Repos Curated</div>
</div>
</div>
<div className="bg-surface-container-low p-5 rounded-2xl flex flex-col justify-between h-32 border border-outline-variant/10">
<span className="material-symbols-outlined text-secondary" data-icon="star" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<div>
<div className="text-2xl font-black text-on-surface">96%</div>
<div className="text-xs font-semibold text-zinc-500 uppercase tracking-tighter">Avg Score</div>
</div>
</div>
</div>
</section>
      {/* Subscription Widget */}
<section className="bg-on-surface text-white p-6 rounded-2xl relative overflow-hidden">
<div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#cfb095]/20 rounded-full blur-3xl"></div>
<div className="relative z-10 flex justify-between items-center">
<div>
<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1">Subscription Details</p>
<h4 className="text-lg font-bold text-[#cfb095]">Active Plan: Pro</h4>
</div>
<div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
<span className="material-symbols-outlined text-[#cfb095]" data-icon="workspace_premium">workspace_premium</span>
</div>
</div>
<div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
<span className="text-xs text-zinc-400">Renews on Oct 12, 2024</span>
<span onClick={() => navigate('/settings/billing')} className="text-xs font-bold text-[#cfb095] cursor-pointer hover:underline">MANAGE</span>
</div>
</section>
      {/* Activity Section */}
<section className="space-y-4">
<div className="flex justify-between items-center px-1">
<h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Public README Activity</h3>
<span onClick={() => navigate('/history')} className="text-[10px] font-bold text-primary cursor-pointer hover:underline">VIEW ALL</span>
</div>
<div className="space-y-3">
        {/* Activity Item 1 */}
<div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-[#cfb095]">
<span className="material-symbols-outlined" data-icon="description">description</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-on-surface">nexus-core-api</h4>
<p className="text-[10px] text-zinc-500 font-medium">3 hours ago • Documentation</p>
</div>
<div className="text-right">
<div className="text-sm font-black text-[#cfb095]">98</div>
<div className="text-[9px] font-bold text-zinc-400 uppercase">SCORE</div>
</div>
</div>
        {/* Activity Item 2 */}
<div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-on-surface">quantum-js-sdk</h4>
<p className="text-[10px] text-zinc-500 font-medium">Yesterday • AI Generation</p>
</div>
<div className="text-right">
<div className="text-sm font-black text-[#cfb095]">94</div>
<div className="text-[9px] font-bold text-zinc-400 uppercase">SCORE</div>
</div>
</div>
        {/* Activity Item 3 */}
<div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4 opacity-70">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center text-zinc-400">
<span className="material-symbols-outlined" data-icon="history">history</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-on-surface">legacy-auth-module</h4>
<p className="text-[10px] text-zinc-500 font-medium">2 days ago • Archive</p>
</div>
<div className="text-right">
<div className="text-sm font-black text-zinc-400">82</div>
<div className="text-[9px] font-bold text-zinc-400 uppercase">SCORE</div>
</div>
</div>
</div>
</section>
</main>


    </>
  )
}
