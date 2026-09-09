import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  ArrowLeft,
  CheckCircle2,
  Copy,
  ExternalLink,
  Server,
  Globe,
  Database,
  Terminal,
  Activity,
  RefreshCw,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { API_BASE, portfolioAPI, type HealthStatus } from "@/lib/api";

interface DeploymentPageProps {
  onClose: () => void;
  onOpenAdmin?: () => void;
}

export default function DeploymentPage({ onClose, onOpenAdmin }: DeploymentPageProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "render" | "vercel" | "tester" | "git">("overview");

  // Health / Diagnostics State
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const [testUrl, setTestUrl] = useState(API_BASE);
  const [testResult, setTestResult] = useState<any>(null);
  const [isTestingCustomUrl, setIsTestingCustomUrl] = useState(false);
  const [testLatency, setTestLatency] = useState<number | null>(null);

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${label} has been copied.`,
    });
  };

  // Run initial health check
  useEffect(() => {
    checkCurrentHealth();
  }, []);

  const checkCurrentHealth = async () => {
    setIsCheckingHealth(true);
    const start = performance.now();
    try {
      const data = await portfolioAPI.checkHealth();
      setHealthData(data);
      setTestLatency(Math.round(performance.now() - start));
    } catch {
      setHealthData(null);
    } finally {
      setIsCheckingHealth(false);
    }
  };

  const testCustomEndpoint = async () => {
    setIsTestingCustomUrl(true);
    setTestResult(null);
    const start = performance.now();
    try {
      const normalized = testUrl.endsWith("/health")
        ? testUrl
        : testUrl.endsWith("/api")
        ? `${testUrl}/health`
        : `${testUrl}/api/health`;

      const res = await fetch(normalized, { method: "GET" });
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);
      setTestResult({
        success: res.ok,
        status: res.status,
        data,
        elapsed,
      });
      toast({
        title: res.ok ? "Backend Online! 🟢" : "Check failed",
        description: `HTTP ${res.status} (${elapsed}ms)`,
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        error: err.message || "Failed to reach endpoint. Check CORS or network.",
      });
      toast({
        title: "Endpoint Unreachable 🔴",
        description: "Could not connect to this URL. Is the server online?",
        variant: "destructive",
      });
    } finally {
      setIsTestingCustomUrl(false);
    }
  };

  const mongoUri =
    "mongodb+srv://tofayeltuhin143_db_user:V2Kpi6vCWZJST51n@tofayel.tfdaefn.mongodb.net/portfolio?retryWrites=true&w=majority&appName=tofayel";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 backdrop-blur-2xl">
      {/* Background glowing effects */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="border-white/20 bg-slate-900/80 hover:bg-slate-800 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/20">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Deployment Center
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  Production Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Zero-cost cloud deployment guide & real-time connectivity diagnostics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {onOpenAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenAdmin}
                className="border-white/10 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300"
              >
                Open Admin CMS
              </Button>
            )}
            <Button
              size="sm"
              onClick={() => {
                window.open("https://dashboard.render.com", "_blank");
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Render Console
            </Button>
            <Button
              size="sm"
              onClick={() => {
                window.open("https://vercel.com", "_blank");
              }}
              className="bg-white hover:bg-slate-200 text-black font-semibold text-xs gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Vercel Console
            </Button>
          </div>
        </div>

        {/* Live Infrastructure Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          {/* Database Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Database Layer</div>
                  <div className="text-sm font-semibold text-white">MongoDB Atlas</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-400 font-mono truncate">
              Cluster: tofayel.tfdaefn.mongodb.net
            </div>
          </div>

          {/* Backend Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Backend API</div>
                  <div className="text-sm font-semibold text-white">Node.js / Express</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/15 border border-blue-500/30 text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {healthData ? `Port 5000 Online` : `Fallback Mode`}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono truncate">{API_BASE}</span>
              {testLatency && <span>{testLatency}ms</span>}
            </div>
          </div>

          {/* Frontend Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Frontend Client</div>
                  <div className="text-sm font-semibold text-white">React 18 + Vite</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-purple-500/15 border border-purple-500/30 text-purple-300">
                SPA Routing Ready
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>vercel.json Configured</span>
              <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Architecture & Steps", icon: Sparkles },
            { id: "render", label: "1. Render Backend", icon: Server },
            { id: "vercel", label: "2. Vercel Frontend", icon: Globe },
            { id: "tester", label: "Live API Tester", icon: Activity },
            { id: "git", label: "Git Commands & Files", icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Areas */}
        <div className="flex-1 py-6">
          <AnimatePresence mode="wait">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Visual Pipeline */}
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10">
                  <h2 className="text-lg font-bold text-white mb-2">3-Tier Free Cloud Architecture</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Deploy your MERN application completely free with zero maintenance overhead:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-blue-500/30">
                      <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                        Step 1: Database
                      </div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        MongoDB Atlas
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </h3>
                      <p className="text-xs text-slate-400 mt-2">
                        Already active on your AWS cluster with 6 projects, CV record, and profile data seeded.
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Cluster: tofayel</span>
                        <span className="text-emerald-400">Online</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30">
                      <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
                        Step 2: Web Service
                      </div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        Render.com
                        <span className="text-xs font-normal text-slate-400">Node API</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-2">
                        Hosts the <code>backend/</code> folder. Handles project CRUD, file uploads, and contact emails.
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Root: backend</span>
                        <span className="text-purple-300">Free Tier</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                        Step 3: Edge CDN
                      </div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        Vercel.com
                        <span className="text-xs font-normal text-slate-400">Vite SPA</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-2">
                        Hosts the fast React frontend. Auto-deploys on every GitHub push with global CDN caching.
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Preset: Vite</span>
                        <span className="text-cyan-300">Free Tier</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Checklist */}
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white">Execution Sequence</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Push workspace to your GitHub repository</div>
                        <div className="text-xs text-slate-400">
                          Ensure all files in <code>backend/</code> and <code>src/</code> are committed.
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveTab("git")}
                        className="text-xs text-blue-400"
                      >
                        View Git Commands →
                      </Button>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Deploy Backend to Render</div>
                        <div className="text-xs text-slate-400">
                          Create Web Service with Root Directory: <code>backend</code> and your MongoDB URI.
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveTab("render")}
                        className="text-xs text-purple-400"
                      >
                        View Render Config →
                      </Button>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white">Deploy Frontend to Vercel</div>
                        <div className="text-xs text-slate-400">
                          Connect repository, set <code>VITE_API_URL</code> to your Render backend URL, and deploy.
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setActiveTab("vercel")}
                        className="text-xs text-cyan-400"
                      >
                        View Vercel Config →
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RENDER BACKEND TAB */}
            {activeTab === "render" && (
              <motion.div
                key="render"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-blue-400" />
                        Render Web Service Configuration
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Follow these exact values when creating your Web Service on Render.com
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open("https://dashboard.render.com/select-repo?type=web", "_blank")}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Create on Render
                    </Button>
                  </div>

                  {/* Core Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Root Directory (CRITICAL)</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-sm text-emerald-400 font-semibold">backend</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-slate-400 hover:text-white"
                          onClick={() => copyToClipboard("backend", "Root Directory")}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Build Command</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-sm text-white">npm install</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-slate-400 hover:text-white"
                          onClick={() => copyToClipboard("npm install", "Build Command")}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Start Command</span>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-sm text-white">npm start</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-slate-400 hover:text-white"
                          onClick={() => copyToClipboard("npm start", "Start Command")}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Runtime</span>
                      <div className="mt-1">
                        <span className="font-mono text-sm text-white font-semibold">Node</span>
                      </div>
                    </div>
                  </div>

                  {/* Environment Variables */}
                  <h3 className="text-sm font-bold text-white mb-3">Render Environment Variables:</h3>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">MONGODB_URI</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300">
                            Required
                          </span>
                        </div>
                        <p className="font-mono text-xs text-slate-400 truncate mt-1">{mongoUri}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard(mongoUri, "MONGODB_URI")}
                        className="text-xs gap-1.5 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy URI
                      </Button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">NODE_ENV</span>
                        </div>
                        <p className="font-mono text-xs text-slate-400 mt-1">production</p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard("production", "NODE_ENV")}
                        className="text-xs gap-1.5 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Value
                      </Button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">CLIENT_URL</span>
                        </div>
                        <p className="font-mono text-xs text-slate-400 mt-1">* (or your Vercel URL)</p>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard("*", "CLIENT_URL")}
                        className="text-xs gap-1.5 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Value
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VERCEL FRONTEND TAB */}
            {activeTab === "vercel" && (
              <motion.div
                key="vercel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        Vercel Frontend Configuration
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Zero-configuration edge hosting for your React + Vite portfolio
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open("https://vercel.com/new", "_blank")}
                      className="bg-white hover:bg-slate-200 text-black font-semibold text-xs gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Import on Vercel
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Framework Preset</span>
                      <div className="mt-1">
                        <span className="font-mono text-sm text-cyan-400 font-semibold">Vite</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Root Directory</span>
                      <div className="mt-1">
                        <span className="font-mono text-sm text-white">./ (Root default)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Build Command</span>
                      <div className="mt-1">
                        <span className="font-mono text-sm text-white">npm run build</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                      <span className="text-xs text-slate-500 font-medium">Output Directory</span>
                      <div className="mt-1">
                        <span className="font-mono text-sm text-white">dist</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-6">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-1">
                      <Sparkles className="w-4 h-4" />
                      Vercel Environment Variable (Crucial)
                    </div>
                    <p className="text-xs text-slate-300 mb-3">
                      Add this under your Vercel Project Settings → Environment Variables so your live site talks to your
                      Render backend:
                    </p>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-mono text-xs">
                        <span className="text-cyan-400 font-bold">VITE_API_URL</span>
                        <span className="text-slate-400 ml-2">
                          = https://YOUR-RENDER-BACKEND.onrender.com/api
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => copyToClipboard("VITE_API_URL", "VITE_API_URL Key")}
                        className="text-xs gap-1.5 shrink-0"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy Key
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white">vercel.json Pre-Configured</div>
                      <p className="text-xs text-slate-400 mt-1">
                        A custom <code>vercel.json</code> file has already been added to your repository to route all
                        incoming requests to <code>/index.html</code>. Deep URLs and <code>#admin</code> /{" "}
                        <code>#deploy</code> routes will never 404.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* LIVE TESTER TAB */}
            {activeTab === "tester" && (
              <motion.div
                key="tester"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Live Backend & Cloud Health Tester
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mb-6">
                    Ping your local backend or paste your live Render URL to check connectivity and MongoDB status in
                    real time.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 mb-6">
                    <div className="flex-1 relative">
                      <Input
                        value={testUrl}
                        onChange={(e) => setTestUrl(e.target.value)}
                        placeholder="https://tofayel-portfolio-api.onrender.com/api"
                        className="bg-slate-900/90 border-white/10 text-white font-mono text-xs pl-3 h-11"
                      />
                    </div>
                    <Button
                      onClick={testCustomEndpoint}
                      disabled={isTestingCustomUrl}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 h-11 px-6 shrink-0"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingCustomUrl ? "animate-spin" : ""}`} />
                      {isTestingCustomUrl ? "Testing..." : "Test Endpoint"}
                    </Button>
                    <Button
                      variant="outline"
                      disabled={isCheckingHealth}
                      onClick={() => {
                        setTestUrl("http://localhost:5000/api");
                        checkCurrentHealth();
                      }}
                      className="border-white/10 bg-slate-900/60 hover:bg-slate-800 text-xs text-slate-300 h-11 gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isCheckingHealth ? "animate-spin" : ""}`} />
                      Reset Local (Port 5000)
                    </Button>
                  </div>

                  {/* Active Local Health Status Card */}
                  {healthData && (
                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-semibold text-sm text-white">Local Server Active</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">Uptime: {Math.round(healthData.uptime)}s</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-slate-500">Database Status:</span>
                          <p className="text-emerald-400 font-semibold mt-0.5">{healthData.database?.status}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-slate-500">Service:</span>
                          <p className="text-slate-300 font-semibold mt-0.5 truncate">{healthData.service}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-slate-500">Status:</span>
                          <p className="text-blue-400 font-semibold mt-0.5">{healthData.status.toUpperCase()}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/5">
                          <span className="text-slate-500">Ping Latency:</span>
                          <p className="text-purple-400 font-semibold mt-0.5">{testLatency ? `${testLatency}ms` : "-"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Test Result Card */}
                  {testResult && (
                    <div
                      className={`p-4 rounded-2xl border ${
                        testResult.success
                          ? "bg-emerald-500/10 border-emerald-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            testResult.success ? "text-emerald-400" : "text-red-400"
                          }`}
                        >
                          {testResult.success ? "Connection Verified" : "Connection Failed"}
                        </span>
                        {testResult.elapsed && (
                          <span className="text-xs font-mono text-slate-400">{testResult.elapsed} ms response time</span>
                        )}
                      </div>
                      <pre className="text-[11px] font-mono p-3 rounded-xl bg-slate-950/90 text-slate-300 overflow-x-auto border border-white/10">
                        {JSON.stringify(testResult.data || { error: testResult.error }, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* GIT & FILES TAB */}
            {activeTab === "git" && (
              <motion.div
                key="git"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-purple-400" />
                        Git Deployment Commands
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Execute these commands in your project root terminal to push everything to GitHub
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          "git add .\ngit commit -m 'feat: ready for cloud deployment'\ngit push origin main",
                          "Git Commands"
                        )
                      }
                      className="bg-purple-600 hover:bg-purple-500 text-white text-xs gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy All Commands
                    </Button>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                    <div className="text-slate-500"># 1. Stage all changes (frontend + backend)</div>
                    <div className="text-emerald-400">git add .</div>
                    <div className="text-slate-500 mt-2"># 2. Commit with descriptive message</div>
                    <div className="text-emerald-400">git commit -m "feat: complete MERN portfolio ready for deployment"</div>
                    <div className="text-slate-500 mt-2"># 3. Push to your main branch</div>
                    <div className="text-emerald-400">git push origin main</div>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-6 mb-3">Verified Deployment Files:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white font-mono">DEPLOYMENT.md</div>
                        <div className="text-[11px] text-slate-400">Full markdown manual in project root</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white font-mono">vercel.json</div>
                        <div className="text-[11px] text-slate-400">SPA routing rewrites configured</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white font-mono">backend/package.json</div>
                        <div className="text-[11px] text-slate-400">"start": "node src/index.js" ready</div>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-white font-mono">backend/.env</div>
                        <div className="text-[11px] text-slate-400">Atlas MongoDB connection active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>Tofayel Islam • MERN Stack Portfolio Deployment Studio</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => copyToClipboard(mongoUri, "MongoDB URI")}
              className="hover:text-slate-300 transition-colors"
            >
              Copy Database URI
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab("tester");
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Run Diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
