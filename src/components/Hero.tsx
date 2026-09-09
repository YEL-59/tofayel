import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, X, Code, Globe, Search, Grid, List, Star, Eye, Heart, Download, Zap, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import myImage from "../assets/me.jpg";
import { useState, useMemo, useEffect } from "react";
import { portfolioAPI, fallbackProjects, fallbackProfile, type Project, type Profile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface HeroProps {
  initialProfile?: Profile;
}

export default function Hero({ initialProfile }: HeroProps) {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>(initialProfile || fallbackProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [likedProjects, setLikedProjects] = useState<Record<string | number, boolean>>({});

  const toggleLike = (id: string | number) => {
    setLikedProjects((prev) => {
      const next = !prev[id];
      toast({
        title: next ? "Added to Favorites ❤️" : "Removed from Favorites",
        description: next ? "Project added to your favorites!" : "Project unliked",
      });
      return { ...prev, [id]: next };
    });
  };

  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  const loadFreshProjects = () => {
    portfolioAPI.getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  };

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
    } else {
      portfolioAPI.getProfile().then((data) => {
        if (data) setProfile(data);
      });
    }

    loadFreshProjects();

    const handleUpdate = () => {
      loadFreshProjects();
    };

    window.addEventListener("portfolio_projects_updated", handleUpdate);
    return () => window.removeEventListener("portfolio_projects_updated", handleUpdate);
  }, [initialProfile]);

  useEffect(() => {
    if (isModalOpen) {
      loadFreshProjects();
    }
  }, [isModalOpen]);

  const handleDownloadCV = () => {
    toast({
      title: "Downloading CV",
      description: `Starting download of ${profile.cvFileName || "Resume"}...`,
    });
    const link = document.createElement("a");
    link.href = portfolioAPI.getCVDownloadUrl();
    link.download = profile.cvFileName || "Tofayel_Islam_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
      if (p.categories && Array.isArray(p.categories)) {
        p.categories.forEach((c) => c && set.add(c));
      }
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tech && project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory ||
        (project.categories && project.categories.includes(selectedCategory));
      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              
              {/* Left side - Content */}
              <motion.div
                className="space-y-6 sm:space-y-8 order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Elegant greeting */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-sm sm:text-base lg:text-lg font-light text-white/60 tracking-wide">
                    {profile.greeting || "Hello, I'm"}
                  </p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight">
                    <span className="block">{profile.nameFirst || "Tofayel"}</span>
                    <span className="block text-white/40">{profile.nameLast || "Islam"}</span>
                  </h1>
                </motion.div>

                {/* Professional title */}
                <motion.div
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
                    <span className="text-sm sm:text-base lg:text-lg font-medium text-white/80 tracking-wider uppercase">
                      {profile.role || "Frontend Developer"}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg lg:text-xl text-white/70 leading-relaxed max-w-lg">
                    {profile.bio}
                  </p>
                </motion.div>

                {/* Skills showcase */}
                <motion.div
                  className="space-y-3 sm:space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-xs sm:text-sm font-medium text-white/50 uppercase tracking-wider">
                    Technologies I work with
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {(profile.technologies || ["React", "TypeScript", "Next.js"]).map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-white/80 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(255, 255, 255, 0.2)",
                          scale: 1.05,
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="group bg-white text-black hover:bg-white/90 px-6 sm:px-8 py-3 sm:py-4 rounded-none font-medium transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      View My Work
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      variant="outline"
                      onClick={handleDownloadCV}
                      className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-none font-medium transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Social links */}
                <motion.div
                  className="flex flex-wrap gap-4 sm:gap-6 pt-6 sm:pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {[
                    { icon: Github, href: profile.socialLinks?.github || "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: profile.socialLinks?.linkedin || "https://linkedin.com", label: "LinkedIn" },
                    { icon: Mail, href: `mailto:${profile.socialLinks?.email || "tofayeltuhin143@gmail.com"}`, label: "Email" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 sm:gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm font-medium">{social.label}</span>
                      <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Creative Showcase */}
              <motion.div
                className="relative flex justify-center lg:justify-end order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-lg py-8 sm:py-10 flex items-center justify-center">
                  {/* Ambient background glow layers */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-3xl blur-2xl pointer-events-none" />

                  {/* Main Portrait Card */}
                  <motion.div
                    className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden border border-white/20 bg-slate-900/60 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.6)] cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {/* Glowing border gradient on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                    <img 
                      src={myImage} 
                      alt="Tofayel Islam" 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient overlays for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Status indicator: Available */}
                    {profile.isAvailable !== false && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md rounded-full shadow-lg">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </div>
                        <span className="text-xs font-semibold text-emerald-300 tracking-wide">
                          {profile.availableText || "Available for Hire"}
                        </span>
                      </div>
                    )}

                    {/* Bottom identity tag on portrait - Left aligned to avoid overlap */}
                    <div className="absolute bottom-4 left-4 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-xl">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                        <Code className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white tracking-wide">
                          {profile.nameFirst || "Tofayel"} {profile.nameLast || "Islam"}
                        </p>
                        <p className="text-[11px] text-white/60">{profile.role || "Frontend Developer"}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Satellite Card 1: Top-Left (E-Commerce Platform) */}
                  <motion.div
                    className="absolute -top-3 -left-2 sm:-top-5 sm:-left-8 lg:-top-6 lg:-left-12 z-20 w-48 sm:w-56 p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{
                      opacity: { duration: 0.8, delay: 0.5 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.6)", y: -8 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">React App</span>
                      </div>
                      <span className="text-[11px] font-medium text-amber-400 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.8
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                      E-Commerce Platform
                    </h4>
                    <p className="text-[11px] text-white/60 mb-2 line-clamp-1">Modern shopping with cart & checkout</p>
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-[10px] text-blue-300 border border-blue-500/30">React</span>
                      <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[10px] text-purple-300 border border-purple-500/30">TypeScript</span>
                      <span className="ml-auto text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
                      </span>
                    </div>
                  </motion.div>

                  {/* Satellite Card 2: Bottom-Right (AI & UI/UX Systems) */}
                  <motion.div
                    className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-8 lg:-bottom-6 lg:-right-10 z-20 w-48 sm:w-56 p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-pink-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: [0, 6, 0] }}
                    transition={{
                      opacity: { duration: 0.8, delay: 0.7 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 0.6)", y: 4 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                        <span className="text-[11px] font-semibold text-pink-300 uppercase tracking-wider">AI / UI/UX</span>
                      </div>
                      <span className="text-[11px] font-medium text-pink-300 flex items-center gap-0.5">
                        <Heart className="w-3 h-3 fill-pink-400 text-pink-400" /> 156
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                      Design System & AI
                    </h4>
                    <p className="text-[11px] text-white/60 mb-2 line-clamp-1">NLP Assistant & UI Tokens</p>
                    <div className="flex items-center gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-pink-500/20 text-[10px] text-pink-300 border border-pink-500/30">Next.js</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-[10px] text-rose-300 border border-rose-500/30">Tailwind</span>
                      <span className="ml-auto text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Live
                      </span>
                    </div>
                  </motion.div>

                  {/* Satellite Badge 3: Top-Right (React & Next.js Pro) */}
                  <motion.div
                    className="absolute top-6 -right-2 sm:top-10 sm:-right-6 lg:-right-10 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-lg cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                    transition={{
                      opacity: { duration: 0.6, delay: 0.9 },
                      y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                    }}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-200">React & Next.js</span>
                  </motion.div>

                  {/* Satellite Badge 4: Bottom-Left (TypeScript & Modern Stack) */}
                  <motion.div
                    className="absolute bottom-16 -left-2 sm:bottom-20 sm:-left-6 lg:-left-10 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 shadow-lg cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, 4, 0] }}
                    transition={{
                      opacity: { duration: 0.6, delay: 1.1 },
                      y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                    }}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-xs font-semibold text-indigo-200">TypeScript Pro</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Project Showcase Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
            </div>

            {/* Modal Container */}
            <div className="relative h-full flex flex-col overflow-hidden">
              {/* Header */}
              <motion.div
                className="flex-shrink-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gray-900/90 backdrop-blur-xl border-b border-white/10"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white">My Creative Portfolio</h2>
                  <p className="text-white/60 mt-1 text-sm sm:text-base">Discover {projects.length} amazing projects</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 sm:p-3 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:rotate-90 transition-transform" />
                </button>
              </motion.div>

              {/* Search and Filter Bar */}
              <motion.div
                className="flex-shrink-0 z-10 p-4 sm:p-6 bg-gray-900/75 backdrop-blur-xl border-b border-white/10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Search */}
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search projects, technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                          selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-white/5 rounded-xl p-1 justify-center sm:justify-start">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <List className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Projects Container */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="p-4 sm:p-6 pb-20">
                  {filteredProjects.length === 0 ? (
                    <motion.div
                      className="text-center py-12 sm:py-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                      <h3 className="text-lg sm:text-xl text-white mb-2">No projects found</h3>
                      <p className="text-sm sm:text-base text-white/60">Try adjusting your search or filter criteria</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={viewMode === "grid" 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                        : "space-y-3 sm:space-y-4"
                      }
                      layout
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project._id || project.id || index}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group relative transition-all duration-300 rounded-2xl border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.04] p-3.5 sm:p-4 backdrop-blur-md"
                          whileHover={{ y: -5 }}
                        >
                          {viewMode === "grid" ? (
                            <div className="flex flex-col h-full bg-transparent overflow-hidden transition-all duration-500 relative">
                              {/* macOS Chrome Header Strip (Transparent) */}
                              {(project.showChrome !== false || project.showCategory !== false || project.showStatus !== false) && (
                                <div className="px-1 py-1 bg-transparent flex items-center justify-between text-xs mb-2.5">
                                  {project.showChrome !== false ? (
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                    </div>
                                  ) : <div />}
                                  <div className="flex items-center gap-2 flex-wrap justify-end">
                                    {project.showCategory !== false && (
                                      <>
                                        {(project.categories && project.categories.length > 0
                                          ? project.categories
                                          : [project.category].filter(Boolean)
                                        ).map((cat, catIdx) => (
                                          <span
                                            key={`cat-${catIdx}`}
                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-transparent border border-blue-400/40 text-blue-300 uppercase tracking-wider"
                                          >
                                            {cat}
                                          </span>
                                        ))}
                                        {project.badges && project.badges.length > 0 && project.badges.map((badge, badgeIdx) => (
                                          <span
                                            key={`badge-${badgeIdx}`}
                                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-transparent border border-purple-400/40 text-purple-300 uppercase tracking-wider"
                                          >
                                            {badge}
                                          </span>
                                        ))}
                                      </>
                                    )}
                                    {project.showStatus !== false && (
                                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-transparent border border-emerald-400/40 text-emerald-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {project.status || "Live"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Project Image Viewport */}
                              <div className="relative h-44 sm:h-48 overflow-hidden rounded-xl bg-transparent">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {/* Floating Telemetry Badge (Transparent Glass) */}
                                {project.showTelemetry !== false && (
                                  <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white/90 text-xs shadow-lg">
                                    <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                                      <Star className="h-3 w-3 fill-yellow-400" />
                                      <span>{project.rating ?? 4.7}</span>
                                    </div>
                                    <span className="text-white/30">•</span>
                                    <div className="flex items-center gap-1 text-slate-300">
                                      <Eye className="h-3 w-3 text-slate-400" />
                                      <span>{project.views ?? 890}</span>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Bento Content Body */}
                              <div className="py-4 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                  {/* Spec Telemetry Strip (Architecture & Year) */}
                                  {project.showSpecs !== false && (
                                    <div className="flex items-center justify-between text-[11px] mb-2.5 pb-2 border-b border-white/10">
                                      <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                                        <Zap className="w-3 h-3 text-cyan-400" />
                                        <span>{project.architectureTag || "Full-Stack Architecture"}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-purple-300 font-medium">
                                        <Calendar className="w-3 h-3 text-purple-400" />
                                        <span>
                                          {project.year
                                            ? project.year.toLowerCase().includes("edition")
                                              ? project.year
                                              : `${project.year} Edition`
                                            : "2024 Edition"}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Title & Heart Button */}
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-blue-200 group-hover:to-purple-200 transition-all">
                                      {project.title}
                                    </h3>
                                    {project.showLikes !== false && (
                                      <button
                                        onClick={() => toggleLike(project._id || project.id || index)}
                                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors shrink-0"
                                        title="Like Project"
                                      >
                                        <Heart
                                          className={`h-4 w-4 transition-colors ${
                                            likedProjects[project._id || project.id || index]
                                              ? "fill-red-500 text-red-500 scale-110"
                                              : ""
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* Description */}
                                  <p className="text-slate-300/80 text-xs leading-relaxed line-clamp-2">
                                    {project.description}
                                  </p>

                                  {/* Tech Stack Pills (Transparent Glass Badges) */}
                                  {project.showTech !== false && project.tech && project.tech.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                      {project.tech.map((tech) => (
                                        <span
                                          key={tech}
                                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent border border-white/20 hover:border-white/40 text-slate-200 text-[11px] font-medium rounded-lg transition-colors"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Bento Bottom Actions */}
                                {(project.showLive !== false || project.showGithub !== false) && (
                                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                                    {project.showLive !== false && (
                                      <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 h-10 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 flex items-center justify-center gap-1.5 group/btn transition-all duration-300 hover:scale-[1.02]"
                                      >
                                        <span>Live Demo</span>
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                      </a>
                                    )}
                                    {project.showGithub !== false && (
                                      <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                        title="View Source Code"
                                      >
                                        <Github className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline">Code</span>
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <>
                              {/* List View */}
                              <div className="flex gap-3 sm:gap-6">
                                <div className="relative w-20 h-16 sm:w-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <span className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500/90 text-white text-xs rounded">
                                    {project.status}
                                  </span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                      {project.title}
                                    </h3>
                                    <div className="flex items-center gap-3 sm:gap-4 text-white/60 text-xs sm:text-sm mt-1 sm:mt-0">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                                        {project.rating}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                                        {project.views}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                                    {project.description}
                                  </p>
                                  
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                      {project.tech.slice(0, 3).map((tech) => (
                                        <span 
                                          key={tech}
                                          className="px-2 sm:px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs rounded-full"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    <div className="flex gap-2 flex-shrink-0">
                                      <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                                      >
                                        <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                                        Demo
                                      </a>
                                      <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
                                      >
                                        <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                                        Code
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
