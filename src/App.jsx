import { Routes, Route, Navigate } from "react-router-dom"
import { ErrorBoundary } from "@/ErrorBoundary"
import ProtectedRoute from "@/components/ProtectedRoute"
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
      {/* Public Pages */}
      <Route path="/" element={<ErrorBoundary><Landing /></ErrorBoundary>} />
      <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
      <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
      <Route path="/forgot" element={<ErrorBoundary><PasswordReset /></ErrorBoundary>} />
      <Route path="/info/:slug" element={<ErrorBoundary><InfoShell /></ErrorBoundary>} />

      {/* Protected Dashboard Pages with Sidebar */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
        <Route path="/history" element={<ErrorBoundary><History /></ErrorBoundary>} />
        <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
        <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
      </Route>

      {/* Protected full-screen pages (no sidebar) */}
      <Route path="/settings/billing" element={<ProtectedRoute><ErrorBoundary><Billing /></ErrorBoundary></ProtectedRoute>} />
      <Route path="/curator" element={<ProtectedRoute><ErrorBoundary><Curator /></ErrorBoundary></ProtectedRoute>} />
      <Route path="/setup" element={<ProtectedRoute><ErrorBoundary><Setup /></ErrorBoundary></ProtectedRoute>} />
      <Route path="/explain" element={<ProtectedRoute><ErrorBoundary><CodeExplain /></ErrorBoundary></ProtectedRoute>} />
      <Route path="/score" element={<ProtectedRoute><ErrorBoundary><Score /></ErrorBoundary></ProtectedRoute>} />

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

