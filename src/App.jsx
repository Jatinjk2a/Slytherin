import { Routes, Route } from "react-router-dom"
import { ErrorBoundary } from "@/ErrorBoundary"
import AppLayout from "@/layouts/AppLayout"
import Dashboard from "@/pages/Dashboard"
import Landing from "@/pages/Landing"
import History from "@/pages/History"
import Settings from "@/pages/Settings"
import Curator from "@/pages/Curator"
import Login from "@/pages/Login"
import Profile from "@/pages/Profile"
import Signup from "@/pages/Signup"
import PasswordReset from "@/pages/PasswordReset"
import Billing from "@/pages/Billing"
import InfoShell from "@/pages/InfoShell"
import Setup from "@/pages/Setup"
import CodeExplain from "@/pages/CodeExplain"
import Score from "@/pages/Score"

function App() {
  return (
    <Routes>
      {/* Standalone Pages without Sidebar */}
      <Route path="/" element={<ErrorBoundary><Landing /></ErrorBoundary>} />
      <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
      <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
      <Route path="/forgot" element={<ErrorBoundary><PasswordReset /></ErrorBoundary>} />
      <Route path="/info/:slug" element={<ErrorBoundary><InfoShell /></ErrorBoundary>} />

      {/* Dashboard Pages with Sidebar wrapped in AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
        <Route path="/history" element={<ErrorBoundary><History /></ErrorBoundary>} />
        <Route element={<ErrorBoundary><Settings /></ErrorBoundary>} path="/settings"/>
        <Route element={<ErrorBoundary><Profile /></ErrorBoundary>} path="/profile"/>
      </Route>

      {/* Full-screen pages with their own headers (no sidebar) */}
      <Route element={<ErrorBoundary><Billing /></ErrorBoundary>} path="/settings/billing"/>
      <Route element={<ErrorBoundary><Curator /></ErrorBoundary>} path="/curator"/>
      <Route element={<ErrorBoundary><Setup /></ErrorBoundary>} path="/setup"/>
      <Route element={<ErrorBoundary><CodeExplain /></ErrorBoundary>} path="/explain"/>
      <Route element={<ErrorBoundary><Score /></ErrorBoundary>} path="/score"/>

      {/* 404 catch-all */}
      <Route path="*" element={
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <span className="text-6xl font-black text-zinc-200">404</span>
          <p className="text-zinc-500 font-medium">Page not found</p>
          <a href="/dashboard" className="text-sm font-bold text-[#cfb095] hover:underline">Go to Dashboard</a>
        </div>
      } />
    </Routes>
  )
}

export default App;
