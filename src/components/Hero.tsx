import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import myImage from "../assets/me.jpg";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const name = "Md.Tofayel Islam";

  return (
    <section
      id="home"
      className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute top-20 left-10 text-blue-400 opacity-20"
        variants={sparkleVariants}
        animate="animate"
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-purple-400 opacity-20"
        variants={sparkleVariants}
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Sparkles className="h-6 w-6" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-pink-400 opacity-20"
        variants={sparkleVariants}
        animate="animate"
        transition={{ delay: 2 }}
      >
        <Sparkles className="h-10 w-10" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {"Hi, I'm ".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                initial="hidden"
                whileInView="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.5,
                    },
                  },
                }}
              >
                {name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4"
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Frontend Developer passionate about creating beautiful,
              responsive, and user-friendly web experiences
            </motion.p>
          </motion.div>

          <motion.div
            className="mb-12"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Button
                  onClick={scrollToProjects}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="relative z-10"
                  >
                    View My Work
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: "#3b82f6",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
              >
                <Button
                  variant="outline"
                  onClick={scrollToContact}
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 px-8 py-4 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg w-full sm:w-auto group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  <span className="relative z-10">Download CV</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="px-4">
              <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/60 dark:divide-white/10">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-gray-50/70 dark:hover:bg-gray-800/60 transition-colors"
                    aria-label="GitHub"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 ring-1 ring-inset ring-gray-200/70 dark:ring-white/10 group-hover:ring-gray-400/60 transition-colors">
                        <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </span>
                      <span className="text-left">
                        <span className="block font-medium text-gray-900 dark:text-white">GitHub</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Open-source projects</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100/80 dark:bg-blue-900/30 ring-1 ring-inset ring-blue-200/70 dark:ring-blue-500/30 group-hover:ring-blue-500/50 transition-colors">
                        <Linkedin className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                      </span>
                      <span className="text-left">
                        <span className="block font-medium text-gray-900 dark:text-white">LinkedIn</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Let’s connect professionally</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </a>

                  <a
                    href="mailto:sarah@example.com"
                    className="group flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-rose-50/60 dark:hover:bg-rose-900/20 transition-colors"
                    aria-label="Email"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100/80 dark:bg-rose-900/30 ring-1 ring-inset ring-rose-200/70 dark:ring-rose-500/30 group-hover:ring-rose-500/50 transition-colors">
                        <Mail className="h-5 w-5 text-rose-700 dark:text-rose-300" />
                      </span>
                      <span className="text-left">
                        <span className="block font-medium text-gray-900 dark:text-white">Email</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Get in touch</span>
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating avatar with actual photo */}
          <motion.div
            className="mt-16 flex justify-center"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 2.5,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.div
              className="relative"
              variants={floatingVariants}
              animate="animate"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden ring-1 ring-gray-200/60 dark:ring-white/10 bg-white/60 dark:bg-gray-900/40 backdrop-blur shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <img src={myImage} alt="Tofayel" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
