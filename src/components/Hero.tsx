import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import myImage from "../assets/me.jpg";

export default function Hero() {
  return (
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

                {/* Floating project cards */}
                <motion.div
                  className="absolute -top-8 -left-8 w-48 h-32 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-xs font-medium text-white/90">React App</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">E-Commerce Platform</h4>
                    <p className="text-xs text-white/70">Modern shopping experience with real-time updates</p>
                    <div className="flex gap-1 mt-3">
                      {["React", "TypeScript", "Tailwind"].map((tech, i) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-white/10 rounded text-white/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -right-6 w-44 h-28 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  <div className="h-full bg-gradient-to-br from-green-500/20 to-teal-500/20 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-xs font-medium text-white/90">Next.js</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">Portfolio Website</h4>
                    <p className="text-xs text-white/70">Personal branding & project showcase</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-12 w-40 h-24 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  whileHover={{ scale: 1.05, x: -5 }}
                >
                  <div className="h-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-pink-400 rounded-full" />
                      <span className="text-xs font-medium text-white/90">UI/UX</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white">Design System</h4>
                    <p className="text-xs text-white/70">Component library & design tokens</p>
                  </div>
                </motion.div>

                {/* Floating tech badges */}
                <motion.div
                  className="absolute -top-4 right-8"
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
  );
}
