import React from "react"

export default function PreviewPanel() {
  return (
    <aside className="w-[400px] bg-white border-l border-slate-100 flex flex-col z-40 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/90 backdrop-blur-md">
        <h3 className="font-headline font-bold text-slate-900">Live Preview</h3>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all">
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
          <button className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all">
            <span className="material-symbols-outlined text-sm">download</span>
          </button>
          <button className="px-3 py-1 text-xs font-bold rounded-lg bg-primary text-white hover:opacity-90 transition-all flex items-center gap-1 shadow-sm shadow-primary/20">
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            Push
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quality Meter */}
        <div className="p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group bg-white">
          <div className="flex items-center gap-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-slate-100" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="176" strokeDashoffset="14" strokeWidth="4"></circle>
              </svg>
              <span className="absolute text-sm font-bold text-slate-900">92%</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Curator Score</h4>
              <p className="text-xs text-slate-600 font-medium">Excellent clarity and coverage.</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Suggestions</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Add license badge (Recommended)
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Elaborate on contribution guidelines
              </li>
            </ul>
          </div>
        </div>
        {/* Markdown Card (Light Code Theme) */}
        <div className="bg-white rounded-3xl p-6 font-mono text-[13px] leading-relaxed border border-slate-200 shadow-xl shadow-slate-100/50">
          <div className="flex gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          </div>
          <div className="text-primary font-bold"># README-AI-Core</div>
          <div className="text-slate-600 mt-2">Automated documentation curator for modern engineering teams.</div>
          <div className="text-slate-900 font-bold mt-6">## 🚀 Features</div>
          <div className="text-slate-700">
            - AST parsing for dynamic mapping<br/>
            - Multi-language support<br/>
            - Glassmorphic UI exports
          </div>
          <div className="text-slate-900 font-bold mt-6">## 📦 Installation</div>
          <div className="bg-slate-50 p-3 rounded-xl mt-2 text-slate-800 border border-slate-100">
            <span className="text-primary">$</span> npm install readme-ai
          </div>
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">AI Context</p>
            <p className="text-[11px] text-slate-600 mt-1 italic font-medium">"Generating architecture overview based on folder structure..."</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
