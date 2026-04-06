import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const TONES = [
  { id: 'Technical', icon: 'code', description: 'Architecture, API refs & implementation details.' },
  { id: 'Conversational', icon: 'chat_bubble', description: 'Friendly, approachable tone for open-source.' },
  { id: 'Minimalist', icon: 'short_text', description: 'Concise and to the point — no fluff.' },
]

export default function Setup() {
  const navigate = useNavigate()
  const [tone, setTone] = useState('Technical')
  const [ignorePaths, setIgnorePaths] = useState(['node_modules/', '.env', 'build/'])
  const [newPath, setNewPath] = useState('')
  const [saved, setSaved] = useState(false)

  const handleAddPath = () => {
    if (newPath.trim()) {
      setIgnorePaths(prev => [...prev, newPath.trim()])
      setNewPath('')
    }
  }
  const handleRemovePath = (path) => setIgnorePaths(prev => prev.filter(p => p !== path))
  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-slate-600 text-[20px]">arrow_back</span>
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-900 font-headline tracking-tight leading-none">Repository Setup</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Configure AI documentation</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200">
            <img
              alt="User"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlQ0B8ObtPl9QohOj90mYPQIl6f9AiQyHTQejDSlD5tgWymDTQUWJZ9LuUo1WnqJ7xZoGgFXHQ8MbQd2mGGRTEr7ee5ZPUmdHSfNZNJ3mtQGqawVG07lkg9Eu6DrKowv46_JKJKhbVSEI7kvNKAjOKjfsE1x94osqiLVLBuIFAqOr5B2obKCANcy0DL_2fSO3Y8VAsC3afk28bLk0cgG-PnIHiOdvE1PPFwTfhs7A5wBjfGFm57o5ZuRE7d-BSY9QqiXiZvWmCXQ_C"
            />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="min-h-screen bg-slate-50 pt-24 pb-36 px-6">
        <div className="max-w-lg mx-auto space-y-5">

          {/* Documentation Tone Card */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#cfb095]/15 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#a07850] text-[18px]">auto_awesome</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-slate-900 text-sm">Documentation Tone</h3>
                <p className="text-xs text-slate-500 mt-0.5">Choose how AI writes your README</p>
              </div>
            </div>

            <div className="space-y-3">
              {TONES.map(({ id, icon, description }) => {
                const isSelected = tone === id
                return (
                  <button
                    key={id}
                    onClick={() => setTone(id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-200 border ${
                      isSelected
                        ? 'bg-slate-800 border-slate-700 shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/15' : 'bg-white border border-slate-200'
                    }`}>
                      <span className={`material-symbols-outlined text-[18px] ${
                        isSelected ? 'text-white' : 'text-slate-500'
                      }`}>
                        {icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-800'}`}>{id}</p>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{description}</p>
                    </div>
                    {isSelected && (
                      <span
                        className="material-symbols-outlined text-white text-[20px] ml-auto shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Ignore Paths Card */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-500 text-[18px]">visibility_off</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-slate-900 text-sm">Ignore Paths</h3>
                <p className="text-xs text-slate-500 mt-0.5">Files AI will skip during analysis</p>
              </div>
            </div>

            {/* Input */}
            <div className="relative mb-4">
              <input
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPath()}
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#cfb095] focus:ring-2 focus:ring-[#cfb095]/20 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 placeholder:text-slate-400 transition-all outline-none font-mono"
                placeholder="Add path (e.g. docs/*.md)"
                type="text"
              />
              <button
                onClick={handleAddPath}
                className="absolute right-2 top-2 w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            {/* Path list */}
            <div className="space-y-2">
              {ignorePaths.map((path) => (
                <div key={path} className="flex items-center justify-between px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">folder</span>
                    <code className="font-mono text-xs text-slate-700">{path}</code>
                  </div>
                  <button
                    onClick={() => handleRemovePath(path)}
                    className="text-slate-300 hover:text-red-500 transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Save Button */}
          <section>
            <button
              onClick={handleSave}
              className={`w-full py-4 rounded-2xl font-headline font-bold text-sm tracking-widest uppercase active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-white shadow-lg shadow-slate-800/20 hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {saved ? 'check_circle' : 'save'}
              </span>
              {saved ? 'Configuration Saved!' : 'Save Configuration'}
            </button>
          </section>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl rounded-t-2xl z-50 border-t border-slate-200 shadow-[0px_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around items-center px-4 pb-6 pt-3 max-w-lg mx-auto">
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 transition-colors">
            <span className="material-symbols-outlined">folder_open</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Projects</span>
          </Link>
          <Link to="/dashboard" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 transition-colors">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Generate</span>
          </Link>
          <Link to="/history" className="flex flex-col items-center justify-center text-slate-400 p-3 hover:text-slate-700 transition-colors">
            <span className="material-symbols-outlined">history</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">History</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center justify-center bg-slate-100 text-slate-700 rounded-xl p-3">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Subtle background decorations */}
      <div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-[#cfb095]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>
    </>
  )
}
