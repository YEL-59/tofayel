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
  Database,
  Sliders,
  Eye,
  Heart,
  Zap,
  Layers,
  Globe,
  Code,
  Star
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
  const [modalCategoryInput, setModalCategoryInput] = useState("");
  const [modalBadgeInput, setModalBadgeInput] = useState("");
  const [modalTechInput, setModalTechInput] = useState("");

  const handleAddCategoryBadge = () => {
    if (!modalCategoryInput.trim() || !editingProject) return;
    const cat = modalCategoryInput.trim();
    const current =
      editingProject.categories && editingProject.categories.length > 0
        ? editingProject.categories
        : [editingProject.category].filter(Boolean);
    if (!current.includes(cat)) {
      const updated = [...current, cat];
      setEditingProject({
        ...editingProject,
        categories: updated,
        category: updated[0] || cat,
      });
    }
    setModalCategoryInput("");
  };

  const handleRemoveCategoryBadge = (catToRemove: string) => {
    if (!editingProject) return;
    const current =
      editingProject.categories && editingProject.categories.length > 0
        ? editingProject.categories
        : [editingProject.category].filter(Boolean);
    const updated = current.filter((c) => c !== catToRemove);
    setEditingProject({
      ...editingProject,
      categories: updated,
      category: updated[0] || "Full-Stack",
    });
  };

  const handleAddCustomBadge = () => {
    if (!modalBadgeInput.trim() || !editingProject) return;
    const badge = modalBadgeInput.trim();
    const current = editingProject.badges || [];
    if (!current.includes(badge)) {
      setEditingProject({
        ...editingProject,
        badges: [...current, badge],
      });
    }
    setModalBadgeInput("");
  };

  const handleRemoveCustomBadge = (badgeToRemove: string) => {
    if (!editingProject) return;
    const current = editingProject.badges || [];
    setEditingProject({
      ...editingProject,
      badges: current.filter((b) => b !== badgeToRemove),
    });
  };

  const handleAddTechPill = () => {
    if (!modalTechInput.trim() || !editingProject) return;
    const tech = modalTechInput.trim();
    const current = editingProject.tech || [];
    if (!current.includes(tech)) {
      setEditingProject({
        ...editingProject,
        tech: [...current, tech],
      });
    }
    setModalTechInput("");
  };

  const handleRemoveTechPill = (techToRemove: string) => {
    if (!editingProject) return;
    const current = editingProject.tech || [];
    setEditingProject({
      ...editingProject,
      tech: current.filter((t) => t !== techToRemove),
    });
  };

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

      const handleLiveUpdates = () => {
        loadProjects();
        loadMessages();
      };
      window.addEventListener("portfolio_projects_updated", handleLiveUpdates);
      window.addEventListener("portfolio_messages_updated", handleLiveUpdates);
      return () => {
        window.removeEventListener("portfolio_projects_updated", handleLiveUpdates);
        window.removeEventListener("portfolio_messages_updated", handleLiveUpdates);
      };
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
      window.dispatchEvent(new CustomEvent("portfolio_projects_updated"));
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
        window.dispatchEvent(new CustomEvent("portfolio_projects_updated"));
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
                  setModalCategoryInput("");
                  setModalBadgeInput("");
                  setModalTechInput("");
                  setEditingProject({
                    title: "",
                    description: "",
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                    liveLink: "",
                    githubLink: "",
                    tech: ["React", "TypeScript", "Tailwind CSS"],
                    category: "Portfolio",
                    categories: ["Portfolio"],
                    badges: [],
                    status: "Live",
                    rating: 4.7,
                    views: 890,
                    likes: 67,
                    featured: false,
                    architectureTag: "Full-Stack Architecture",
                    year: "2024 Edition",
                    showChrome: true,
                    showCategory: true,
                    showStatus: true,
                    showTelemetry: true,
                    showSpecs: true,
                    showTech: true,
                    showLikes: true,
                    showLive: true,
                    showGithub: true,
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col">
                  <span className="text-[11px] text-slate-400">Total Projects</span>
                  <span className="text-lg font-bold text-white mt-0.5">{projects.length}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-blue-400" />
                    Total Views
                  </span>
                  <span className="text-lg font-bold text-blue-400 mt-0.5">
                    {projects.reduce((sum, p) => sum + (p.views || 0), 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    Total Likes
                  </span>
                  <span className="text-lg font-bold text-red-400 mt-0.5">
                    {projects.reduce((sum, p) => sum + (p.likes || 0), 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    Avg Rating
                  </span>
                  <span className="text-lg font-bold text-yellow-400 mt-0.5">
                    {projects.length > 0
                      ? (projects.reduce((sum, p) => sum + (p.rating || 0), 0) / projects.length).toFixed(1)
                      : "4.8"}
                  </span>
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
                              setModalCategoryInput("");
                              setModalBadgeInput("");
                              setModalTechInput("");
                              setEditingProject({
                                ...proj,
                                categories:
                                  proj.categories && proj.categories.length > 0
                                    ? proj.categories
                                    : [proj.category || "Portfolio"],
                                badges: proj.badges || [],
                                architectureTag: proj.architectureTag ?? "Full-Stack Architecture",
                                year: proj.year ?? "2024 Edition",
                                showChrome: proj.showChrome !== false,
                                showCategory: proj.showCategory !== false,
                                showStatus: proj.showStatus !== false,
                                showTelemetry: proj.showTelemetry !== false,
                                showSpecs: proj.showSpecs !== false,
                                showTech: proj.showTech !== false,
                                showLikes: proj.showLikes !== false,
                                showLive: proj.showLive !== false,
                                showGithub: proj.showGithub !== false,
                              });
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
                      <div className="flex items-center gap-2.5 text-slate-400 text-[11px]">
                        <span className="text-yellow-400 font-medium">★ {proj.rating ?? 4.7}</span>
                        <span>•</span>
                        <span className="text-slate-300">👁 {proj.views ?? 890}</span>
                        <span>•</span>
                        <span className="text-red-400">❤️ {proj.likes ?? 67}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium">{proj.status || "Live"}</span>
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
              className="w-full max-w-2xl bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto text-white"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-purple-400" />
                    {editingProject._id ? "Edit Project & Card Controls" : "Add New Showcase Project"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customize project content and toggle frontend card components on or off
                  </p>
                </div>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                {/* 1. Basic Information */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title</label>
                  <Input
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    placeholder="e.g. Modern E-Commerce Platform"
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                  <Textarea
                    rows={2}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    placeholder="Describe the problem, architecture, or outcome..."
                    className="bg-slate-950 border-white/10 text-white text-xs"
                  />
                </div>

                {/* Categories with + button (Multiple Allowed) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Category Badges (Multiple Allowed)
                    </label>
                    <span className="text-[10px] text-slate-400">Type & click + to add multiple categories</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={modalCategoryInput}
                      onChange={(e) => setModalCategoryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCategoryBadge();
                        }
                      }}
                      placeholder="e.g. Portfolio, Web App, AI/ML, Full-Stack..."
                      className="bg-slate-950 border-white/10 text-white text-xs h-10 flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddCategoryBadge}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 h-10 flex items-center gap-1.5 text-xs shrink-0 shadow-md shadow-blue-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Category</span>
                    </Button>
                  </div>

                  {/* Category Pills List */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(editingProject.categories && editingProject.categories.length > 0
                      ? editingProject.categories
                      : [editingProject.category].filter(Boolean)
                    ).map((cat, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 border border-blue-400/40 text-blue-300 uppercase tracking-wider shadow-sm"
                      >
                        <span>{cat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategoryBadge(cat)}
                          className="hover:text-white p-0.5 rounded-full hover:bg-blue-500/30 transition-colors"
                          title="Remove category badge"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Custom Badges with + button */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Additional Custom Badges (Multiple Allowed)
                    </label>
                    <span className="text-[10px] text-slate-400">e.g. Featured, Open Source, High Performance</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={modalBadgeInput}
                      onChange={(e) => setModalBadgeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCustomBadge();
                        }
                      }}
                      placeholder="Type custom badge & press Enter or +..."
                      className="bg-slate-950 border-white/10 text-white text-xs h-10 flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddCustomBadge}
                      className="bg-purple-600 hover:bg-purple-500 text-white px-4 h-10 flex items-center gap-1.5 text-xs shrink-0 shadow-md shadow-purple-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Badge</span>
                    </Button>
                  </div>

                  {/* Custom Badges Pills List */}
                  {editingProject.badges && editingProject.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {editingProject.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 border border-purple-400/40 text-purple-300 uppercase tracking-wider shadow-sm"
                        >
                          <span>{badge}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomBadge(badge)}
                            className="hover:text-white p-0.5 rounded-full hover:bg-purple-500/30 transition-colors"
                            title="Remove badge"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Badge Text */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Status Badge Text</label>
                  <Input
                    value={editingProject.status || ""}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value })
                    }
                    placeholder="e.g. Live, Beta, Completed, In Progress"
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                </div>

                {/* Architecture Sub-tag & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Architecture Sub-Tag</label>
                    <Input
                      value={editingProject.architectureTag || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, architectureTag: e.target.value })
                      }
                      placeholder="e.g. Full-Stack Architecture"
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Release / Edition Year</label>
                    <Input
                      value={editingProject.year || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, year: e.target.value })
                      }
                      placeholder="e.g. 2024 Edition"
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                {/* Tech Stack Pills with + Button */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Technologies / Stack Pills (Add Multiple)
                    </label>
                    <span className="text-[10px] text-slate-400">Add individual tech tags</span>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={modalTechInput}
                      onChange={(e) => setModalTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTechPill();
                        }
                      }}
                      placeholder="e.g. React, TypeScript, Framer Motion, Tailwind CSS..."
                      className="bg-slate-950 border-white/10 text-white text-xs h-10 flex-1"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTechPill}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 h-10 flex items-center gap-1.5 text-xs shrink-0 shadow-md shadow-emerald-600/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Tech</span>
                    </Button>
                  </div>

                  {/* Tech Pills Display */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(editingProject.tech || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950/80 border border-white/20 text-slate-200 shadow-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTechPill(t)}
                          className="hover:text-red-400 p-0.5 rounded hover:bg-white/10 transition-colors ml-0.5"
                          title="Remove tech"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Stats: Rating, Views, Likes */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Rating (0 - 5.0)</label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={editingProject.rating ?? 4.9}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, rating: parseFloat(e.target.value) || 0 })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Views</label>
                    <Input
                      type="number"
                      min="0"
                      value={editingProject.views ?? 0}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, views: parseInt(e.target.value, 10) || 0 })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Likes Count</label>
                    <Input
                      type="number"
                      min="0"
                      value={editingProject.likes ?? 0}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, likes: parseInt(e.target.value, 10) || 0 })
                      }
                      className="bg-slate-950 border-white/10 text-white text-xs h-10"
                    />
                  </div>
                </div>

                {/* Media & Links */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Cover Image URL</label>
                  <Input
                    value={editingProject.image}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="bg-slate-950 border-white/10 text-white text-xs h-10"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Live Demo URL</label>
                    <Input
                      value={editingProject.liveLink}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, liveLink: e.target.value })
                      }
                      placeholder="https://..."
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
                      placeholder="https://github.com/..."
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

                {/* ========================================================== */}
                {/* 2. CARD PORTION VISIBILITY & ON/OFF CONTROLS               */}
                {/* ========================================================== */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 text-purple-300">
                        <Sliders className="w-3.5 h-3.5" />
                        Card Elements & Visibility Controls
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Turn off any badge or section here to immediately hide it on the public card
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    {[
                      {
                        key: "showChrome" as const,
                        label: "macOS Window Dots",
                        desc: "Top 3 colored window strip",
                        icon: Sliders,
                      },
                      {
                        key: "showCategory" as const,
                        label: "Category Badge",
                        desc: "Category tag (e.g. Full-Stack)",
                        icon: Layers,
                      },
                      {
                        key: "showStatus" as const,
                        label: "Status Badge",
                        desc: "Live / Beta pulse pill",
                        icon: Sparkles,
                      },
                      {
                        key: "showTelemetry" as const,
                        label: "Telemetry Badge",
                        desc: "Rating ★ and views 👁 badge",
                        icon: Eye,
                      },
                      {
                        key: "showSpecs" as const,
                        label: "Architecture Specs",
                        desc: "Architecture & Year strip",
                        icon: Zap,
                      },
                      {
                        key: "showTech" as const,
                        label: "Tech Stack Pills",
                        desc: "Interactive technology badges",
                        icon: Code,
                      },
                      {
                        key: "showLikes" as const,
                        label: "Like Heart Button",
                        desc: "Heart button in card title",
                        icon: Heart,
                      },
                      {
                        key: "showLive" as const,
                        label: "Live Demo Button",
                        desc: "Primary gradient action CTA",
                        icon: Globe,
                      },
                      {
                        key: "showGithub" as const,
                        label: "GitHub Code Button",
                        desc: "Source code repository CTA",
                        icon: Github,
                      },
                    ].map((item) => {
                      const isOn = editingProject[item.key] !== false;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() =>
                            setEditingProject({
                              ...editingProject,
                              [item.key]: !isOn,
                            })
                          }
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 select-none ${
                            isOn
                              ? "bg-purple-950/30 border-purple-500/40 text-white shadow-sm"
                              : "bg-slate-950/60 border-white/10 text-slate-400 opacity-60 hover:opacity-80"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <item.icon
                              className={`w-4 h-4 shrink-0 ${
                                isOn ? "text-purple-400" : "text-slate-500"
                              }`}
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate">{item.label}</div>
                              <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                            </div>
                          </div>

                          <div
                            className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 shrink-0 ${
                              isOn ? "bg-purple-600" : "bg-slate-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                                isOn ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs h-10 px-4"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-6 h-10 shadow-lg shadow-purple-600/30 gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes & Sync
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
