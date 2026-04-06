import React from "react"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <>
      

<header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-50 bg-white/80 backdrop-blur-xl font-['Inter'] text-sm border-b border-outline-variant">
<div className="flex items-center gap-8">
<span className="text-lg font-black text-on-background tracking-tight">README AI</span>
<nav className="hidden md:flex gap-6">
<a className="text-on-surface-variant hover:text-primary transition-all font-medium" href="#">Docs</a>
<a className="text-on-surface-variant hover:text-primary transition-all font-medium" href="#">Community</a>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-4 mr-4">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-background transition-colors" data-icon="light_mode">light_mode</span>
<Link className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-on-background transition-colors" data-icon="account_circle" to="/login">account_circle</Link>
</div>
<Link className="hazelnut-button px-6 py-2 rounded-full font-bold tracking-tight active:scale-95 transition-all text-center flex items-center justify-center" to="/dashboard">
            Generate
        </Link>
</div>
</header>
<main className="relative overflow-hidden">

<section className="relative pt-24 pb-32 px-8 flex flex-col items-center text-center max-w-7xl mx-auto">
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-outline mb-8">
<span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
<span className="text-xs font-semibold text-primary tracking-widest uppercase">The Digital Curator is Live</span>
</div>
<h1 className="font-headline font-extrabold text-6xl md:text-8xl tracking-tight text-on-background mb-6 max-w-5xl">
            Turn your code into <span className="gradient-text">a story</span>
</h1>
<p className="font-body text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
            Experience high-end editorial documentation powered by intelligence. We don't just generate text; we present your architecture with authoritative precision.
        </p>
<div className="flex flex-col sm:flex-row gap-4 mb-24">
<Link className="hazelnut-button text-lg font-bold px-10 py-5 rounded-2xl tracking-wide shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center" to="/dashboard">
                GENERATE README
            </Link>
<Link className="bg-surface-container text-on-background text-lg font-bold px-10 py-5 rounded-2xl hover:bg-surface-container-high transition-all border border-outline text-center flex items-center justify-center" to="/dashboard">
                View Demo
            </Link>
</div>

<div className="w-full max-w-6xl relative">
<div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-10"></div>
<div className="relative glass-panel rounded-3xl p-4 md:p-8 border border-outline shadow-xl">

<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 pb-8 border-b border-outline">
<div className="w-full md:w-2/3 relative group">
<span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant" data-icon="link">link</span>
<input className="w-full bg-surface-container-low border border-outline rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all" placeholder="https://github.com/username/repository" type="text"/>
</div>
<Link className="w-full md:w-auto hazelnut-button px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2" to="/dashboard">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                        Analyze Repo
                    </Link>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">

<div className="lg:col-span-5 bg-on-background rounded-2xl p-6 overflow-hidden">
<div className="flex items-center gap-2 mb-4">
<span className="text-xs font-mono text-primary/70 uppercase tracking-widest">Repository Context</span>
</div>
<div className="font-mono text-sm space-y-3">
<div className="flex gap-4"><span className="text-primary/30">01</span> <span className="text-white">import {"{"} curate {"}"} from "@readme-ai/core";</span></div>
<div className="flex gap-4"><span className="text-primary/30">02</span> <span className="text-white">const repo = await load("octocat/hello-world");</span></div>
<div className="flex gap-4"><span className="text-primary/30">03</span> <span className="text-white">const analysis = await repo.analyze();</span></div>
<div className="flex gap-4"><span className="text-primary/30">04</span> <span className="text-primary"># Found 12 components</span></div>
<div className="flex gap-4"><span className="text-primary/30">05</span> <span className="text-primary"># Mapping architectural flow...</span></div>
<div className="flex gap-4"><span className="text-primary/30">06</span> <span className="text-white">generate(analysis, {"{"} theme: "minimal" {"}"});</span></div>
</div>
</div>

<div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-outline">
<div className="flex items-center justify-between mb-6">
<div className="flex gap-2">
<div className="w-3 h-3 rounded-full bg-red-400"></div>
<div className="w-3 h-3 rounded-full bg-amber-400"></div>
<div className="w-3 h-3 rounded-full bg-green-400"></div>
</div>
<span className="text-xs font-mono text-on-surface-variant">README.md</span>
</div>
<h3 className="font-headline font-bold text-3xl text-on-background mb-4">Project Phoenix</h3>
<p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
                            A high-performance synchronization engine built with Rust. Phoenix provides eventually consistent state across distributed nodes with zero overhead.
                        </p>
