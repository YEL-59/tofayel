import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      title: " Frontend Developer",
      company: "Softvence Agency",
      location: "Mohakhali,Dhaka",
      period: "Nov 2024 - Present",
      description:
        "Led the development of multiple high-traffic web applications using React and TypeScript. Mentored junior developers and implemented best practices for code quality and performance optimization.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led a team of 5 developers on key product features",
        "Implemented automated testing that reduced bugs by 60%",
      ],
      technologies: ["React", "TypeScript", "Next.js", "Api", "AWS"],
      type: "current",
    },
    {
      title: "Frontend Developer",
      company: "AmromedLLC",
      location: "Remote",
      period: "Apr 2023 – Sep 2024",
      description:
        "Developed responsive web applications from scratch and collaborated with design teams to implement pixel-perfect UI components.",
      achievements: [
        "Built 1 major product features from concept to deployment",
        "Reduced load times by 50% through performance optimization",
        "Created reusable component library used across teams",
      ],
      technologies: ["React", "Vue.js", "SASS", "Node.js", "MongoDB"],
      type: "previous",
    },
    // {
    //   title: "Junior Web Developer",
    //   company: "Digital Agency Pro",
    //   location: "New York, NY",
    //   period: "Jun 2018 - Feb 2020",
    //   description:
    //     "Worked on various client projects including e-commerce websites, corporate sites, and web applications. Gained experience in multiple technologies and frameworks.",
    //   achievements: [
    //     "Delivered 20+ client projects on time and within budget",
    //     "Learned and implemented modern JavaScript frameworks",
    //     "Contributed to agency's internal tools and processes",
    //   ],
    //   technologies: ["JavaScript", "PHP", "WordPress", "Bootstrap", "jQuery"],
    //   type: "previous",
    // },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Daffodil International University, Dhaka",
      period: "2018 - 2023",
      description:
        "Focused on web technologies, algorithms, and software engineering principles.",
      gpa: "cgpa is a mith!",
    },
    {
      degree: "Frontend Development Bootcamp",
      school: "General Assembly",
      period: "2018",
      description:
        "Intensive 12-week program covering modern frontend development practices.",
      certification: "Certificate of Completion",
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
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            >
              Experience & Education
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              My professional journey and educational background
            </motion.p>
          </motion.div>

          <div className="space-y-12 lg:space-y-16">
            {/* Work Experience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase className="h-6 w-6 text-white" />
                </motion.div>
                Work Experience
              </motion.h3>

              <div className="space-y-6 sm:space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl relative overflow-hidden">
                      <motion.div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          exp.type === "current"
                            ? "bg-gradient-to-b from-green-500 to-blue-500"
                            : "bg-gradient-to-b from-blue-500 to-purple-500"
                        }`}
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />

                      <CardHeader className="pb-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <CardTitle className="text-xl sm:text-2xl mb-2 flex items-center gap-2">
                                {exp.title}
                                {exp.type === "current" && (
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                    }}
                                  >
                                    <Badge className="bg-green-500 text-white">
                                      Current
                                    </Badge>
                                  </motion.div>
                                )}
                              </CardTitle>
                            </motion.div>
                            <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col sm:items-end space-y-2">
                            <motion.div
                              className="flex items-center text-gray-600 dark:text-gray-400"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              <span className="text-sm sm:text-base">
                                {exp.period}
                              </span>
                            </motion.div>
                            <motion.div
                              className="flex items-center text-gray-600 dark:text-gray-400"
                              whileHover={{ scale: 1.05 }}
                            >
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm sm:text-base">
                                {exp.location}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {exp.description}
                        </p>

                        <div>
                          <motion.h4
                            className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            Key Achievements:
                          </motion.h4>
                          <ul className="space-y-2">
                            {exp.achievements.map(
                              (achievement, achievementIndex) => (
                                <motion.li
                                  key={achievementIndex}
                                  className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base"
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: achievementIndex * 0.1 }}
                                >
                                  <motion.div
                                    className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: achievementIndex * 0.2,
                                    }}
                                  />
                                  {achievement}
                                </motion.li>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={techIndex}
                              initial={{ scale: 0, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: techIndex * 0.05,
                                type: "spring",
                                stiffness: 200,
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge
                                variant="secondary"
                                className="hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap className="h-6 w-6 text-white" />
                </motion.div>
                Education
              </motion.h3>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-white dark:bg-gray-900 relative overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />

                      <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="text-base font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          {edu.school} • {edu.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                          {edu.description}
                        </p>
                        {edu.gpa && (
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              GPA: {edu.gpa}
                            </Badge>
                          </motion.div>
                        )}
                        {edu.certification && (
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                          >
                            <Badge
                              variant="outline"
                              className="text-blue-600 border-blue-600"
                            >
                              {edu.certification}
                            </Badge>
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
