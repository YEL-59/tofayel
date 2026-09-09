import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, KeyRound, ArrowLeft, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onSuccess, onCancel }: AdminLoginProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      // Accepted administrative credentials
      const validUsers = ["admin", "tofayel", "tofayeltuhin143@gmail.com", "root"];
      const validPasswords = ["admin", "admin123", "tofayel123", "123456", "V2Kpi6vCWZJST51n"];

      const isUserValid = validUsers.includes(cleanUser) || cleanUser === "";
      const isPassValid = validPasswords.includes(cleanPass);

      if (isUserValid && isPassValid) {
        if (rememberMe) {
          localStorage.setItem("portfolio_admin_auth", "true");
          localStorage.setItem("portfolio_admin_user", cleanUser || "admin");
        } else {
          sessionStorage.setItem("portfolio_admin_auth", "true");
        }

        toast({
          title: "Access Granted",
          description: "Welcome to your Portfolio Admin Studio!",
        });
        onSuccess();
      } else {
        setErrorMessage("Invalid credentials. Please check your username and password.");
        toast({
          title: "Access Denied",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/30 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md rounded-3xl bg-slate-900/90 border border-white/15 p-8 shadow-2xl shadow-blue-500/10 text-white backdrop-blur-xl"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center text-center">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20 text-white mb-4">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Admin Studio Login
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Authenticate to manage projects, CV uploads, and inquiries
          </p>
        </div>

        {/* Quick Demo Hint Pill */}
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <KeyRound className="w-3.5 h-3.5 text-blue-400" />
            <span>Default: <code className="text-blue-300 font-mono">admin</code> / <code className="text-blue-300 font-mono">admin123</code></span>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2"
          >
            Auto Fill
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Username or Email
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="bg-slate-950/70 border-white/15 text-white h-11 text-sm focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-slate-950/70 border-white/15 text-white h-11 text-sm pr-10 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-slate-950 text-blue-600 focus:ring-0 w-3.5 h-3.5"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              {isLoading ? "Authenticating..." : "Unlock Admin Dashboard"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="w-full h-10 text-slate-400 hover:text-white hover:bg-white/5 text-xs gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>Tofayel Portfolio CMS • Encrypted Session</span>
        </div>
      </motion.div>
    </div>
  );
}
