import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Github,
  Linkedin,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { portfolioAPI, type Profile } from "@/lib/api";

interface ContactPageProps {
  profile?: Profile;
  onBack?: () => void;
  onOpenAdmin?: () => void;
}

const INQUIRY_TOPICS = [
  "Full-Stack Development",
  "React / Next.js Project",
  "Freelance Contract",
  "Job Opportunity",
  "General Inquiry",
];

export default function ContactPage({ profile, onBack, onOpenAdmin }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { toast } = useToast();

  const userEmail = profile?.socialLinks?.email || "tofayeltuhin143@gmail.com";
  const userPhone = "+880 1708-901418";
  const userLocation = "Dhaka, Bangladesh (Remote Worldwide)";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTopicSelect = (topic: string) => {
    setFormData({
      ...formData,
      subject: topic,
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    setCopiedEmail(true);
    toast({
      title: "Email Copied! 📋",
      description: `${userEmail} copied to your clipboard.`,
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleBackNavigation = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.pushState(null, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email address, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await portfolioAPI.sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || "General Inquiry",
        message: formData.message.trim(),
      });

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully! 🚀",
        description: response.message || "Thank you! Your message was delivered to my inbox.",
      });

      // Dispatch event to sync Admin Dashboard in real time
      window.dispatchEvent(new CustomEvent("portfolio_messages_updated"));

      setFormData({
        name: "",
        email: "",
        subject: "Full-Stack Development",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden">
      {/* Dynamic atmospheric lighting */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 pointer-events-none -z-20" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent pointer-events-none -z-10" />

      {/* Top Sticky Glass Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleBackNavigation}
            className="text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-xl flex items-center gap-2 group transition-all text-xs sm:text-sm font-medium border border-white/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
            <span>Back to Portfolio</span>
          </Button>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="text-sm font-semibold text-white tracking-wide">
              {profile ? `${profile.nameFirst || "Tofayel"} ${profile.nameLast || "Islam"}` : "Tofayel Islam"}
            </span>
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs text-purple-300 font-medium">Contact Center</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile?.socialLinks?.github || "https://github.com/yel-59"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profile?.socialLinks?.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {onOpenAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAdmin}
              className="text-xs border-white/15 bg-white/5 hover:bg-white/10 text-white hidden md:flex items-center gap-1.5 rounded-xl"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Studio</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Dedicated Contact Portal</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight"
          >
            Get In <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Have an exciting project, need a full-stack engineering partner, or exploring freelance & full-time roles? Drop your message below or connect directly.
          </motion.p>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Info & Availability (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Direct Communication Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Communication</h3>
                  <p className="text-xs text-slate-400">Reach out through your preferred channel</p>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="space-y-3 pt-2">
                {/* Email Item */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3 group/item">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                        Primary Email
                      </p>
                      <a
                        href={`mailto:${userEmail}`}
                        className="text-xs sm:text-sm font-medium text-white truncate block hover:text-blue-300 transition-colors"
                      >
                        {userEmail}
                      </a>
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleCopyEmail}
                    className="h-8 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>

                {/* WhatsApp Direct Chat */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3 group/item">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                        WhatsApp / Phone
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-white truncate">
                        {userPhone}
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/8801708901418?text=Hi%20Tofayel,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs shrink-0 flex items-center gap-1 font-medium transition-colors"
                  >
                    <span>Chat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-white">
                      {userLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Telemetry Strip */}
              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-300 font-medium">Available for Hiring</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Avg Response: &lt; 24h</span>
                </div>
              </div>
            </div>

            {/* Collaboration Highlight Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/40 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-purple-300" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">What I Specialize In</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    End-to-end full-stack architectures, modern Next.js/React design systems, REST & GraphQL APIs, scalable MongoDB schemas, and performance optimization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Message Composer Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              {/* Decorative gradient corner */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Your inquiry will be saved in MongoDB Atlas and immediately alerted on my Admin Studio.
                  </p>
                </div>

                {/* Topic Selector Badges */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">
                    Project / Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicSelect(topic)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          formData.subject === topic
                            ? "bg-purple-600 text-white border-purple-400/50 shadow-md shadow-purple-600/30"
                            : "bg-slate-950/70 text-slate-400 border-white/10 hover:text-white hover:border-white/30"
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sender Name */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe / Tech Recruiter"
                        required
                        className="bg-slate-950/90 border-white/10 text-white placeholder:text-slate-600 text-xs sm:text-sm h-11 rounded-xl focus:border-purple-400/50 transition-all"
                      />
                    </div>

                    {/* Sender Email */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Your Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="client@company.com"
                        required
                        className="bg-slate-950/90 border-white/10 text-white placeholder:text-slate-600 text-xs sm:text-sm h-11 rounded-xl focus:border-purple-400/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Line */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Hiring Frontend Lead / MERN App Discussion"
                      className="bg-slate-950/90 border-white/10 text-white placeholder:text-slate-600 text-xs sm:text-sm h-11 rounded-xl focus:border-purple-400/50 transition-all"
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Your Message <span className="text-red-400">*</span>
                    </label>
                    <Textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Write your project requirements, scope, timeline, budget, or questions here..."
                      required
                      className="bg-slate-950/90 border-white/10 text-white placeholder:text-slate-600 text-xs sm:text-sm rounded-xl focus:border-purple-400/50 transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button & Security Note */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted & saved to MongoDB Atlas</span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Delivering Message...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                          <span>Delivered to Inbox!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-slate-500 mt-16">
        <p>© {new Date().getFullYear()} {profile ? `${profile.nameFirst || "Tofayel"} ${profile.nameLast || "Islam"}` : "Tofayel Islam"}. All rights reserved.</p>
      </footer>
    </div>
  );
}
