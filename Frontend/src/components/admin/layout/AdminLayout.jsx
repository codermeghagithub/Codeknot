import React, { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import { Loader2 } from 'lucide-react';

function AdminLoadingFallback() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      <p className="text-xs font-mono text-stone-600 dark:text-zinc-400">Loading Admin Module...</p>
    </div>
  );
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex font-sans antialiased transition-colors duration-200 relative overflow-x-hidden">
      {/* Ambient Dashboard Glow Orbs (matching StudioWorkspace) */}
      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-rose-500/5 blur-[120px] pointer-events-none -z-0" />
      <div className="fixed top-1/3 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/10 via-orange-500/10 to-stone-500/5 blur-[150px] pointer-events-none -z-0" />
      <div className="fixed -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-orange-600/15 via-amber-500/10 to-emerald-500/5 blur-[130px] pointer-events-none -z-0" />

      {/* 1. Left Fixed Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* 2. Main Area (offset by sidebar on desktop) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 z-10">
        {/* Topbar */}
        <AdminTopbar onOpenMobile={() => setMobileOpen(true)} />

        {/* Content View with Page-Level Suspense */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<AdminLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}



