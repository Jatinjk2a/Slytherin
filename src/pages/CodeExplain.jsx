import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function CodeExplain() {
  const navigate = useNavigate()
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors active:scale-95 duration-200"
            >
              <span className="material-symbols-outlined text-slate-700">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline font-bold text-base tracking-tight text-slate-900 leading-none">File: App.jsx</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Code Analysis</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-500">more_vert</span>
          </button>
        </div>
      </header>

      <main className="pt-20 pb-32 px-5 max-w-2xl mx-auto space-y-6 bg-slate-50 min-h-screen">

        {/* Source Code Block */}
        <section className="relative">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Source Code</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
              JavaScript
            </span>
          </div>
          <div className="bg-slate-900 rounded-2xl p-6 shadow-lg overflow-hidden font-mono text-sm leading-relaxed border border-slate-700">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>
            <pre className="text-slate-300 overflow-x-auto text-[13px] leading-6"><span className="text-purple-400">import</span> React, {"{"} useState, useEffect {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;

<span className="text-purple-400">const</span> <span className="text-blue-400">UserProfile</span> = ({"{"} userId {"}"}) <span className="text-purple-400">=&gt;</span> {"{"}
  <span className="text-purple-400">const</span> [user, setUser] = <span className="text-blue-400">useState</span>(<span className="text-purple-400">null</span>);
  <span className="text-purple-400">const</span> [loading, setLoading] = <span className="text-blue-400">useState</span>(<span className="text-purple-400">true</span>);

  <span className="text-blue-400">useEffect</span>(() <span className="text-purple-400">=&gt;</span> {"{"}
    <span className="text-purple-400">const</span> <span className="text-blue-400">fetchData</span> = <span className="text-purple-400">async</span> () <span className="text-purple-400">=&gt;</span> {"{"}
      <span className="text-purple-400">try</span> {"{"}
        <span className="text-purple-400">const</span> res = <span className="text-purple-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-green-400">`/api/v1/users/${"{"}userId{"}"}`</span>);
        <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> res.<span className="text-blue-400">json</span>();
        <span className="text-blue-400">setUser</span>(data);
      {"}"} <span className="text-purple-400">catch</span> (err) {"{"}
        console.<span className="text-blue-400">error</span>(<span className="text-green-400">'Fetch failed'</span>, err);
      {"}"} <span className="text-purple-400">finally</span> {"{"}
        <span className="text-blue-400">setLoading</span>(<span className="text-purple-400">false</span>);
      {"}"}
    {"}"};
    <span className="text-blue-400">fetchData</span>();
  {"}"}, [userId]);
{"}"};
</pre>
          </div>
        </section>

        {/* AI Insights Card */}
        <section>
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#cfb095]/8 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="flex flex-col gap-5 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#cfb095]/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#a07850] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div>
                  <h2 className="font-headline font-extrabold text-lg text-slate-900 tracking-tight">AI Insights</h2>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-0.5">Code Analysis</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-slate-700 leading-relaxed text-sm font-medium">
                  This component implements an asynchronous data fetching pattern for user profiles.
                </p>
                <div className="space-y-2.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-[#a07850] text-[18px] mt-0.5 shrink-0">psychology</span>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Uses the <code className="bg-[#cfb095]/15 px-1.5 py-0.5 rounded text-[#8a6440] font-mono text-xs">useEffect</code> hook to trigger a network request whenever <code className="bg-[#cfb095]/15 px-1.5 py-0.5 rounded text-[#8a6440] font-mono text-xs">userId</code> changes.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex gap-3">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] mt-0.5 shrink-0">verified</span>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Includes structured <code className="bg-[#cfb095]/15 px-1.5 py-0.5 rounded text-[#8a6440] font-mono text-xs">try-catch-finally</code> blocks to manage loading states and error handling gracefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <div className="flex -space-x-2">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO6EcWP1MXC5849-lcUciygKemhYJVN4mxQvtOLpofWFccc7zQ1wvLbUrZL7PGPhf3Jgc5OlG12kNmfKz0rlqv-gpcN-WZk_1Q3SCoEZq9TVL4LL6-43MLF2ylem2fazFmgwwl9nLaeEQYrSAOhja0tOk5VFHjwSuywbhyC7yS4e4XhtqQiQ8mjd7A-zfciRpWbszWHgKyztrOwLmDLOdqzM_yYfaUplp0FC84K5T6YieDI6yG8LZYcOHyt63MBtmZlsaLhGxKsngh"
                    alt="User"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                </div>
                <button className="text-sm font-bold text-[#a07850] flex items-center gap-1 hover:opacity-75 transition-opacity">
                  View Docs
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Cards */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between aspect-square hover:border-slate-300 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-slate-400 text-2xl">history</span>
            <div>
              <h3 className="font-headline font-bold text-sm text-slate-800">Review History</h3>
              <p className="text-[11px] text-slate-400 mt-1">3 changes today</p>
            </div>
          </div>
          <div className="bg-slate-800 p-5 rounded-2xl flex flex-col justify-between aspect-square hover:bg-slate-700 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-slate-300 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            <div>
              <h3 className="font-headline font-bold text-sm text-white">Run Tests</h3>
              <p className="text-[11px] text-slate-400 mt-1">Ready to deploy</p>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-6 pt-3 bg-white/90 backdrop-blur-xl rounded-t-2xl border-t border-slate-200 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
        <Link to="/explain" className="flex flex-col items-center justify-center bg-slate-800 text-white rounded-xl p-3 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">code</span>
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Explain</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">terminal</span>
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Terminal</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">History</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">Settings</span>
        </Link>
      </nav>
    </>
  )
}
