import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Billing() {
  const navigate = useNavigate()

  const handleDownloadInvoice = () => alert('Invoice download coming soon!')
  const handleCancelPlan = () => { if (window.confirm('Are you sure you want to cancel your plan?')) alert('Plan cancellation requested.') }
  const handleViewTransactions = () => alert('Full transaction history coming soon!')
  return (
    <>
      

<header className="w-full sticky top-0 z-50 bg-white dark:bg-zinc-950 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
<div className="flex items-center gap-4">
<button onClick={() => navigate(-1)} className="active:scale-95 duration-150 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-full">
<span className="material-symbols-outlined text-zinc-500" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-lg tracking-tight">Billing</h1>
</div>
<div className="flex items-center">
<span className="text-hazelnut font-black">README AI</span>
</div>
</header>
<main className="px-6 py-8 max-w-xl mx-auto">

<div className="mb-10">
<h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Billing Overview</h2>
<p className="text-on-surface-variant text-sm">Manage your subscription and view payment history.</p>
</div>

<section className="mb-12">
<div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-8 border border-hazelnut/10 soft-elevation">

<div className="absolute -top-24 -right-24 w-48 h-48 bg-hazelnut/5 rounded-full blur-3xl"></div>
<div className="flex justify-between items-start mb-6">
<div>
<span className="text-xs font-bold tracking-widest uppercase text-hazelnut mb-1 block">Active Subscription</span>
<h3 className="font-headline text-2xl font-extrabold text-on-surface">Pro Plan</h3>
</div>
<div className="bg-hazelnut/10 px-3 py-1 rounded-full">
<span className="text-xs font-semibold text-hazelnut">Active</span>
</div>
</div>
<div className="space-y-4 mb-8">
<div className="flex justify-between items-center py-3 border-b border-zinc-50">
<span className="text-on-surface-variant text-sm">Renewal Date</span>
<span className="text-on-surface font-semibold text-sm">Nov 12, 2023</span>
</div>
<div className="flex justify-between items-center py-3 border-b border-zinc-50">
<span className="text-on-surface-variant text-sm">Amount</span>
<span className="text-on-surface font-bold text-lg">$19.00<span className="text-xs font-medium text-zinc-400">/mo</span></span>
</div>
</div>
<div className="flex flex-col gap-4">
<button onClick={handleDownloadInvoice} className="w-full hazelnut-gradient text-white py-4 rounded-xl font-headline font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform duration-200 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                        Download Invoice
                    </button>
<button onClick={handleCancelPlan} className="w-full text-zinc-400 hover:text-error transition-colors py-2 text-xs font-medium uppercase tracking-widest">
                        Cancel Plan
                    </button>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center justify-between">
<h3 className="font-headline text-xl font-bold text-on-surface">Billing History</h3>
<span className="material-symbols-outlined text-zinc-300" data-icon="history">history</span>
</div>
<div className="space-y-3">

<div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-hazelnut group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
</div>
<div>
<p className="font-semibold text-on-surface text-sm">Oct 12, 2023</p>
<p className="text-xs text-on-surface-variant">Transaction #82910</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-on-surface">$19.00</p>
<p className="text-[10px] uppercase font-bold text-emerald-600 tracking-tighter">Paid</p>
</div>
</div>

<div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-hazelnut group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
</div>
<div>
<p className="font-semibold text-on-surface text-sm">Sept 12, 2023</p>
<p className="text-xs text-on-surface-variant">Transaction #71822</p>
</div>
</div>
<div className="text-right">
<p className="font-bold text-on-surface">$19.00</p>
<p className="text-[10px] uppercase font-bold text-emerald-600 tracking-tighter">Paid</p>
</div>
</div>
</div>
<div className="flex justify-center pt-4">
<button onClick={handleViewTransactions} className="text-hazelnut text-sm font-semibold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                    View all transactions
                    <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</section>

<section className="mt-12 rounded-2xl bg-zinc-900 p-8 text-white relative overflow-hidden">
<div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
<span className="material-symbols-outlined text-9xl" data-icon="rocket_launch">rocket_launch</span>
</div>
<div className="relative z-10 max-w-[70%]">
<h4 className="font-headline text-xl font-extrabold mb-2">Switch to Annual</h4>
<p className="text-zinc-400 text-xs mb-6">Save 20% by switching to yearly billing and get 2 months free.</p>
<button className="bg-white text-zinc-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform">
                    Upgrade Now
                </button>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl z-50 border-t border-zinc-100 dark:border-zinc-800 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
<Link to="/dashboard" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 transition-transform duration-200 active:scale-90">
<span className="material-symbols-outlined mb-1" data-icon="code">code</span>
<span className="font-inter text-[11px] font-medium tracking-wide uppercase">Projects</span>
</Link>
<Link to="/score" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 transition-transform duration-200 active:scale-90">
<span className="material-symbols-outlined mb-1" data-icon="bar_chart">bar_chart</span>
<span className="font-inter text-[11px] font-medium tracking-wide uppercase">Usage</span>
</Link>
<Link to="/settings/billing" className="flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20 rounded-xl px-3 py-1 transition-transform duration-200 active:scale-90">
<span className="material-symbols-outlined mb-1" data-icon="payments" style={{fontVariationSettings: "'FILL' 1"}}>payments</span>
<span className="font-inter text-[11px] font-medium tracking-wide uppercase">Billing</span>
</Link>
<Link to="/settings" className="flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 transition-transform duration-200 active:scale-90">
<span className="material-symbols-outlined mb-1" data-icon="settings">settings</span>
<span className="font-inter text-[11px] font-medium tracking-wide uppercase">Settings</span>
</Link>
</nav>

    </>
  )
}
