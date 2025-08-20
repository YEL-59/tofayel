import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "tofayeltuhin143@gmail.com",
      link: "mailto:tofayeltuhin143@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "01708901418",
      link: "tel:+01708901418",
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hatirjheel,dhaka",
      link: null,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/yel-59",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://linkedin.com",
      color: "hover:text-blue-600",
    },
    {
      icon: Twitter,
      label: "Medium",
      url: "https://medium.com/@tofayeltuhin143",
      color: "hover:text-blue-400",
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
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
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
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              I'm always open to discussing new opportunities and interesting
              projects
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="space-y-8" variants={itemVariants}>
              <div>
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="h-7 w-7 text-blue-600" />
                  </motion.div>
                  Let's Start a Conversation
                </motion.h3>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed"
                  variants={itemVariants}
                >
                  Whether you have a project in mind, want to collaborate, or
                  just want to say hello, I'd love to hear from you. Send me a
                  message and I'll respond as soon as possible.
                </motion.p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className={`bg-gradient-to-r ${info.color} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow`}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <info.icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                          {info.label}
                        </p>
                        {info.link ? (
                          <motion.a
                            href={info.link}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm sm:text-base"
                            whileHover={{ scale: 1.02 }}
                          >
                            {info.value}
                          </motion.a>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div className="pt-8" variants={itemVariants}>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-base sm:text-lg">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        className={`bg-gray-100 dark:bg-gray-800 p-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all group ${social.color}`}
                        aria-label={social.label}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -10, 10, 0],
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <social.icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-white dark:bg-gray-800 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                      "linear-gradient(45deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05))",
                      "linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Send className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    Send Message
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Fill out the form below and I'll get back to you within 24
                    hours.
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or just say hello..."
                        className="transition-all duration-300 focus:scale-105 resize-none"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="flex items-center gap-2"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <Clock className="h-4 w-4" />
                            Sending...
                          </motion.div>
                        ) : (
                          <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <Send className="h-4 w-4" />
                            Send Message
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
