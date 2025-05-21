"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6,
        delay: 0.15 + (index * 0.12)
      }
    })
  };

  const hoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with user authentication, product management, cart functionality, and payment integration.",
      image: "/ecommerce-placeholder.jpg",
      tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      github: "#",
      demo: "#",
    },
    {
      title: "ML Image Classifier",
      description: "A machine learning model that classifies images into different categories with high accuracy using convolutional neural networks.",
      image: "/ml-placeholder.jpg",
      tags: ["Python", "TensorFlow", "Keras", "NumPy", "Matplotlib"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description: "A responsive task management application with features like task creation, assignment, due dates, and progress tracking.",
      image: "/taskmgmt-placeholder.jpg",
      tags: ["React", "Firebase", "Tailwind CSS", "Context API"],
      github: "#",
      demo: "#",
    },
    {
      title: "Algorithm Visualizer",
      description: "An interactive web application that visualizes various sorting and pathfinding algorithms to help understand their working.",
      image: "/algo-placeholder.jpg",
      tags: ["JavaScript", "HTML", "CSS", "Data Structures", "Algorithms"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-float-delayed" />
      </div>
      
      <div className="container px-4 sm:px-6">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="inline-flex px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 shadow-sm"
            variants={itemVariants}
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            My Work Portfolio
          </motion.div>
          
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Featured Projects
            </h2>
            <p className="max-w-[800px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Explore my collection of work that demonstrates technical expertise and creative problem-solving.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              whileHover="hover"
            >
              <motion.div variants={hoverVariants}>
                <Card className="overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full flex flex-col group">
                  <div className="relative h-[220px] w-full overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      className="object-cover transition-all duration-500 ease-out group-hover:scale-105" 
                      priority={index < 2} // Prioritize loading first two images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/0 group-hover:bg-primary/50 transition-all duration-500" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="bg-background/80 text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-border/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border/30 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="gap-1.5 rounded-full border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                    >
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Source Code
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      asChild 
                      className="gap-1.5 rounded-full bg-primary/90 hover:bg-primary transition-colors shadow-sm hover:shadow-primary/30"
                    >
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button 
            variant="outline" 
            asChild 
            className="gap-2 px-6 py-5 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors group"
          >
            <Link href="https://github.com/prashanth-s-23" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-base">View Full Portfolio on GitHub</span>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md mx-auto mt-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isVisible ? { opacity: 0.75, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "anticipate" }}
        />
      </div>
    </section>
  );
}