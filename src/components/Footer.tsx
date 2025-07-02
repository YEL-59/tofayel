import { Heart, Code, ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#3b82f6",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.footer
      className="bg-gray-900 dark:bg-gray-950 text-white py-12 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 text-blue-400/20"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-purple-400/20"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Code className="h-10 w-10" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            variants={footerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Sarah Johnson
              </motion.h3>
              <motion.p 
                className="text-gray-400 mb-4 text-sm sm:text-base leading-relaxed"
                variants={itemVariants}
              >
                Frontend Developer passionate about creating beautiful and functional web experiences.
              </motion.p>
              <motion.p 
                className="text-gray-400 text-sm sm:text-base"
                variants={itemVariants}
              >
                Let's build something amazing together.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h4 
                className="font-semibold mb-4 text-base sm:text-lg"
                whileHover={{ x: 5 }}
              >
                Quick Links
              </motion.h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  { href: "#about", label: "About" },
                  { href: "#skills", label: "Skills" },
                  { href: "#projects", label: "Projects" },
                  { href: "#contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.li
                    key={link.label}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="hover:text-white transition-colors text-sm sm:text-base"
                      variants={linkVariants}
                      whileHover="hover"
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.h4 
                className="font-semibold mb-4 text-base sm:text-lg"
                whileHover={{ x: 5 }}
              >
                Connect
              </motion.h4>
              <ul className="space-y-3 text-gray-400">
                {[
                  { href: "mailto:sarah@example.com", label: "sarah@example.com" },
                  { href: "https://github.com", label: "GitHub" },
                  { href: "https://linkedin.com", label: "LinkedIn" },
                  { href: "https://twitter.com", label: "Twitter" }
                ].map((link, index) => (
                  <motion.li
                    key={link.label}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="hover:text-white transition-colors text-sm sm:text-base"
                      variants={linkVariants}
                      whileHover="hover"
                    >
                      {link.label}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="border-t border-gray-800 pt-8"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.p 
                className="text-gray-400 text-sm text-center sm:text-left"
                variants={itemVariants}
              >
                © {currentYear} Sarah Johnson. All rights reserved.
              </motion.p>
              
              <motion.div 
                className="flex items-center text-gray-400 text-sm gap-4"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mx-1"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </motion.div>
                  <span>and</span>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="ml-1"
                  >
                    <Code className="h-4 w-4" />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}