import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye, Star, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Projects", count: 6 },
    { id: "web-app", label: "Web Apps", count: 2 },
    { id: "e-commerce", label: "E-commerce", count: 2 },
    { id: "dashboard", label: "Dashboards", count: 2 },
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.",
      category: "e-commerce",
      image:
        "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      stars: 124,
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description:
        "Interactive dashboard for data visualization with real-time charts and customizable widgets for business intelligence.",
      category: "dashboard",
      image:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "D3.js", "Tailwind CSS", "Express.js"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      stars: 89,
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "Collaborative task management application with drag-and-drop functionality and team collaboration features.",
      category: "web-app",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Vue.js", "Vuex", "Firebase", "SCSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      stars: 67,
    },
    {
      id: 4,
      title: "Restaurant Website",
      description:
        "Responsive restaurant website with online ordering system and table reservation functionality.",
      category: "web-app",
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "Sanity CMS", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      stars: 45,
    },
    {
      id: 5,
      title: "Crypto Trading Dashboard",
      description:
        "Real-time cryptocurrency trading dashboard with portfolio tracking and market analysis tools.",
      category: "dashboard",
      image:
        "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Chart.js", "WebSocket", "Styled Components"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: false,
      stars: 156,
    },
    {
      id: 6,
      title: "Fashion Store",
      description:
        "Modern fashion e-commerce store with AR try-on features and personalized recommendations.",
      category: "e-commerce",
      image:
        "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Three.js", "Shopify API", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
      stars: 203,
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              A showcase of my recent work and personal projects
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div
              className="flex items-center gap-2 mb-4 sm:mb-0"
              variants={itemVariants}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Filter className="h-5 w-5 text-gray-500" />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter:
              </span>
            </motion.div>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  },
                }}
              >
                <Button
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300 text-sm sm:text-base relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{category.label}</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 text-xs relative z-10"
                  >
                    {category.count}
                  </Badge>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  whileHover="hover"
                  layout
                >
                  <Card
                    className={`group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl relative ${
                      project.featured
                        ? "ring-2 ring-blue-500/20 shadow-lg"
                        : ""
                    }`}
                  >
                    {/* Animated card background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover will-change-transform"
                        whileHover={{ scale: 1.08, rotate: 0.2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      />

                      {project.featured && (
                        <motion.div
                          className="absolute top-4 left-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg relative overflow-hidden">
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              animate={{
                                x: ["-100%", "100%"],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            <motion.div
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Star className="h-3 w-3 mr-1" />
                            </motion.div>
                            <span className="relative z-10">Featured</span>
                          </Badge>
                        </motion.div>
                      )}

                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                          }}
                        >
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        </motion.div>
                        <span className="text-white text-xs font-medium">
                          {project.stars}
                        </span>
                      </motion.div>

                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex space-x-3">
                          <motion.a
                            href={project.liveUrl}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="sm"
                              className="bg-white/90 text-gray-900 hover:bg-white shadow-lg relative overflow-hidden group"
                            >
                              <motion.div
                                className="absolute inset-0 bg-blue-500/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                              <Eye className="h-4 w-4 mr-2 relative z-10" />
                              <span className="relative z-10">Preview</span>
                            </Button>
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            whileHover={{
                              scale: 1.1,
                              boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white/90 border-white text-gray-900 hover:bg-white shadow-lg relative overflow-hidden group"
                            >
                              <motion.div
                                className="absolute inset-0 bg-purple-500/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                              />
                              <Github className="h-4 w-4 mr-2 relative z-10" />
                              <span className="relative z-10">Code</span>
                            </Button>
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>

                    <CardHeader className="pb-3 relative z-10">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg sm:text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </CardTitle>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.a
                            href={project.liveUrl}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.2, rotate: 15 }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            whileHover={{ scale: 1.2, rotate: -15 }}
                          >
                            <Github className="h-4 w-4" />
                          </motion.a>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-3 text-sm sm:text-base">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: techIndex * 0.05,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors cursor-default relative overflow-hidden"
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                              />
                              <span className="relative z-10">{tech}</span>
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
