import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Hero from './components/Hero';
import AdminDashboard from './components/admin/AdminDashboard';
import DeploymentPage from './components/deploy/DeploymentPage';
import { ShieldCheck, Rocket } from 'lucide-react';
import { portfolioAPI, type Profile, fallbackProfile } from '@/lib/api';
import './App.css';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(window.location.hash === '#admin');
  const [isDeployOpen, setIsDeployOpen] = useState(window.location.hash === '#deploy');
  const [profile, setProfile] = useState<Profile>(fallbackProfile);

  useEffect(() => {
    portfolioAPI.getProfile().then((data) => {
      if (data) setProfile(data);
    });

    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === '#admin');
      setIsDeployOpen(window.location.hash === '#deploy');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminOpen(true);
    setIsDeployOpen(false);
  };

  const openDeploy = () => {
    window.location.hash = '#deploy';
    setIsDeployOpen(true);
    setIsAdminOpen(false);
  };

  const closeModals = () => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setIsAdminOpen(false);
    setIsDeployOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Sophisticated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Minimal geometric patterns */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
      </div>

      <main className="relative z-10">
        <Hero initialProfile={profile} />
      </main>

      {/* Discreet Launchers (Bottom Left) */}
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        <button
          onClick={openAdmin}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-white/30 backdrop-blur-md text-xs text-white/70 hover:text-white transition-all shadow-xl hover:scale-105"
          title="Open Admin Studio (#admin)"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 group-hover:text-blue-300" />
          <span className="font-medium hidden sm:inline">Admin CMS</span>
        </button>

        <button
          onClick={openDeploy}
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 border border-cyan-500/20 hover:border-cyan-400/40 backdrop-blur-md text-xs text-white/70 hover:text-white transition-all shadow-xl hover:scale-105"
          title="Open Deployment Center (#deploy)"
        >
          <Rocket className="w-3.5 h-3.5 text-cyan-400 group-hover:text-cyan-300" />
          <span className="font-medium hidden sm:inline">Deploy Center</span>
        </button>
      </div>

      {/* Full Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={closeModals}
          onProfileUpdated={(updated) => setProfile(updated)}
          onOpenDeploy={openDeploy}
        />
      )}

      {/* Dedicated Deployment Page UI Overlay */}
      {isDeployOpen && (
        <DeploymentPage
          onClose={closeModals}
          onOpenAdmin={openAdmin}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;