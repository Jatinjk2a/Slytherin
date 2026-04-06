import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Score() {
  const navigate = useNavigate()
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-slate-700">arrow_back</span>
            </button>
            <h1 className="font-headline font-bold text-lg tracking-tight text-slate-900">Project Health</h1>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-500">more_vert</span>
          </button>
        </div>
        <div className="bg-slate-100 h-[1px] w-full"></div>
      </header>

      {/* Main */}
      <main className="pt-20 pb-32 px-6 max-w-lg mx-auto bg-slate-50 min-h-screen">

        {/* Score Ring */}
        <section className="flex flex-col items-center justify-center py-10">
          <div className="relative flex items-center justify-center w-56 h-56">
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-slate-200 stroke-current" cx="50" cy="50" fill="transparent" r="42" strokeWidth="7"></circle>
              <circle
                cx="50" cy="50" fill="transparent" r="42"
                stroke="#cfb095" strokeDasharray="263.89" strokeDashoffset="15.83"
                strokeLinecap="round" strokeWidth="7"
              ></circle>
            </svg>
            <div className="w-40 h-40 rounded-full bg-white flex flex-col items-center justify-center border border-slate-100 shadow-md">
              <span className="font-headline font-extrabold text-5xl text-slate-900 tracking-tighter">94</span>
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">/ 100</span>
            </div>
          </div>
          <div className="mt-6 text-center">
            <h2 className="font-headline text-2xl font-extrabold text-slate-900">Excellent Status</h2>
            <p className="text-slate-500 mt-1 text-sm">Your README AI documentation is in top shape.</p>
          </div>
        </section>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#cfb095]/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#a07850] text-lg">auto_stories</span>
              </div>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">High</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Readability</p>
              <p className="font-headline font-bold text-lg text-slate-900">Elite</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#cfb095]/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#a07850] text-lg">verified_user</span>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Test Coverage</p>
              <p className="font-headline font-bold text-lg text-slate-900">88.4%</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#cfb095]/15 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#a07850] text-lg">checklist</span>
              </div>
              <span className="material-symbols-outlined text-emerald-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Completeness</p>
              <p className="font-headline font-bold text-lg text-slate-900">Optimal</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl flex flex-col gap-3 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 text-lg">gpp_maybe</span>
              </div>
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Low</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Vulnerabilities</p>
              <p className="font-headline font-bold text-lg text-slate-900">2 Found</p>
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-slate-900 p-6 rounded-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#cfb095] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="text-[#cfb095] text-[10px] font-bold uppercase tracking-widest">AI Insight</span>
            </div>
            <p className="text-white font-headline font-semibold text-base leading-snug">
              Boost score to 98% by refining the 'Installation' section.
            </p>
            <button
              onClick={() => {}}
              className="mt-4 bg-[#cfb095] text-[#2c1e14] px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform hover:bg-[#bca188]"
            >
              Optimize Now
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-white text-9xl">insights</span>
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-3 pb-8 bg-white/90 backdrop-blur-2xl z-50 rounded-t-2xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 active:scale-90 transition-all hover:text-slate-700">
          <span className="material-symbols-outlined mb-1">folder_open</span>
          <span className="text-[11px] font-semibold tracking-wide uppercase">Projects</span>
        </Link>
        <button className="flex flex-col items-center justify-center bg-slate-800 text-white rounded-2xl px-5 py-2 active:scale-90 transition-all">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
          <span className="text-[11px] font-semibold tracking-wide uppercase">Stats</span>
        </button>
        <Link to="/settings" className="flex flex-col items-center justify-center text-slate-400 px-5 py-2 active:scale-90 transition-all hover:text-slate-700">
          <span className="material-symbols-outlined mb-1">settings</span>
          <span className="text-[11px] font-semibold tracking-wide uppercase">Settings</span>
        </Link>
      </nav>
    </>
  )
}
