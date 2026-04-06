import React from "react"
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full flex-col p-4 z-50 bg-white w-64 border-r border-[#f4ebe1] font-['Manrope'] tracking-tight transition-all duration-200">
      <div className="mb-10 px-4">
        <span className="text-lg font-black text-slate-900 tracking-wider">README AI</span>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">The Digital Curator</p>
      </div>
      <div className="px-4 mb-8">
        <button className="w-full py-3 px-4 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          New Project
        </button>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" to="/dashboard">
          <span className="material-symbols-outlined" data-icon="home">home</span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" to="/history">
          <span className="material-symbols-outlined" data-icon="history">history</span>
          <span className="text-sm font-medium">History</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" to="/settings">
          <span className="material-symbols-outlined" data-icon="settings">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200" to="/curator">
          <span className="material-symbols-outlined" data-icon="analytics">analytics</span>
          <span className="text-sm font-medium">Curator</span>
        </Link>
      </nav>
      <div className="p-6 mt-auto border-t border-slate-100">
        <Link className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors" to="/profile">
          <div className="w-10 h-10 rounded-full border border-outline-variant/30 overflow-hidden">
            <img alt="DevUser_01" className="w-full h-full object-cover" data-alt="A futuristic geometric avatar focusing on the theme of technology" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3K5NqDwndLs2yZwfO-2tcJkdZFhxA84EYaCBQJk-P1cu-3-Ttvcjf1pO9tAxhiINTmKc6evSfP0Z8lDZPQRzYQq4bX9rAhSuRkOlxdHh50KP5nE5YDQoqfuwquAfvVhQmhprcuJB5IYyCy3ucYyt6YufezPdrif0dtrNZmlzpZR0t2AhfnmTWX-kxALbS4MST3m-FQRBhAfQnXzGhOFpuDW7tjdQ9b5Rrco1Dz80aRDtoR9JoLEOzB3ZUdy_0-Kwu_R5LEpIGmSjK"/>
          </div>
          <div>
            <div className="text-sm font-bold text-on-surface">Alex Rivera</div>
            <div className="text-xs text-on-surface-variant font-medium">Pro Curator</div>
          </div>
        </Link>
      </div>
    </aside>
  )
}
