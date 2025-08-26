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

            {/* Right side - Image */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-3xl" />
                
                {/* Main image container */}
                <motion.div
                  className="relative w-80 h-96 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={myImage} 
                    alt="Tofayel Islam" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
                  animate={{
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
