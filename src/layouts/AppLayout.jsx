import React from "react"
import { Outlet, Link } from "react-router-dom"
import Sidebar from "@/components/layout/Sidebar"

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col md:ml-64 w-full relative overflow-y-auto overflow-x-hidden">
        <Outlet />
      {/* Global Mobile Navigation Overlay */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-zinc-100 flex items-center justify-around z-50">
      <Link className="flex flex-col items-center justify-center text-zinc-400 hover:text-indigo-500" to="/dashboard">
      <span className="material-symbols-outlined">home</span>
      <span className="text-[10px] font-bold">Home</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-zinc-400 hover:text-indigo-500" to="/history">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>history</span>
      <span className="text-[10px] font-bold">History</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-zinc-400 hover:text-indigo-500" to="/settings">
      <span className="material-symbols-outlined">settings</span>
      <span className="text-[10px] font-bold">Settings</span>
      </Link>
      <Link className="flex flex-col items-center justify-center text-zinc-400 hover:text-indigo-500" to="/dashboard">
      <span className="material-symbols-outlined">analytics</span>
      <span className="text-[10px] font-bold">Dashboard</span>
      </Link>
      </nav>
      {/* Padding to prevent mobile nav from overlapping content */}
      <div className="h-16 md:hidden w-full shrink-0"></div>
      </main>
    </div>
  )
}
