import React from "react"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/context/AppProvider"

export default function Settings() {
  const { user, setUser, theme, toggleTheme } = useApp()
  const navigate = useNavigate()

  const handleSaveProfile = () => {
    alert('Profile saved!')
  }

  return (
    <>
      
      {/* Main Content Canvas */}
<main className=" min-h-screen p-8 lg:p-12 max-w-6xl">
{/* Header Section */}
<header className="mb-12">
<h1 className="font-headline text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">Account Settings</h1>
<p className="text-zinc-500 text-lg">Manage your profile, API tokens, and AI generation preferences.</p>
</header>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left Column: Settings Cards */}
<div className="lg:col-span-8 space-y-8">
{/* Section: Profile */}
<section className="bg-surface-container-low rounded-[2rem] p-8">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-2xl bg-hazelnut/10 flex items-center justify-center text-hazelnut">
<span className="material-symbols-outlined" data-icon="person">person</span>
</div>
<div>
<h2 className="text-xl font-bold font-headline text-zinc-900">Profile Information</h2>
<p className="text-sm text-zinc-500">Update your personal details and how we contact you.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Full Name</label>
<input onChange={(e) => setUser(prev => ({...prev, name: e.target.value}))} className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-hazelnut/20 outline-none transition-all placeholder:text-zinc-300" type="text" value={user.name}/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">Email Address</label>
<input className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-hazelnut/20 outline-none transition-all placeholder:text-zinc-300" type="email" value="alex.rivera@readme.ai" readOnly/>
</div>
<div className="md:col-span-2 flex justify-end pt-4">
<button onClick={handleSaveProfile} className="px-8 py-3 bg-hazelnut text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all">
                                Save Profile
                            </button>
</div>
</div>
</section>
{/* Section: API Integrations */}
<section className="bg-surface-container-low rounded-[2rem] p-8">
<div className="flex items-center justify-between mb-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-white">
<span className="material-symbols-outlined" data-icon="api">api</span>
</div>
<div>
<h2 className="text-xl font-bold font-headline text-zinc-900">API Integrations</h2>
<p className="text-sm text-zinc-500">Connect your version control systems.</p>
</div>
</div>
</div>
<div className="bg-white rounded-[1.5rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
<img alt="GitHub" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcqRujksGbFV_WFIIIuuveQhuTj60psdstzQFIi-LYpizD8aAK91FEh6JosLAU_SPO1U15dT8yzFGjjdhWsKZsVU6z7UvDucZfGDR10oreMob9xM-cB9iOkY3CjSzR5kVFV8OWZHAKz7mESGNnCW2lvHY6XgBeNwix3rx6ybBb8Cpbn7clEcHcNX0iKd3LL39ytkTRF0a8llGpk1WJVy5wWe-ry4WfMHiZYUIL-h0Oz3ck4_iCg06MKrgf95tSAC52mFH7pp4JK0qF"/>
</div>
<div>
<h3 className="font-bold text-zinc-900">GitHub Token</h3>
<div className="flex items-center gap-2 mt-0.5">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-xs font-mono text-zinc-400">ghp_************************4k2a</span>
</div>
</div>
</div>
<div className="flex items-center gap-3">
<button className="px-4 py-2 text-zinc-500 font-bold text-xs hover:bg-zinc-50 rounded-xl transition-colors">Disconnect</button>
<button className="px-5 py-2.5 bg-hazelnut text-white rounded-xl font-bold text-xs flex items-center gap-2 active:scale-95 transition-transform">
<span className="material-symbols-outlined text-sm" data-icon="refresh">refresh</span>
                                Refresh Connection
                            </button>
</div>
</div>
</section>
</div>
{/* Right Column: Preferences & Stats */}
<div className="lg:col-span-4 space-y-8">
{/* Section: Preferences */}
<section className="bg-surface-container-low rounded-[2rem] p-8">
<h2 className="text-xl font-bold font-headline text-zinc-900 mb-6">Preferences</h2>
<div className="space-y-8">
{/* Theme Toggle */}
<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="font-bold text-sm text-zinc-800">Theme</span>
<span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mt-0.5">System Default</span>
</div>
<div className="flex p-1 bg-white rounded-xl gap-1">
<button onClick={toggleTheme} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>
<span className="material-symbols-outlined text-sm" data-icon="light_mode">light_mode</span>
</button>
<button onClick={toggleTheme} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-900'}`}>
<span className="material-symbols-outlined text-sm" data-icon="dark_mode">dark_mode</span>
</button>
</div>
</div>
{/* Language Selection */}
<div className="space-y-3">
<label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Documentation Language</label>
<div className="relative">
<select className="w-full bg-white border-0 rounded-xl px-4 py-3 appearance-none text-zinc-800 font-medium focus:ring-2 focus:ring-hazelnut/20 outline-none">
<option>English (US)</option>
<option>Spanish (LatAm)</option>
<option>French (FR)</option>
<option>German (DE)</option>
</select>
<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
<span className="material-symbols-outlined text-lg" data-icon="expand_more">expand_more</span>
</div>
</div>
</div>
{/* AI Output Tone */}
<div className="space-y-3">
<label className="text-xs font-bold uppercase tracking-wider text-zinc-400">AI Voice Tone</label>
<div className="grid grid-cols-2 gap-2">
<button className="py-3 rounded-xl border-2 border-hazelnut bg-hazelnut/5 text-hazelnut font-bold text-xs">Technical</button>
<button className="py-3 rounded-xl border-2 border-transparent bg-white text-zinc-400 hover:text-zinc-600 font-bold text-xs transition-colors">Conversational</button>
</div>
</div>
</div>
</section>
{/* Information Card */}
<section className="relative overflow-hidden rounded-[2rem] aspect-square group">
<img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="High-tech server room with neon blue and purple lighting, futuristic data processing visual" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkja7Ow3w6yP_kt-cYSSlKQC9JjX4GhNhYOV5FtTJd387nItgjzi9U4PWBZkdIRmyQRRZco7kNrPcBfxFXGx_kP9L2ArTZw_84VIVZrxK-_EwjwPDZVRbnBy1ueuDWpgLyNaA8DPxBAoMZyv8nBGC4KLDTjsOGtIP2139mvWrfqF_iHE1whRbME5-X3xvY3Rzs8aoRdL_Wak5OVXqlJxnMe8LAocUyQzxmGsw6x8LvfRKkV0dsxM80Ehe77RR_hF-Q77r4O7qGDu39"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent p-8 flex flex-col justify-end">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-[#89ceff]" data-icon="auto_awesome" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
<span className="text-[#89ceff] font-bold text-xs uppercase tracking-widest">Premium Active</span>
</div>
<h3 className="text-white font-headline text-2xl font-bold leading-tight mb-4">Unlimited Generations Enabled</h3>
<p className="text-zinc-300 text-sm mb-6">Your current plan includes prioritized GPU processing and private repo support.</p>
<button onClick={() => navigate('/settings/billing')} className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all">View Billing History</button>
</div>
</section>
</div>
</div>
{/* Footer Help */}
<footer className="mt-16 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-6">
<a className="text-sm text-zinc-400 hover:text-hazelnut transition-colors" href="#">Privacy Policy</a>
<a className="text-sm text-zinc-400 hover:text-hazelnut transition-colors" href="#">Terms of Service</a>
<a className="text-sm text-zinc-400 hover:text-hazelnut transition-colors" href="#">API Docs</a>
</div>
<p className="text-sm text-zinc-300">© 2024 README AI Engine. Built for developers.</p>
</footer>
</main>

    </>
  )
}
