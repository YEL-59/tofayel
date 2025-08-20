import {
  User,
  Award,
  Clock,
  Heart,
  Code,
  Coffee,
  Zap,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import myImage from "../assets/me.jpg";

export default function About() {
  const stats = [
    {
      icon: Clock,
      label: "Years Experience",
      value: "5+",
      color: "text-blue-600",
    },
    {
      icon: Award,
      label: "Projects Completed",
      value: "50+",
      color: "text-green-600",
    },
    {
      icon: User,
      label: "Happy Clients",
      value: "30+",
      color: "text-purple-600",
    },
    {
      icon: Coffee,
      label: "Coffee Cups",
      value: "1000+",
      color: "text-orange-600",
    },
  ];

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
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
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
              About Me
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Passionate frontend developer with a keen eye for design and user
              experience
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <motion.div
                className="aspect-square bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl p-1 max-w-md mx-auto relative"
                whileHover={{
                  scale: 1.02,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 },
                }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(139, 92, 246, 0.4)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r rounded-lg from-blue-400/20 to-purple-500/20"
                    style={{
                      backgroundImage: `url(${myImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "overlay", // lets gradient + image blend
                    }}
                  />

                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Code className="h-6 w-6 text-blue-500" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 left-4"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -180, -360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  >
                    <Heart className="h-5 w-5 text-pink-500" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 left-4"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  >
                    <Star className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-6 order-1 lg:order-2"
              variants={textVariants}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
                whileInView={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Creating Digital Experiences
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                I'm a frontend developer based in San Francisco, specializing in
                building exceptional digital experiences. With over 5 years of
                experience in web development, I've worked with startups and
                established companies to create user-friendly applications.
              </motion.p>
              <motion.p
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                My expertise lies in React, TypeScript, and modern CSS
                frameworks. I'm passionate about writing clean, maintainable
                code and staying up-to-date with the latest web technologies and
                best practices.
              </motion.p>
              <motion.p
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                When I'm not coding, you can find me exploring new design
                trends, contributing to open-source projects, or enjoying a good
                cup of coffee while planning my next project.
              </motion.p>

              <motion.div
                className="flex items-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
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
                  <Zap className="h-6 w-6 text-yellow-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Always learning, always growing
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <CardHeader className="pb-2 relative z-10">
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                      }}
                    >
                      <stat.icon
                        className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto ${stat.color} dark:opacity-80`}
                      />
                    </motion.div>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3,
                          }}
                        >
                          {stat.value}
                        </motion.span>
                      </CardTitle>
                    </motion.div>
                    <CardDescription className="text-xs sm:text-sm">
                      {stat.label}
                    </CardDescription>
                  </CardContent>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    whileHover={{
                      borderImage:
                        "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6) 1",
                      borderImageSlice: 1,
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
