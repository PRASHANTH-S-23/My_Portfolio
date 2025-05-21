"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Twitter, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Define social links interface
interface SocialLink {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}

export default function Hero() {
  // Refs for scroll animations
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Transform scroll progress into usable values
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2])
  const headerScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  
  // Roles for text animation
  const roles = [
    "Full-Stack Developer",
    "ML Enthusiast",
    "Problem Solver",
    "UI/UX Designer"
  ]
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayRole, setDisplayRole] = useState(roles[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  // Social links array with color styling
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/prashanth-s-23",
      icon: <Github className="h-5 w-5" />,
      label: "GitHub Profile",
      color: "hover:text-[#333333] dark:hover:text-[#f0f6fc]"
    },
    {
      href: "https://linkedin.com/in/prashanth-kumar-s",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn Profile",
      color: "hover:text-[#0077B5]"
    },
    {
      href: "https://twitter.com/prashanth_dev",
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter Profile",
      color: "hover:text-[#1DA1F2]"
    },
    {
      href: "mailto:prashanthkumarsvpl@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      label: "Email Me",
      color: "hover:text-rose-500"
    }
  ]
  
  // Animation state for fade-in effect
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Set visible after component mounts for animation
    setIsVisible(true)
    
    // Role rotation effect
    const intervalId = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length)
        setDisplayRole(roles[(currentRoleIndex + 1) % roles.length])
        setIsAnimating(false)
      }, 500) // fade out time
    }, 3000) // rotation interval
    
    return () => clearInterval(intervalId)
  }, [currentRoleIndex, roles.length])

  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const roleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  // Floating animation for the profile image
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }

  // Shimmer effect for the badge
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-500px 0",
    },
    animate: {
      backgroundPosition: "500px 0",
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  }

  // Bounce animation for scroll indicator
  const bounceAnimation = {
    y: [0, 5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-2"
    >
      {/* Animated background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/30 to-transparent rounded-full blur-3xl" 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2/3 left-2/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" 
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:50px_50px] opacity-[0.015]" />
      </div>
      
      <div className="container relative z-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div 
          style={{ opacity: headerOpacity, scale: headerScale }}
          className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left column - Profile Image */}
          <motion.div 
            className="md:w-2/5 flex flex-col items-center md:items-start"
            variants={itemVariants}
          >
            <motion.div
              className="relative z-10 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl group"
              whileHover={{ scale: 1.05 }}
              animate={floatingAnimation}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Image 
                src="/your-photo.jpg" 
                alt="Prashanth Kumar S" 
                width={256}
                height={256}
                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-60" />
              
              {/* Animated ring on hover */}
              <motion.div 
                className="absolute inset-0 ring-4 ring-primary/50 ring-offset-2 ring-offset-transparent rounded-full"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
              />
            </motion.div>
            
            {/* Decorative circles around profile */}
            <motion.div 
              className="absolute top-1/2 left-1/4 -z-10 w-60 h-60 md:w-72 md:h-72 border-2 border-dashed border-primary/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:left-auto"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.7, rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/4 -z-10 w-72 h-72 md:w-80 md:h-80 border border-primary/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:top-auto md:left-auto"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.5, rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Social links */}
            <motion.div 
              className="flex gap-4 mt-8 md:justify-start"
              variants={itemVariants}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    asChild
                    className={`rounded-full bg-background/80 backdrop-blur-sm border border-primary/10 shadow-sm hover:shadow-md hover:bg-primary/10 transition-all duration-300 ${link.color}`}
                  >
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? "_blank" : undefined}
                      rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right column - Text content */}
          <motion.div 
            className="md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left"
            variants={containerVariants}
          >
            <motion.div className="mb-2" variants={itemVariants}>
              <motion.span 
                className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full overflow-hidden relative"
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.05 }}
              >
                Welcome to my portfolio
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                  variants={shimmerVariants}
                />
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-2"
              variants={itemVariants}
            >
              Hello, I'm <span className="text-primary relative inline-block">
                Prashanth Kumar S
              </span>
            </motion.h1>

            <motion.div 
              className="h-10 flex items-center justify-center md:justify-start mt-1 mb-3 w-full"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={displayRole}
                  className="text-xl md:text-2xl font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={roleVariants}
                  transition={{ duration: 0.5 }}
                >
                  {displayRole}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p 
              className="max-w-[700px] text-muted-foreground text-lg leading-relaxed mt-1"
              variants={itemVariants}
            >
              Passionate Computer Science undergraduate skilled in full-stack development, 
              machine learning, and algorithmic problem-solving. Driven to craft impactful 
              and scalable digital experiences that blend innovation with exceptional user experience.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6 w-full md:justify-start"
              variants={itemVariants}
            >
              <Button 
                asChild 
                size="lg" 
                className="gap-2 px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-primary/40"
              >
                <Link href="#projects" className="flex items-center">
                  View Projects 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild 
                size="lg" 
                className="gap-2 px-6 py-6 border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary/10 font-medium rounded-full transition-all duration-300"
              >
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="w-full max-w-md mt-10 h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full opacity-75"
              variants={itemVariants}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 0.75 }}
              transition={{ duration: 1, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator - Repositioned for side-by-side layout */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary/70 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <motion.div animate={bounceAnimation}>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}