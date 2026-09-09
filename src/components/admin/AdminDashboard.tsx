import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  Mail,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Upload,
  Download,
  Sparkles,
  Github,
  Rocket,
  LogOut,
  Menu,
  X,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AdminLogin from "./AdminLogin";
import DeleteConfirmModal from "./DeleteConfirmModal";
import {
  portfolioAPI,
  fallbackProfile,
  fallbackProjects,
  type Profile,
  type Project,
  type ContactMessage,
  type CVInfo
} from "@/lib/api";

interface AdminDashboardProps {
  onClose: () => void;
  onProfileUpdated?: (profile: Profile) => void;
  onOpenDeploy?: () => void;
}

export default function AdminDashboard({ onClose, onProfileUpdated, onOpenDeploy }: AdminDashboardProps) {
  const { toast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return (
      localStorage.getItem("portfolio_admin_auth") === "true" ||
      sessionStorage.getItem("portfolio_admin_auth") === "true"
    );
  });

  const [activeTab, setActiveTab] = useState<"home" | "projects" | "cv" | "messages">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Profile State
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [techInput, setTechInput] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // CV State
  const [cvInfo, setCvInfo] = useState<CVInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingCV, setIsUploadingCV] = useState(false);

  // Messages State
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Server Health State
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);

  // Custom Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "project" | "message";
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
      loadProfile();
      loadProjects();
      loadCVInfo();
      loadMessages();
    }
  }, [isAuthenticated]);

  const checkHealth = async () => {
    const health = await portfolioAPI.checkHealth();
    setIsBackendOnline(Boolean(health?.status === "online"));
  };

  const loadProfile = async () => {
    const data = await portfolioAPI.getProfile();
    setProfile(data);
    setTechInput(data.technologies?.join(", ") || "");
  };

  const loadProjects = async () => {
    const data = await portfolioAPI.getProjects();
    setProjects(data);
  };

  const loadCVInfo = async () => {
    const info = await portfolioAPI.getCVInfo();
    setCvInfo(info);
  };

  const loadMessages = async () => {
    const data = await portfolioAPI.getMessages();
    setMessages(data);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_auth");
    sessionStorage.removeItem("portfolio_admin_auth");
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have securely locked the admin studio.",
    });
  };

  // Profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    const techArray = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const updatedData: Partial<Profile> = {
      ...profile,
      technologies: techArray.length > 0 ? techArray : profile.technologies,
    };

    try {
      const result = await portfolioAPI.updateProfile(updatedData);
      setProfile(result.data);
      if (onProfileUpdated) onProfileUpdated(result.data);
      toast({
        title: "Profile Updated",
        description: result.message || "Home section updated successfully!",
      });
    } catch (err: any) {
      toast({
        title: "Save Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Project save (Add/Edit)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;

    try {
      if (editingProject._id && !editingProject._id.startsWith("offline_")) {
        // Edit existing
        await portfolioAPI.updateProject(editingProject._id, editingProject);
        toast({ title: "Project Updated", description: "Changes saved successfully!" });
      } else {
        // Add new
        const res = await portfolioAPI.createProject(editingProject);
        toast({ title: "Project Created", description: res.message });
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      loadProjects();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  // Trigger Custom Delete Confirmation Modal
  const promptDeleteProject = (project: Project) => {
    if (!project._id) return;
    setDeleteTarget({
      type: "project",
      id: project._id,
      name: project.title,
    });
  };

  const promptDeleteMessage = (msg: ContactMessage) => {
    setDeleteTarget({
      type: "message",
      id: msg._id,
      name: `${msg.name} (${msg.email})`,
    });
  };

  // Confirm Delete Action from Custom Modal
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      if (deleteTarget.type === "project") {
        await portfolioAPI.deleteProject(deleteTarget.id);
        setProjects((prev) => prev.filter((p) => p._id !== deleteTarget.id));
        toast({
          title: "Project Deleted",
          description: `"${deleteTarget.name}" has been removed from MongoDB.`,
        });
      } else {
        await portfolioAPI.deleteMessage(deleteTarget.id);
        setMessages((prev) => prev.filter((m) => m._id !== deleteTarget.id));
        toast({
          title: "Message Removed",
          description: "Inquiry has been deleted.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Delete Failed",
        description: err.message || "Failed to delete item",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // CV Upload
  const handleUploadCV = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({ title: "Please select a file", variant: "destructive" });
      return;
    }

    setIsUploadingCV(true);
    const res = await portfolioAPI.uploadCV(selectedFile);
    setIsUploadingCV(false);

    if (res.success) {
      toast({ title: "CV Uploaded Successfully!", description: res.message });
      setSelectedFile(null);
      loadCVInfo();
    } else {
      toast({ title: "Upload Failed", description: res.message, variant: "destructive" });
    }
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} onCancel={onClose} />;
  }

  const navItems = [
    { id: "home", label: "Home & Hero", icon: Sparkles, count: null, color: "text-amber-400" },
    { id: "projects", label: "Projects Showcase", icon: FolderGit2, count: projects.length, color: "text-purple-400" },
    { id: "cv", label: "CV & Resume", icon: FileText, count: cvInfo?.hasCustomFile ? "Active" : null, color: "text-emerald-400" },
    { id: "messages", label: "Inquiries Inbox", icon: Mail, count: messages.length, color: "text-pink-400" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-950 text-white flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ============================================================ */}
      {/* 1. LEFT SIDEBAR (Sticky full height on Desktop, Drawer on Mobile) */}
      {/* ============================================================ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                  Admin Studio
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-500/30">
                    CMS
                  </span>
                </h2>
                <p className="text-[11px] text-slate-400">Tofayel Portfolio</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Database & Cloud Health Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-300 text-[11px] font-medium">MongoDB Atlas</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected
            </span>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            Studio Sections
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 border border-blue-400/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.color}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Dedicated Deployment Center Link */}
          {onOpenDeploy && (
            <div className="pt-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                Cloud Operations
              </div>
              <button
                onClick={onOpenDeploy}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Deploy Center</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-200">
                  Cloud
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-slate-950/40">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 border-white/15 text-slate-200 hover:text-white justify-center text-xs gap-2 h-9"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 justify-center text-xs gap-2 h-9"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ============================================================ */}
      {/* 2. RIGHT MAIN CONTENT AREA (Scrollable Workspace) */}
      {/* ============================================================ */}
      <div className="flex-1 flex flex-col md:ml-72 h-screen overflow-y-auto bg-slate-950">
        {/* Sticky Top Header Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800 border border-white/10 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white capitalize flex items-center gap-2">
                {activeTab === "home" && "Home & Hero Section Settings"}
                {activeTab === "projects" && "Projects Showcase Manager"}
                {activeTab === "cv" && "CV & Resume File Manager"}
                {activeTab === "messages" && "Visitor Inquiries & Contact Messages"}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                {activeTab === "home" && "Configure headline, bio, status, and tech tags in MongoDB Atlas"}
                {activeTab === "projects" && "Add, update, or remove projects shown on your live portfolio"}
                {activeTab === "cv" && "Upload your active resume to update the public 'Download CV' button"}
                {activeTab === "messages" && "Manage contact messages sent by prospective clients and recruiters"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Backend Health Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-white/10 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isBackendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="text-slate-300 font-medium">
                {isBackendOnline ? "API Online (Port 5000)" : "Fallback Mode"}
              </span>
            </div>

            {/* Quick contextual CTA button */}
            {activeTab === "projects" && (
              <Button
                size="sm"
                onClick={() => {
                  setEditingProject({
                    title: "",
                    description: "",
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                    liveLink: "",
                    githubLink: "",
                    tech: ["React", "TypeScript"],
                    category: "Web App",
                    status: "Live",
                    rating: 5.0,
                    views: 0,
                    likes: 0,
                    featured: false,
                  });
                  setIsProjectModalOpen(true);
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs gap-1.5 shadow-lg shadow-purple-600/30"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Project
              </Button>
            )}
          </div>
        </header>

        {/* Main Tab Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {/* ======================================================== */}
          {/* TAB 1: HOME & HERO CONFIGURATION */}
          {/* ======================================================== */}
          {activeTab === "home" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Personal & Role Information
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    These values update the text on your primary portfolio landing screen.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Greeting</label>
                    <Input
                      value={profile.greeting}
                      onChange={(e) => setProfile({ ...profile, greeting: e.target.value })}
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">First Name</label>
                    <Input
                      value={profile.nameFirst}
                      onChange={(e) => setProfile({ ...profile, nameFirst: e.target.value })}
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Last Name</label>
                    <Input
                      value={profile.nameLast}
                      onChange={(e) => setProfile({ ...profile, nameLast: e.target.value })}
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Professional Role / Title</label>
                    <Input
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Availability Status Badge</label>
                    <Input
                      value={profile.availableText}
                      onChange={(e) => setProfile({ ...profile, availableText: e.target.value })}
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Personal Bio</label>
                  <Textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="bg-slate-950 border-white/10 text-white text-xs leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Featured Skills & Technologies (Comma-separated)
                  </label>
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React, TypeScript, Next.js, Node.js, Tailwind CSS"
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {techInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="text-xs font-bold text-white mb-3 uppercase tracking-wider text-slate-400">
                    Social & Contact Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">GitHub URL</label>
                      <Input
                        value={profile.socialLinks?.github || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, github: e.target.value },
                          })
                        }
                        className="bg-slate-950 border-white/10 text-white text-xs h-9"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">LinkedIn URL</label>
                      <Input
                        value={profile.socialLinks?.linkedin || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                          })
                        }
                        className="bg-slate-950 border-white/10 text-white text-xs h-9"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                      <Input
                        value={profile.socialLinks?.email || ""}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, email: e.target.value },
                          })
                        }
                        className="bg-slate-950 border-white/10 text-white text-xs h-9"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <Button
                    type="submit"
                    disabled={isSavingProfile}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs gap-2 px-6 h-10 shadow-lg shadow-blue-600/30"
                  >
                    <Save className="w-4 h-4" />
                    {isSavingProfile ? "Saving to MongoDB..." : "Save Profile Changes"}
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* TAB 2: PROJECTS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Active Portfolio Projects</h3>
                  <p className="text-xs text-slate-400">Total {projects.length} showcase projects saved in Atlas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj._id || proj.id}
                    className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex flex-col justify-between group hover:border-purple-500/40 transition-all shadow-lg"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              {proj.category}
                            </span>
                            {proj.featured && (
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                Featured
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mt-1.5">{proj.title}</h4>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsProjectModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => promptDeleteProject(proj)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>★ {proj.rating}</span>
                        <span>•</span>
                        <span>{proj.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {proj.githubLink && (
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.liveLink && (
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: CV & RESUME MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === "cv" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Current Resume Status
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    When visitors click "Download CV" on your portfolio, they download this active file.
                  </p>
                </div>

                {cvInfo ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{cvInfo.fileName}</div>
                        <div className="text-xs text-slate-400">
                          {cvInfo.hasCustomFile
                            ? `Custom Upload • ${Math.round(cvInfo.size / 1024)} KB`
                            : "Standard Default Resume"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => window.open(portfolioAPI.getCVDownloadUrl(), "_blank")}
                        className="text-xs gap-1.5 h-9"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Test Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400">Loading CV status...</div>
                )}

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-300 mb-3">
                    Upload New Resume File (PDF / DOCX)
                  </h4>
                  <form onSubmit={handleUploadCV} className="space-y-4">
                    <div className="p-6 rounded-2xl border-2 border-dashed border-white/15 hover:border-emerald-500/50 bg-slate-950/60 transition-colors flex flex-col items-center justify-center text-center">
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <input
                        type="file"
                        id="cv-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFile(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="cursor-pointer text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                      >
                        {selectedFile ? selectedFile.name : "Choose a PDF or DOCX file to upload"}
                      </label>
                      <p className="text-[11px] text-slate-500 mt-1">Max file size: 10MB</p>
                    </div>

                    {selectedFile && (
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isUploadingCV}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs gap-2 px-6 h-10 shadow-lg shadow-emerald-600/30"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {isUploadingCV ? "Uploading to Server..." : "Upload & Set as Active CV"}
                        </Button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: VISITOR MESSAGES INBOX */}
          {/* ======================================================== */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Contact Form Inquiries</h3>
                  <p className="text-xs text-slate-400">
                    Stored permanently in MongoDB Atlas from your portfolio contact form
                  </p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 rounded-3xl bg-slate-900/40 border border-white/10 text-center space-y-2">
                  <Mail className="w-8 h-8 text-slate-500 mx-auto" />
                  <h4 className="text-sm font-bold text-white">No inquiries yet</h4>
                  <p className="text-xs text-slate-400">
                    When visitors send messages through your contact section, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 flex items-start justify-between gap-4 hover:border-pink-500/30 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{msg.name}</span>
                          <span className="text-xs text-slate-500">•</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                        </div>
                        {msg.subject && (
                          <div className="text-xs font-semibold text-pink-300">
                            Subject: {msg.subject}
                          </div>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed pt-1 whitespace-pre-line">
                          {msg.message}
                        </p>
                        <p className="text-[10px] text-slate-500 pt-1">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => promptDeleteMessage(msg)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* 3. CUSTOM ANIMATED DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        title={deleteTarget?.type === "project" ? "Delete Project?" : "Delete Contact Inquiry?"}
        itemName={deleteTarget?.name}
        description={
          deleteTarget?.type === "project"
            ? "This project will be permanently removed from MongoDB Atlas and will no longer show on your portfolio."
            : "This message will be permanently deleted from your inquiry inbox."
        }
        confirmText="Delete Permanently"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ============================================================ */}
      {/* 4. PROJECT EDIT / CREATE MODAL */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isProjectModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-white"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                  {editingProject._id ? "Edit Project Details" : "Add New Showcase Project"}
                </h3>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-3.5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title</label>
                  <Input
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                  <Textarea
                    rows={3}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="bg-slate-950 border-white/10 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, category: e.target.value })
                      }
                      className="w-full h-10 px-3 rounded-md bg-slate-950 border border-white/10 text-xs text-white focus:outline-none"
                    >
                      {["Full-Stack", "Web App", "Portfolio", "AI/ML", "Analytics", "Game Dev", "Mobile"].map(
                        (c) => (
                          <option key={c} value={c} className="bg-slate-900 text-white">
                            {c}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                    <Input
                      value={editingProject.status}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, status: e.target.value })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cover Image URL</label>
                  <Input
                    value={editingProject.image}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image: e.target.value })
                    }
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo URL</label>
                    <Input
                      value={editingProject.liveLink}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, liveLink: e.target.value })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">GitHub URL</label>
                    <Input
                      value={editingProject.githubLink}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, githubLink: e.target.value })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingProject.featured)}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, featured: e.target.checked })
                      }
                      className="rounded border-white/20 bg-slate-950 text-purple-600 focus:ring-0 w-4 h-4"
                    />
                    <span>Highlight as Featured Project</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs h-10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-5 h-10 shadow-lg shadow-purple-600/30"
                  >
                    Save Project
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
