import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function CodeExplain() {
  const navigate = useNavigate()
  return (
    <>
      

<header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-white dark:bg-zinc-950 rounded-b-2xl">
<div className="flex items-center w-full justify-between">
<div className="flex items-center gap-4">
<button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">arrow_back</span>
</button>
<h1 className="font-['Manrope'] font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">File: App.jsx</h1>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
<span className="material-symbols-outlined text-zinc-500">more_vert</span>
</button>
</div>
</header>
<main className="pt-20 pb-32 px-5 max-w-2xl mx-auto space-y-8">

<section className="relative">
<div className="flex items-center justify-between mb-3 px-1">
<span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Source Code</span>
<span className="flex items-center gap-1.5 text-xs font-medium text-secondary">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Javascript
                </span>
</div>
<div className="bg-zinc-900 rounded-3xl p-6 shadow-2xl overflow-hidden font-mono text-sm leading-relaxed border border-zinc-800">
<div className="flex gap-2 mb-4">
<div className="w-3 h-3 rounded-full bg-zinc-700"></div>
<div className="w-3 h-3 rounded-full bg-zinc-700"></div>
<div className="w-3 h-3 rounded-full bg-zinc-700"></div>
</div>
<pre className="text-zinc-300 overflow-x-auto"><span className="syntax-keyword">import</span> React, {"{"} useState, useEffect {"}"} <span className="syntax-keyword">from</span> <span className="syntax-string">'react'</span>;

<span className="syntax-keyword">const</span> <span className="syntax-function">UserProfile</span> = ({"{"} userId {"}"}) =&gt; {"{"}
  <span className="syntax-keyword">const</span> [user, setUser] = <span className="syntax-function">useState</span>(<span className="syntax-keyword">null</span>);
  <span className="syntax-keyword">const</span> [loading, setLoading] = <span className="syntax-function">useState</span>(<span className="syntax-keyword">true</span>);

  <span className="syntax-function">useEffect</span>(() =&gt; {"{"}
    <span className="syntax-keyword">const</span> <span className="syntax-function">fetchData</span> = <span className="syntax-keyword">async</span> () =&gt; {"{"}
      <span className="syntax-keyword">try</span> {"{"}
        <span className="syntax-keyword">const</span> res = <span className="syntax-keyword">await</span> <span className="syntax-function">fetch</span>(<span className="syntax-string">`/api/v1/users/</span>{"{"}userId{"}"}<span className="syntax-string">`</span>);
        <span className="syntax-keyword">const</span> data = <span className="syntax-keyword">await</span> res.<span className="syntax-function">json</span>();
        <span className="syntax-function">setUser</span>(data);
      {"}"} <span className="syntax-keyword">catch</span> (err) {"{"}
        console.<span className="syntax-function">error</span>(<span className="syntax-string">'Fetch failed'</span>, err);
      {"}"} <span className="syntax-keyword">finally</span> {"{"}
        <span className="syntax-function">setLoading</span>(<span className="syntax-keyword">false</span>);
      {"}"}
    {"}"};
    <span className="syntax-function">fetchData</span>();
  {"}"}, [userId]);

  <span className="syntax-keyword">return</span> loading ? <span className="syntax-operator">&lt;</span><span className="syntax-function">Loader</span> <span className="syntax-operator">/&gt;</span> : <span className="syntax-operator">&lt;</span><span className="syntax-function">Profile</span> user={"{"}user{"}"} <span className="syntax-operator">/&gt;</span>;
{"}"};</pre>
</div>
</section>

<section className="relative">
<div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-[0px_10px_30px_rgba(207,176,149,0.1)] relative overflow-hidden">

<div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/5 blur-[60px] rounded-full"></div>
<div className="flex flex-col gap-6 relative z-10">
<div className="flex items-center gap-4">
<div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
</div>
<div>
<h2 className="font-headline font-extrabold text-xl text-on-surface tracking-tight">AI Insights</h2>
<p className="text-xs text-secondary font-semibold uppercase tracking-widest">Code Analysis</p>
</div>
</div>
<div className="space-y-4">
<p className="text-on-surface leading-relaxed text-lg font-medium opacity-90">
                            This component implements an asynchronous data fetching pattern for user profiles.
                        </p>
<div className="grid grid-cols-1 gap-4">
<div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
<div className="flex gap-3">
<span className="material-symbols-outlined text-secondary text-xl">psychology</span>
<p className="text-sm text-on-surface-variant leading-relaxed">
                                        It utilizes the <code className="bg-secondary/10 px-1 rounded text-secondary font-mono">useEffect</code> hook to trigger a network request whenever the <code className="bg-secondary/10 px-1 rounded text-secondary font-mono">userId</code> prop changes.
                                    </p>
</div>
</div>
<div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
<div className="flex gap-3">
<span className="material-symbols-outlined text-secondary text-xl">verified</span>
<p className="text-sm text-on-surface-variant leading-relaxed">
                                        Includes structured <code className="bg-secondary/10 px-1 rounded text-secondary font-mono">try-catch-finally</code> blocks to manage loading states and error handling gracefully.
                                    </p>
</div>
</div>
</div>
</div>
<div className="pt-4 flex items-center justify-between border-t border-outline-variant/10">
<div className="flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="portrait of a young software engineer smiling with glasses professional lighting neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO6EcWP1MXC5849-lcUciygKemhYJVN4mxQvtOLpofWFccc7zQ1wvLbUrZL7PGPhf3Jgc5OlG12kNmfKz0rlqv-gpcN-WZk_1Q3SCoEZq9TVL4LL6-43MLF2ylem2fazFmgwwl9nLaeEQYrSAOhja0tOk5VFHjwSuywbhyC7yS4e4XhtqQiQ8mjd7A-zfciRpWbszWHgKyztrOwLmDLOdqzM_yYfaUplp0FC84K5T6YieDI6yG8LZYcOHyt63MBtmZlsaLhGxKsngh"/>
<div className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold text-white uppercase">AI</div>
</div>
<button className="text-sm font-bold text-secondary flex items-center gap-1 hover:opacity-80 transition-opacity">
                            View Docs
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-highest p-5 rounded-3xl flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-secondary text-2xl">history</span>
<div>
<h3 className="font-headline font-bold text-sm">Review History</h3>
<p className="text-[10px] text-on-surface-variant mt-1">3 changes today</p>
</div>
</div>
<div className="bg-secondary-container p-5 rounded-3xl flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-secondary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>terminal</span>
<div>
<h3 className="font-headline font-bold text-sm">Run Tests</h3>
<p className="text-[10px] text-on-secondary-fixed-variant mt-1">Ready to deploy</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-6 pb-6 pt-2 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl rounded-t-[1.5rem] border-t border-zinc-200/15 dark:border-zinc-800/15 shadow-[0px_-20px_40px_rgba(0,0,0,0.05)]">
<Link to="/explain" className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl p-3 active:scale-90 transition-transform">
<span className="material-symbols-outlined">code</span>
<span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Explain</span>
</Link>
<Link to="/dashboard" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 p-3 hover:text-indigo-500 dark:hover:text-indigo-300 active:scale-90 transition-transform">
<span className="material-symbols-outlined">terminal</span>
<span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Terminal</span>
</Link>
<Link to="/history" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 p-3 hover:text-indigo-500 dark:hover:text-indigo-300 active:scale-90 transition-transform">
<span className="material-symbols-outlined">history</span>
<span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">History</span>
</Link>
<Link to="/settings" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 p-3 hover:text-indigo-500 dark:hover:text-indigo-300 active:scale-90 transition-transform">
<span className="material-symbols-outlined">settings</span>
<span className="font-['Inter'] text-[10px] uppercase tracking-widest mt-1">Settings</span>
</Link>
</nav>

    </>
  )
}
