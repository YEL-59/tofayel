import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, X, Code, Globe, Search, Grid, List, Star, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import myImage from "../assets/me.jpg";
import { useState, useMemo } from "react";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");


  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      liveLink: "https://ecommerce-demo.com",
      githubLink: "https://github.com/yourusername/ecommerce",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full-Stack",
      status: "Live",
      rating: 4.8,
      views: 1250,
      likes: 89
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates, drag-and-drop interface, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      liveLink: "https://task-app-demo.com",
      githubLink: "https://github.com/yourusername/task-app",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      category: "Web App",
      status: "Live",
      rating: 4.9,
      views: 2100,
      likes: 156
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Personal portfolio showcasing projects, skills, and professional experience with modern design and animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      liveLink: "https://your-portfolio.com",
      githubLink: "https://github.com/yourusername/portfolio",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      category: "Portfolio",
      status: "Live",
      rating: 4.7,
      views: 890,
      likes: 67
    },
    {
      id: 4,
      title: "AI Chat Application",
      description: "Intelligent chatbot with natural language processing, sentiment analysis, and multi-language support.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      liveLink: "https://ai-chat-demo.com",
      githubLink: "https://github.com/yourusername/ai-chat",
      tech: ["React", "Python", "OpenAI", "Socket.io"],
      category: "AI/ML",
      status: "Live",
      rating: 4.6,
      views: 1800,
      likes: 134
    },
    {
      id: 5,
      title: "Social Media Dashboard",
      description: "Comprehensive social media analytics dashboard with real-time data visualization and reporting tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      liveLink: "https://social-dashboard.com",
      githubLink: "https://github.com/yourusername/social-dashboard",
      tech: ["Vue.js", "D3.js", "Express", "Redis"],
      category: "Analytics",
      status: "Live",
      rating: 4.5,
      views: 950,
      likes: 78
    },
    {
      id: 6,
      title: "Mobile Game",
      description: "Cross-platform mobile game with physics engine, multiplayer support, and in-app purchases.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      liveLink: "https://mobile-game.com",
      githubLink: "https://github.com/yourusername/mobile-game",
      tech: ["Unity", "C#", "Firebase", "PlayFab"],
      category: "Game Dev",
      status: "Live",
      rating: 4.4,
      views: 3200,
      likes: 245
    },
    {
      id: 7,
      title: "Weather App",
      description: "Beautiful weather application with location-based forecasts, radar maps, and weather alerts.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop",
      liveLink: "https://weather-app.com",
      githubLink: "https://github.com/yourusername/weather-app",
      tech: ["React Native", "Expo", "OpenWeather API"],
      category: "Mobile",
      status: "Live",
      rating: 4.3,
      views: 1100,
      likes: 92
    },
    {
      id: 8,
      title: "Crypto Trading Bot",
      description: "Automated cryptocurrency trading bot with advanced algorithms and risk management features.",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
      liveLink: "https://crypto-bot.com",
      githubLink: "https://github.com/yourusername/crypto-bot",
      tech: ["Python", "Binance API", "Pandas", "NumPy"],
      category: "Finance",
      status: "Live",
      rating: 4.2,
      views: 2800,
      likes: 198
    }
  ];

  const categories = ["All", "Full-Stack", "Web App", "Portfolio", "AI/ML", "Analytics", "Game Dev", "Mobile", "Finance"];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left side - Content */}
              <motion.div
                className="space-y-8"
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
                  <p className="text-lg font-light text-white/60 tracking-wide">
                    Hello, I'm
                  </p>
                  <h1 className="text-5xl lg:text-7xl font-light text-white leading-tight">
                    <span className="block">Tofayel</span>
                    <span className="block text-white/40">Islam</span>
                  </h1>
                </motion.div>

                {/* Professional title */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
                    <span className="text-lg font-medium text-white/80 tracking-wider uppercase">
                      Frontend Developer
                    </span>
                  </div>
                  <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                    Crafting exceptional digital experiences with precision and creativity. 
                    Specializing in modern web technologies and user-centered design.
                  </p>
                </motion.div>

                {/* Skills showcase */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-sm font-medium text-white/50 uppercase tracking-wider">
                    Technologies I work with
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"].map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/80 backdrop-blur-sm"
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
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="group bg-white text-black hover:bg-white/90 px-8 py-4 rounded-none font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      View My Work
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-none font-medium transition-all duration-300"
                    >
                      Download CV
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Social links */}
                <motion.div
                  className="flex gap-6 pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {[
                    { icon: Github, href: "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:tofayel@example.com", label: "Email" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <social.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{social.label}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right side - Creative Showcase */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <div className="relative w-full max-w-lg">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
                  
                  {/* Main photo card */}
                  <motion.div
                    className="relative z-10 w-72 h-80 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={myImage} 
                      alt="Tofayel Islam" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-white">Available</span>
                    </div>
                  </motion.div>

                  {/* Enhanced Floating Project Cards */}
                  <motion.div
                    className="absolute -top-8 -left-8 w-52 h-36 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 2,
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)"
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />
                    
                    {/* Content overlay */}
                    <div className="relative h-full p-4 z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-2 h-2 bg-blue-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-xs font-medium text-white/90">React App</span>
                        </div>
                        <motion.div
                          className="text-xs text-white/60"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐ 4.8
                        </motion.div>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                        E-Commerce Platform
                      </h4>
                      <p className="text-xs text-white/70 mb-3">Modern shopping experience with real-time updates</p>
                      
                      <div className="flex gap-1 mb-2">
                        {["React", "TypeScript", "Tailwind"].map((tech, index) => (
                          <motion.span 
                            key={tech} 
                            className="px-2 py-1 text-xs bg-white/10 rounded text-white/80 border border-white/20"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Live indicator */}
                      <div className="flex items-center gap-1">
                        <motion.div 
                          className="w-1.5 h-1.5 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-6 -right-6 w-48 h-32 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, y: 20, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: -2,
                      boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)"
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-teal-500/20 to-emerald-500/20 animate-pulse" />
                    
                    <div className="relative h-full p-4 z-10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                          <span className="text-xs font-medium text-white/90">Next.js</span>
                        </div>
                        <motion.div
                          className="text-xs text-white/60"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        >
                          👁️ 2.1k
                        </motion.div>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-green-300 transition-colors">
                        Portfolio Website
                      </h4>
                      <p className="text-xs text-white/70">Personal branding & project showcase</p>
                      
                      {/* Live indicator */}
                      <div className="flex items-center gap-1 mt-2">
                        <motion.div 
                          className="w-1.5 h-1.5 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -right-12 w-44 h-28 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    whileHover={{ 
                      scale: 1.1, 
                      x: -8,
                      boxShadow: "0 25px 50px rgba(236, 72, 153, 0.3)"
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-rose-500/20 to-fuchsia-500/20 animate-pulse" />
                    
                    <div className="relative h-full p-3 z-10">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-2 h-2 bg-pink-400 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          />
                          <span className="text-xs font-medium text-white/90">UI/UX</span>
                        </div>
                        <motion.div
                          className="text-xs text-white/60"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        >
                          ❤️ 156
                        </motion.div>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                        Design System
                      </h4>
                      <p className="text-xs text-white/70">Component library & design tokens</p>
                      
                      {/* Live indicator */}
                      <div className="flex items-center gap-1 mt-1">
                        <motion.div 
                          className="w-1.5 h-1.5 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
                        />
                        <span className="text-xs text-green-400 font-medium">Live</span>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* New floating card - AI Project */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-40 h-24 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 3,
                      boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20 animate-pulse" />
                    
                    <div className="relative h-full p-3 z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                        />
                        <span className="text-xs font-medium text-white/90">AI/ML</span>
                      </div>
                      
                      <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                        AI Chat Bot
                      </h4>
                      <p className="text-xs text-white/70">NLP & Sentiment Analysis</p>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  {/* Floating tech badges */}
                  <motion.div
                    className="absolute -top-20 right-8 animate-pulse"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-xs font-medium text-white">React Expert</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-8 -left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                      <span className="text-xs font-medium text-white">TypeScript</span>
                    </div>
                  </motion.div>

                  {/* Animated connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                    <motion.path
                      d="M 200 200 Q 100 150 50 100"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1.5 }}
                    />
                    <motion.path
                      d="M 200 200 Q 300 150 350 100"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1.7 }}
                    />
                  </svg>

                  {/* Interactive hover effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-white/30 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  />
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
            <div className="relative h-full overflow-hidden">
              {/* Header */}
              <motion.div
                className="sticky top-0 z-20 flex items-center justify-between p-6 bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2 className="text-3xl font-light text-white">My Creative Portfolio</h2>
                  <p className="text-white/60 mt-1">Discover {projects.length} amazing projects</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="h-6 w-6 text-white group-hover:rotate-90 transition-transform" />
                </button>
              </motion.div>

              {/* Search and Filter Bar */}
              <motion.div
                className="sticky top-20 z-10 p-6 bg-gray-900/60 backdrop-blur-xl border-b border-white/10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search projects, technologies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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
                  <div className="flex bg-white/5 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Projects Container */}
              <div className="h-[calc(100vh-200px)] overflow-y-auto">
                <div className="p-6">
                  {filteredProjects.length === 0 ? (
                    <motion.div
                      className="text-center py-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl text-white mb-2">No projects found</h3>
                      <p className="text-white/60">Try adjusting your search or filter criteria</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={viewMode === "grid" 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                      }
                      layout
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`group relative ${
                            viewMode === "grid"
                              ? "bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                              : "bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                          }`}
                          whileHover={{ y: -5, rotateY: 5 }}
                        >
                          {viewMode === "grid" ? (
                            <>
                              {/* Grid View */}
                              <div className="relative h-48 overflow-hidden">
                                <img 
                                  src={project.image} 
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                
                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                                    {project.status}
                                  </span>
                                </div>
                                
                                {/* Stats */}
                                <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white/80 text-xs">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {project.rating}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {project.views}
                                  </div>
                                </div>
                              </div>

                              <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="px-3 py-1 bg-white/10 text-white/90 text-xs font-medium rounded-full">
                                    {project.category}
                                  </span>
                                  <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                    <Heart className="h-4 w-4 text-white/60 hover:text-red-400" />
                                  </button>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                  {project.title}
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                                  {project.description}
                                </p>
                                
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {project.tech.slice(0, 3).map((tech) => (
                                    <span 
                                      key={tech}
                                      className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs rounded-full"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {project.tech.length > 3 && (
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 text-xs rounded-full">
                                      +{project.tech.length - 3}
                                    </span>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 group/btn"
                                  >
                                    <Globe className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                                    Live Demo
                                  </a>
                                  <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                                  >
                                    <Code className="h-4 w-4" />
                                    Code
                                  </a>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* List View */}
                              <div className="flex gap-6">
                                <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <span className="absolute top-2 left-2 px-2 py-1 bg-green-500/90 text-white text-xs rounded">
                                    {project.status}
                                  </span>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                                      {project.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-white/60 text-sm">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {project.rating}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {project.views}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                                    {project.description}
                                  </p>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                      {project.tech.slice(0, 4).map((tech) => (
                                        <span 
                                          key={tech}
                                          className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 text-xs rounded-full"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                      >
                                        <Globe className="h-4 w-4" />
                                        Demo
                                      </a>
                                      <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                                      >
                                        <Code className="h-4 w-4" />
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
