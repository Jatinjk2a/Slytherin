import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import PreviewPanel from "@/components/layout/PreviewPanel"
import { useApp } from "@/context/AppProvider"

export default function Dashboard() {
  const { currentPrompt, setCurrentPrompt, isGenerating, generateReadme } = useApp()
  const navigate = useNavigate()

  const handleEngage = (e) => {
    e.preventDefault()
    if (!currentPrompt) return
    generateReadme(currentPrompt)
  }

  // Navigate to curator once generation finishes
  useEffect(() => {
    if (isGenerating) {
      const timer = setTimeout(() => {
        navigate('/curator')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isGenerating, navigate])
  return (
    <>
      <div className="flex flex-1 flex-col relative bg-white h-full">
        <Navbar />
        <section className="p-8 max-w-5xl mx-auto w-full space-y-12">
          {/* Input Area */}
          <div className="space-y-6">
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-slate-900">Curate your code identity.</h2>
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <div className="relative group">
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 pl-14 text-lg text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 placeholder:text-slate-400 transition-all outline-none shadow-sm" 
                  placeholder="https://github.com/username/repository" 
                  type="text"
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEngage(e)}
                />
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-2xl">link</span>
              </div>
              <button 
                onClick={handleEngage}
                disabled={isGenerating || !currentPrompt}
                className="bg-primary px-10 rounded-3xl text-white font-bold tracking-widest uppercase text-sm hover:shadow-[0_10px_25px_rgba(207,176,149,0.2)] transition-all active:scale-95 h-full disabled:opacity-50 disabled:cursor-not-allowed">
                {isGenerating ? "Engaging..." : "Engage AI"}
              </button>
            </div>
          </div>

          {/* Tabs & Content Area */}
          <div className="space-y-8">
            <div className="flex gap-8 border-b border-slate-200">
              <button className="pb-4 text-primary font-bold border-b-2 border-primary transition-all">Overview</button>
              <Link to="/setup" className="pb-4 text-slate-500 hover:text-slate-900 transition-all font-medium">Setup</Link>
              <Link to="/explain" className="pb-4 text-slate-500 hover:text-slate-900 transition-all font-medium">Code Explain</Link>
              <Link to="/score" className="pb-4 text-slate-500 hover:text-slate-900 transition-all font-medium">Score</Link>
            </div>
            <div className="bg-white border border-slate-200 rounded-3xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
              
              {isGenerating ? (
                <div className="relative flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center ai-pulse mb-8 relative">
                    <span className="material-symbols-outlined text-white text-4xl animate-pulse" style={{fontVariationSettings: "'FILL' 1"}}>neurology</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">Reading repository structure...</h3>
                  <p className="text-slate-600 max-w-md font-medium">Our AI is currently mapping your file hierarchy and analyzing module dependencies to craft the perfect README.</p>
                  <div className="mt-8 flex gap-3">
                    <span className="px-4 py-1.5 bg-white border border-slate-200 shadow-sm rounded-full text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {currentPrompt || "src/core/parser.ts"}
                    </span>
                    <span className="px-4 py-1.5 bg-white border border-slate-200 shadow-sm rounded-full text-xs text-slate-700 font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse"></span>
                      Analyzing AST
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col items-center opacity-50">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center bg-slate-100 mb-8 relative">
                    <span className="material-symbols-outlined text-slate-300 text-4xl">inventory_2</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-slate-400 mb-2">Ready to Curate</h3>
                  <p className="text-slate-400 max-w-md font-medium">Enter a github repository URL above to begin the automated documentation process.</p>
                </div>
              )}
            </div>
          </div>

          {/* Bento Info Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-lg font-headline font-bold text-slate-900">Suggested Themes</h4>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Editorial Style</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-primary/50 shadow-sm">
                  <p className="text-sm font-bold text-slate-900 mb-1">Minimalist Obsidian</p>
                  <p className="text-xs text-slate-600">Clean, dark, and focused on code clarity.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-primary/50 shadow-sm">
                  <p className="text-sm font-bold text-slate-900 mb-1">Enterprise Blueprint</p>
                  <p className="text-xs text-slate-600">Detailed architecture and API docs.</p>
                </div>
              </div>
            </div>
            <div className="bg-[#fcf9f6] p-8 rounded-3xl border border-[#f5ece4] flex flex-col justify-center shadow-sm">
              <div className="mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
              </div>
              <p className="text-slate-800 font-bold leading-tight">Pro Tip: Use AI tags to auto-generate changelogs from commits.</p>
            </div>
          </div>
        </section>
      </div>
      <PreviewPanel />
    </>
  )
}
