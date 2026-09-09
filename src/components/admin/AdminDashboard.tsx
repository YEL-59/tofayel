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
  RefreshCw,
  Github,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "cv" | "messages">("home");

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

  // Load initial data
  useEffect(() => {
    checkHealth();
    loadProfile();
    loadProjects();
    loadCVInfo();
    loadMessages();
  }, []);

  const checkHealth = async () => {
    const health = await portfolioAPI.checkHealth();
    setIsBackendOnline(Boolean(health));
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

  // Project delete
  const handleDeleteProject = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await portfolioAPI.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast({ title: "Project Deleted" });
    } catch (err: any) {
      toast({ title: "Error deleting project", variant: "destructive" });
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

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    await portfolioAPI.deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m._id !== id));
    toast({ title: "Message removed" });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-2xl text-white flex flex-col"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide flex items-center gap-2">
              Portfolio Admin Studio
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                MERN CMS
              </span>
            </h1>
            <p className="text-xs text-white/50">Manage dynamic portfolio content & uploads</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Backend Health Chip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-white/10 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="text-white/70">
              Backend: {isBackendOnline ? "Online (Port 5000)" : "Offline (Local Fallback)"}
            </span>
          </div>

          {/* Deploy Center Shortcut */}
          {onOpenDeploy && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenDeploy}
              className="bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-300 flex items-center gap-1.5 text-xs font-medium"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Deploy Center</span>
            </Button>
          )}

          {/* Exit to Portfolio */}
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white/5 hover:bg-white/10 border-white/20 text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Portfolio</span>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === "home"
                ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Home & Hero</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === "projects"
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-lg shadow-purple-500/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span className="flex-1">Projects</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("cv")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === "cv"
                ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>CV & Resume</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
              activeTab === "messages"
                ? "bg-pink-600/20 text-pink-300 border border-pink-500/40 shadow-lg shadow-pink-500/10"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span className="flex-1">Inquiries</span>
            {messages.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-300">
                {messages.length}
              </span>
            )}
          </button>

          {/* Deployment Quick Launcher in Sidebar */}
          {onOpenDeploy && (
            <button
              onClick={onOpenDeploy}
              className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/20"
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="flex-1">Deploy Center</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-200">
                Cloud
              </span>
            </button>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* TAB 1: HOME & HERO CONFIGURATION */}
          {activeTab === "home" && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Hero Section Content
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Changes saved here immediately update your public landing page and hero section.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Greeting</label>
                  <Input
                    value={profile.greeting}
                    onChange={(e) => setProfile({ ...profile, greeting: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Role / Title</label>
                  <Input
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">First Name</label>
                  <Input
                    value={profile.nameFirst}
                    onChange={(e) => setProfile({ ...profile, nameFirst: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Last Name</label>
                  <Input
                    value={profile.nameLast}
                    onChange={(e) => setProfile({ ...profile, nameLast: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">Bio Summary</label>
                <Textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="bg-white/5 border-white/10 text-white leading-relaxed"
                />
              </div>

              {/* Availability Status */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Hire Availability Badge</p>
                  <p className="text-xs text-white/50">Controls the badge on your photo in the Hero section</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    value={profile.availableText}
                    onChange={(e) => setProfile({ ...profile, availableText: e.target.value })}
                    className="bg-slate-900 border-white/20 text-xs text-white w-44"
                    placeholder="Status text"
                  />
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, isAvailable: !profile.isAvailable })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      profile.isAvailable
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-red-500/20 text-red-300 border border-red-400/30"
                    }`}
                  >
                    {profile.isAvailable ? "Active" : "Hidden"}
                  </button>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5">
                  Technologies (Comma-separated)
                </label>
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="React, TypeScript, Next.js, Tailwind CSS, Node.js"
                />
              </div>

              {/* Social URLs */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">GitHub URL</label>
                  <Input
                    value={profile.socialLinks?.github || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialLinks: { ...profile.socialLinks, github: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">LinkedIn URL</label>
                  <Input
                    value={profile.socialLinks?.linkedin || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-white/70 block mb-1.5">Email Address</label>
                  <Input
                    value={profile.socialLinks?.email || ""}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        socialLinks: { ...profile.socialLinks, email: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSavingProfile}
                  className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-6 py-2.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? "Saving to Backend..." : "Save Hero Content"}</span>
                </Button>
              </div>
            </form>
          )}

          {/* TAB 2: PROJECTS SHOWCASE */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-purple-400" />
                    Project Showcase Management
                  </h2>
                  <p className="text-sm text-white/50 mt-1">
                    Manage portfolio projects displayed in the creative showcase and popup modal.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setEditingProject({
                      title: "",
                      description: "",
                      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
                      liveLink: "",
                      githubLink: "",
                      tech: ["React", "TypeScript"],
                      category: "Full-Stack",
                      status: "Live",
                      rating: 4.8,
                      views: 0,
                      likes: 0,
                    });
                    setIsProjectModalOpen(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </Button>
              </div>

              {/* Projects Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj._id || proj.id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-purple-500/30 transition-all group"
                  >
                    <div>
                      {proj.image && (
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3 relative">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-purple-300">
                            {proj.category}
                          </span>
                        </div>
                      )}
                      <h4 className="font-semibold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-white/60 mt-1 line-clamp-2">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tech?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                      <div className="flex gap-2">
                        {proj.liveLink && (
                          <a
                            href={proj.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-white/50 hover:text-white"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {proj.githubLink && (
                          <a
                            href={proj.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-white/50 hover:text-white"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj._id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CV UPLOAD & DOWNLOAD */}
          {activeTab === "cv" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  CV / Resume Management
                </h2>
                <p className="text-sm text-white/50 mt-1">
                  Upload your CV (PDF or DOCX). Clicking "Download CV" on the frontend will download this file.
                </p>
              </div>

              {/* Active CV Card */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{cvInfo?.fileName || "Tofayel_Islam_Resume.pdf"}</p>
                    <p className="text-xs text-emerald-300/70 mt-0.5">
                      {cvInfo?.size ? `${(cvInfo.size / 1024).toFixed(1)} KB • ` : ""}
                      Active on frontend
                    </p>
                  </div>
                </div>
                <a
                  href={portfolioAPI.getCVDownloadUrl()}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-semibold hover:bg-emerald-400 transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Test Download</span>
                </a>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleUploadCV} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <p className="text-xs font-semibold text-white uppercase tracking-wider">
                  Upload New Resume File
                </p>
                <div className="border-2 border-dashed border-white/20 hover:border-emerald-500/50 rounded-xl p-8 text-center transition-colors">
                  <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                  <p className="text-sm text-white/80 font-medium">Select a PDF or DOC file</p>
                  <p className="text-xs text-white/40 mt-1">Maximum size: 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="mt-4 text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />
                </div>

                {selectedFile && (
                  <p className="text-xs text-emerald-400 font-medium">
                    Ready to upload: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={!selectedFile || isUploadingCV}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-xl"
                >
                  {isUploadingCV ? "Uploading to Server..." : "Upload & Activate CV"}
                </Button>
              </form>
            </div>
          )}

          {/* TAB 4: CONTACT MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-pink-400" />
                    Visitor Inquiries & Messages
                  </h2>
                  <p className="text-sm text-white/50 mt-1">
                    Messages submitted by visitors through your contact form.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={loadMessages}
                  className="bg-white/5 border-white/10 text-white text-xs flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </Button>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center text-white/40 rounded-xl bg-white/5 border border-white/10">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No contact messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-white">{msg.name}</p>
                          <span className="text-xs text-white/40">•</span>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-xs text-blue-400 hover:underline"
                          >
                            {msg.email}
                          </a>
                        </div>
                        {msg.subject && (
                          <p className="text-xs font-medium text-pink-300">Subject: {msg.subject}</p>
                        )}
                        <p className="text-xs text-white/80 leading-relaxed pt-1">{msg.message}</p>
                        <p className="text-[10px] text-white/40 pt-2">
                          {new Date(msg.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 self-start"
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

      {/* PROJECT EDIT / CREATE MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && editingProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              className="w-full max-w-lg bg-slate-900 border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <h3 className="text-lg font-bold text-white">
                {editingProject._id ? "Edit Project" : "Add New Project"}
              </h3>

              <form onSubmit={handleSaveProject} className="space-y-3">
                <div>
                  <label className="text-xs text-white/70 block mb-1">Project Title</label>
                  <Input
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/70 block mb-1">Description</label>
                  <Textarea
                    rows={3}
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, category: e.target.value })
                      }
                      className="w-full h-9 px-3 rounded-md bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
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
                    <label className="text-xs text-white/70 block mb-1">Status</label>
                    <Input
                      value={editingProject.status}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, status: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/70 block mb-1">Image URL</label>
                  <Input
                    value={editingProject.image}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, image: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/70 block mb-1">Live URL</label>
                    <Input
                      value={editingProject.liveLink}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, liveLink: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 block mb-1">GitHub URL</label>
                    <Input
                      value={editingProject.githubLink}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, githubLink: e.target.value })
                      }
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="bg-white/5 border-white/20 text-white"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">
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
