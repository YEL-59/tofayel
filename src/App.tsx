import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Hero from './components/Hero';
import ContactPage from './components/contact/ContactPage';
import AdminDashboard from './components/admin/AdminDashboard';
import DeploymentPage from './components/deploy/DeploymentPage';
import { portfolioAPI, type Profile, fallbackProfile } from '@/lib/api';
import './App.css';

function checkRoute() {
  const path = window.location.pathname.replace(/\/$/, "");
  const hash = window.location.hash;
  return {
    isAdmin: path === "/admin" || hash === "#admin",
    isDeploy: path === "/deploy" || hash === "#deploy",
    isContact: path === "/contact" || hash === "#contact",
  };
}

function App() {
  const initialRoute = checkRoute();
  const [isAdminOpen, setIsAdminOpen] = useState(initialRoute.isAdmin);
  const [isDeployOpen, setIsDeployOpen] = useState(initialRoute.isDeploy);
  const [isContactOpen, setIsContactOpen] = useState(initialRoute.isContact);
  const [profile, setProfile] = useState<Profile>(fallbackProfile);

  useEffect(() => {
    portfolioAPI.getProfile().then((data) => {
      if (data) setProfile(data);
    });

    const syncRouteFromLocation = () => {
      const { isAdmin, isDeploy, isContact } = checkRoute();
      setIsAdminOpen(isAdmin);
      setIsDeployOpen(isDeploy);
      setIsContactOpen(isContact);

      // Normalize messy URLs (e.g. /admin#admin or #admin -> clean /admin)
      if (isAdmin && (window.location.hash || window.location.pathname !== "/admin")) {
        window.history.replaceState(null, "", "/admin");
      } else if (isDeploy && (window.location.hash || window.location.pathname !== "/deploy")) {
        window.history.replaceState(null, "", "/deploy");
      } else if (isContact && (window.location.hash || window.location.pathname !== "/contact")) {
        window.history.replaceState(null, "", "/contact");
      }
    };

    // Run initial normalization and record visit
    syncRouteFromLocation();
    portfolioAPI.recordVisit(window.location.pathname);

    const handleRouteChange = () => {
      syncRouteFromLocation();
      portfolioAPI.recordVisit(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("hashchange", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("hashchange", handleRouteChange);
    };
  }, []);

  const openContact = () => {
    window.history.pushState(null, "", "/contact");
    setIsContactOpen(true);
    setIsAdminOpen(false);
    setIsDeployOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAdmin = () => {
    window.history.pushState(null, "", "/admin");
    setIsAdminOpen(true);
    setIsDeployOpen(false);
    setIsContactOpen(false);
  };

  const openDeploy = () => {
    window.history.pushState(null, "", "/deploy");
    setIsDeployOpen(true);
    setIsAdminOpen(false);
    setIsContactOpen(false);
  };

  const closeModals = () => {
    window.history.pushState(null, "", "/");
    setIsAdminOpen(false);
    setIsDeployOpen(false);
    setIsContactOpen(false);
  };

  // If on /contact dedicated page route, render ContactPage
  if (isContactOpen) {
    return (
      <>
        <ContactPage
          profile={profile}
          onBack={closeModals}
          onOpenAdmin={openAdmin}
        />
        {/* Full Admin Dashboard Overlay if opened from contact page */}
        {isAdminOpen && (
          <AdminDashboard
            onClose={closeModals}
            onProfileUpdated={(updated) => setProfile(updated)}
            onOpenDeploy={openDeploy}
          />
        )}
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative selection:bg-purple-500/30 selection:text-white">
      {/* Sophisticated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Minimal geometric patterns */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
      </div>

      <main className="relative z-10">
        <Hero initialProfile={profile} onOpenContact={openContact} />
      </main>

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