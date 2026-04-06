import React from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/context/AppProvider"

export default function Navbar() {
  const { toggleTheme, theme } = useApp()
  const navigate = useNavigate()

  return (
    <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-50 bg-white/90 backdrop-blur-xl font-['Inter'] text-sm border-b border-slate-100">
      <div className="flex items-center gap-8">
        <div className="flex gap-6">
          <a className="text-slate-600 hover:text-primary transition-all font-medium" href="#">Docs</a>
          <a className="text-slate-600 hover:text-primary transition-all font-medium" href="#">Community</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative flex items-center bg-slate-50 rounded-full px-4 h-9 border border-slate-200">
          <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-xs w-48 text-slate-900 placeholder:text-slate-400 outline-none" placeholder="Search templates..." type="text"/>
        </div>
        <button onClick={toggleTheme} className="material-symbols-outlined text-slate-600 hover:text-primary transition-colors">
          {theme === 'dark' ? 'dark_mode' : 'light_mode'}
        </button>
        <button onClick={() => navigate('/profile')} className="material-symbols-outlined text-slate-600 hover:text-primary transition-colors">account_circle</button>
        <button onClick={() => navigate('/dashboard')} className="bg-primary text-white px-5 py-1.5 rounded-full font-bold text-xs hover:opacity-90 active:scale-95 transition-all">Generate</button>
      </div>
    </header>
  )
}
