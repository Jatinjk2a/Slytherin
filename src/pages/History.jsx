import React from "react"
import { Link } from "react-router-dom"
import { useApp } from "@/context/AppProvider"

export default function History() {
  const { history, setHistory } = useApp()

  const handleDelete = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  const handleExportAll = () => {
    alert('Export feature coming soon!')
  }

  const handleLoadMore = () => {
    alert('No older generations to load.')
  }

  return (
    <>
      
{/* Sidebar Navigation */}

{/* Main Content Canvas */}
<main className=" min-h-screen p-12 bg-[#ffffff]">
{/* Header Section */}
<header className="max-w-6xl mx-auto mb-16 flex justify-between items-end">
<div>
<h1 className="font-headline text-5xl font-extrabold tracking-tight text-zinc-900 mb-2">History</h1>
<p className="text-zinc-500 text-lg">Manage and explore your previously curated AI documentations.</p>
</div>
<div className="flex gap-4">
<div className="relative">
<input className="pl-12 pr-6 py-3 bg-zinc-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#cfb095]/20 w-64 transition-all outline-none" placeholder="Search projects..." type="text"/>
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xl" data-icon="search">search</span>
</div>
</div>
</header>
{/* Bento Grid Projects */}
<div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
{/* Featured/Latest Entry (Large Card) */}
<div className="col-span-12 lg:col-span-8 bg-zinc-50 rounded-xl p-8 relative overflow-hidden group hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 border-none">
<div className="absolute top-0 right-0 p-6">
<span className="px-4 py-1.5 bg-[#cfb095] text-white text-[10px] font-bold tracking-widest uppercase rounded-full">Latest Generation</span>
</div>
<div className="flex flex-col h-full justify-between relative z-10">
<div>
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-4xl text-[#cfb095]" data-icon="terminal">terminal</span>
<h2 className="font-headline text-3xl font-bold tracking-tight text-zinc-900">Hydra-Core SDK</h2>
</div>
<div className="flex gap-12 mb-8">
<div>
<p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Generated On</p>
<p className="font-medium text-zinc-800">Oct 24, 2023</p>
</div>
<div>
<p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Curator Score</p>
<div className="flex items-center gap-2">
<span className="font-headline text-2xl font-black text-zinc-900">98%</span>
<span className="material-symbols-outlined text-[#cfb095] text-lg" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
</div>
</div>
</div>
<div className="flex items-center gap-4">
<button className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-all">View README</button>
<button className="px-6 py-3 bg-white text-zinc-900 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-all">Download .md</button>
</div>
</div>
{/* Background Decoration */}
<div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#cfb095]/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
</div>
{/* Side Stats Card */}
<div className="col-span-12 lg:col-span-4 bg-[#cfb095] rounded-xl p-8 text-white flex flex-col justify-between">
<div>
<h3 className="font-headline text-xl font-bold mb-2">Total Output</h3>
<p className="text-white/70 text-sm leading-relaxed">You've generated 24 high-performance documentations this month.</p>
</div>
<div className="mt-8">
<span className="text-5xl font-black tracking-tighter">142</span>
<p className="text-xs uppercase tracking-widest font-bold mt-2 text-white/60">Total Lifetime Docs</p>
</div>
</div>
{/* Table/List Header */}
<div className="col-span-12 flex justify-between items-center mt-8 px-4">
<h3 className="font-headline text-xl font-extrabold text-zinc-900">Previous Collections</h3>
<button onClick={handleExportAll} className="text-[#cfb095] text-xs font-bold flex items-center gap-2 hover:underline">
                    EXPORT ALL <span className="material-symbols-outlined text-sm" data-icon="download">download</span>
</button>
</div>
{/* Project Rows - dynamic from context */}
{history.map((item) => (
<div key={item.id} className="col-span-12 group">
<div className="bg-white hover:bg-zinc-50 transition-all rounded-xl p-6 flex items-center gap-6 border-b-0">
<div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-[#cfb095] group-hover:bg-white transition-colors">
<span className="material-symbols-outlined" data-icon="source">source</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-zinc-900 tracking-tight">{item.name}</h4>
<p className="text-xs text-zinc-500">{item.time} • {item.status}</p>
</div>
<div className="w-32 text-right">
<p className="text-xs text-zinc-400 uppercase font-bold tracking-tighter mb-0.5">Score</p>
<p className="text-sm font-black text-zinc-900">{item.score}%</p>
</div>
<div className="flex gap-2">
<button onClick={() => alert(`Edit: ${item.name}`)} className="p-2 hover:bg-[#cfb095]/10 text-zinc-400 hover:text-[#cfb095] rounded-lg transition-colors">
<span className="material-symbols-outlined text-xl" data-icon="edit">edit</span>
</button>
<button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 text-zinc-400 hover:text-red-500 rounded-lg transition-colors">
<span className="material-symbols-outlined text-xl" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
))}
{/* Loading/Load More Trigger */}
<div className="col-span-12 flex justify-center py-12">
<button onClick={handleLoadMore} className="group flex flex-col items-center gap-2">
<div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
<span className="material-symbols-outlined text-zinc-400 group-hover:text-zinc-600" data-icon="expand_more">expand_more</span>
</div>
<span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Load Older Generations</span>
</button>
</div>
</div>
</main>
{/* Contextual FAB (Suppressing as per guidelines on History/Detail pages, but using for "Action Prompt" if needed elsewhere) */}
{/* Suppressed for this specific history view to maintain focused journey */}

    </>
  )
}