<div className="grid grid-cols-2 gap-4 mb-6">
<div className="bg-surface-container p-4 rounded-xl">
<div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Architecture</div>
<div className="text-primary font-bold text-xs">Event-Driven Mesh</div>
</div>
<div className="bg-surface-container p-4 rounded-xl">
<div className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Primary Stack</div>
<div className="text-primary font-bold text-xs">Rust • WASM • GRPC</div>
</div>
</div>
<div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
<div className="h-full bg-primary w-2/3"></div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="py-32 px-8 max-w-7xl mx-auto bg-surface-container-low rounded-[3rem]">
<div className="text-center mb-20">
<h2 className="font-headline text-4xl font-extrabold text-on-background mb-4 italic">The Developer's Edge</h2>
<div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="group bg-white p-8 rounded-3xl border border-outline hover:border-primary/50 hover:shadow-xl transition-all duration-300">
<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="neurology">neurology</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-background mb-4">AI-Powered Curation</h3>
<p className="text-on-surface-variant leading-relaxed">
                    Our model doesn't just read files; it understands intent. It extracts the soul of your code to write documentation that sounds human.
                </p>
</div>

<div className="group bg-white p-8 rounded-3xl border border-outline hover:border-primary/50 hover:shadow-xl transition-all duration-300">
<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="touch_app">touch_app</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-background mb-4">One-Click Polish</h3>
<p className="text-on-surface-variant leading-relaxed">
                    Input a URL, click a button, and receive a professional README ready for your top-tier repositories. No configuration hell.
                </p>
</div>

<div className="group bg-white p-8 rounded-3xl border border-outline hover:border-primary/50 hover:shadow-xl transition-all duration-300">
<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="publish">publish</span>
</div>
<h3 className="font-headline text-xl font-bold text-on-background mb-4">Native GitHub Push</h3>
<p className="text-on-surface-variant leading-relaxed">
                    Seamlessly commit generated docs back to your repository. Integrated directly with your workflow through secure OAuth.
                </p>
</div>
</div>
</section>

<section className="py-24 px-8">
<div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden relative border border-outline">
<div className="absolute inset-0 bg-surface-container-low"></div>
<div className="relative z-10 p-12 md:p-20 flex flex-col items-center text-center">
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-background mb-8">Ready to curate your next masterpiece?</h2>
<div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
<input className="flex-grow bg-white border border-outline text-on-background rounded-2xl px-6 py-4 focus:ring-primary focus:border-primary" placeholder="Enter your email" type="email"/>
<Link className="hazelnut-button px-8 py-4 rounded-2xl font-bold text-lg whitespace-nowrap shadow-lg flex justify-center items-center" to="/signup">Get Started</Link>
</div>
<p className="mt-8 text-on-surface-variant font-medium text-sm flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-base" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
                    Join 2,000+ developers documenting with README AI
                </p>
</div>

<div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
</div>
</section>
</main>

<footer className="bg-surface-container-low border-t border-outline py-16 px-8 mt-20">
<div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
<div className="col-span-2 md:col-span-1">
<div className="text-xl font-black text-on-background mb-6">README AI</div>
<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                The Digital Curator for professional developers. Elevate your documentation from static text to architectural stories.
            </p>
<div className="flex gap-4">
<span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer" data-icon="public">public</span>
<span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer" data-icon="terminal">terminal</span>
</div>
</div>
<div>
<h4 className="text-on-background font-bold mb-6">Product</h4>
<ul className="space-y-4 text-on-surface-variant text-sm font-medium">
<li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
</ul>
</div>
<div>
<h4 className="text-on-background font-bold mb-6">Company</h4>
<ul className="space-y-4 text-on-surface-variant text-sm font-medium">
<li><a className="hover:text-primary transition-colors" href="#">About</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
</ul>
</div>
<div>
<h4 className="text-on-background font-bold mb-6">Support</h4>
<ul className="space-y-4 text-on-surface-variant text-sm font-medium">
<li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
<li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
</ul>
</div>
</div>
<div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline flex flex-col md:flex-row justify-between items-center gap-4">
<div className="text-on-surface-variant text-xs">© 2024 README AI. All rights reserved.</div>
<div className="flex gap-8 text-xs text-on-surface-variant font-medium">
<a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
</footer>

    </>
  )
}
