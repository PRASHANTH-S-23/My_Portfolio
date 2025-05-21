"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["C/C++", "Python", "JavaScript", "TypeScript", "HTML", "CSS"],
    },
    {
      category: "Frontend Development",
      skills: ["React.js", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Express.js", "Flask", "RESTful APIs"],
    },
    {
      category: "Database",
      skills: ["MongoDB", "MySQL"],
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "Vercel"],
    },
    {
      category: "Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Data Visualization"],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills" className="container py-24 sm:py-32 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-secondary/50 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center relative z-10"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Skills & Technologies
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-2xl/relaxed lg:text-2l/relaxed">
            Here are some of the technologies and tools I've worked with.
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onMouseEnter={() => setHoveredCategory(null)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Card className="h-full border-2 border-border/50 transition-all duration-300 overflow-hidden bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  
                  <h3 className="text-1.5xl font-bold">{category.category}</h3>
                </div>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  initial="hidden"
                  animate={hoveredCategory === index ? "show" : "hidden"}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={{
                        hidden: { scale: 0.8, opacity: 0.8 },
                        show: { scale: 1, opacity: 1 }
                      }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-0.5xl font-medium py-1 px-3 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}