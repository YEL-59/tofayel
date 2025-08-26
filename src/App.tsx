import { Toaster } from '@/components/ui/toaster';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Sophisticated gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900" />
      
      {/* Subtle mesh gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
      
      {/* Minimal geometric patterns */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
      </div>

      <main className="relative z-10">
        <Hero />
      </main>
      <Toaster />
    </div>
  );
}

export default App;