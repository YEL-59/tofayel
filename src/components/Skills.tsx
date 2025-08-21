import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Palette,
  Database,
  Wrench,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      icon: Code,
      description: "Modern frontend frameworks and libraries",
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Vue.js",
        "Angular",
        "JavaScript (ES6+)",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Styling & Design",
      icon: Palette,
      description: "CSS frameworks and design tools",
      skills: [
        "Tailwind CSS",
        "Styled Components",
        "SASS/SCSS",
        "CSS Grid",
        "Flexbox",
        "Figma",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Backend & Database",
      icon: Database,
      description: "Server-side technologies and databases",
      skills: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "MongoDB",
        "Supabase",
        "REST APIs",
      ],
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Tools & Workflow",
      icon: Wrench,
      description: "Development tools and methodologies",
      skills: ["Git", "Webpack", "Vite", "Docker", "Jest", "Cypress"],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const proficiencyLevels = [
    { skill: "React", level: 95, color: "from-blue-500 to-blue-600" },
    { skill: "TypeScript", level: 90, color: "from-indigo-500 to-indigo-600" },
    { skill: "Tailwind CSS", level: 95, color: "from-cyan-500 to-cyan-600" },
    { skill: "Next.js", level: 85, color: "from-gray-700 to-gray-800" },
    { skill: "Node.js", level: 80, color: "from-green-500 to-green-600" },
    { skill: "PostgreSQL", level: 75, color: "from-blue-600 to-blue-700" },
  ];

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
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
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
              Skills & Technologies
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              A comprehensive toolkit for building modern web applications
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl relative overflow-hidden group">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  {/* Animated particles inside card */}
                  <motion.div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </motion.div>

                  <CardHeader className="relative z-10">
                    <motion.div
                      className={`bg-gradient-to-br ${category.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg relative`}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                      animate={{
                        boxShadow: [
                          "0 4px 20px rgba(59, 130, 246, 0.3)",
                          "0 8px 30px rgba(139, 92, 246, 0.4)",
                          "0 4px 20px rgba(59, 130, 246, 0.3)",
                        ],
                      }}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      >
                        <Sparkles className="h-3 w-3 text-yellow-400" />
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-lg sm:text-xl">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: skillIndex * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                            <span className="relative z-10">{skill}</span>
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                  "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
                  "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3 relative z-10"
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
                <Zap className="h-8 w-8 text-yellow-500" />
              </motion.div>
              Proficiency Levels
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Star className="h-6 w-6 text-purple-500" />
              </motion.div>
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
              {proficiencyLevels.map((item, index) => (
                <motion.div
                  key={index}
                  className="space-y-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                      {item.skill}
                    </span>
                    <motion.span
                      className="text-sm text-gray-600 dark:text-gray-400 font-semibold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      // transition={{ delay: index * 0.1 + 0.3 }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        },
                      }}
                    >
                      {item.level}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden relative">
                    <motion.div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full relative overflow-hidden`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                      />
                      <motion.div
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 360, 720],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.4,
                        }}
                      >
                        <Star className="h-2 w-2 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
