"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code, Cpu, Database, Server, Palette, BrainCircuit } from "lucide-react";

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["C/C++", "Python", "JavaScript", "TypeScript", "HTML", "CSS"],
      icon: Code,
      color: "text-blue-500"
    },
    {
      category: "Frontend Development",
      skills: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
      icon: Palette,
      color: "text-purple-500"
    },
    {
      category: "Backend Development",
      skills: ["Node.js", "Express.js", "Flask", "RESTful APIs", "GraphQL"],
      icon: Server,
      color: "text-green-500"
    },
    {
      category: "Database",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Prisma"],
      icon: Database,
      color: "text-orange-500"
    },
    {
      category: "DevOps & Tools",
      skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Linux"],
      icon: Cpu,
      color: "text-red-500"
    },
    {
      category: "Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Data Visualization"],
      icon: BrainCircuit,
      color: "text-pink-500"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardItem = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const skillItem = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <section 
      id="skills" 
      className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div 
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/30 blur-[100px]"
        />
        <motion.div 
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/30 blur-[100px]"
        />
      </motion.div>

      {/* Section header */}
      <div className="container px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center relative z-10"
        >
          <div className="space-y-4">
            <Badge variant="outline" className="px-4 py-1.5 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
              Technical Expertise
            </Badge>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
              Skills & Technologies
            </h2>
            <p className="max-w-[800px] mx-auto text-lg text-muted-foreground md:text-xl/relaxed">
              My toolkit for building exceptional digital experiences. Continuously expanding as I explore new technologies.
            </p>
          </div>
        </motion.div>

        {/* Skills grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={cardItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 ${
                  hoveredCategory === index ? 'opacity-30' : ''
                } ${
                  index % 6 === 0 ? "bg-blue-500" :
                  index % 5 === 0 ? "bg-purple-500" :
                  index % 4 === 0 ? "bg-green-500" :
                  index % 3 === 0 ? "bg-orange-500" :
                  index % 2 === 0 ? "bg-red-500" :
                  "bg-pink-500"
                }`} />
                
                <Card className={`relative h-full border border-border/50 transition-all duration-300 overflow-hidden bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl ${
                  hoveredCategory === index ? "ring-2 ring-primary/50" : ""
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`p-2 rounded-lg ${category.color} bg-opacity-10`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">{category.category}</h3>
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
                          variants={skillItem}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge 
                            variant="outline" 
                            className={`text-sm font-medium py-1.5 px-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground ${
                              hoveredCategory === index ? "shadow-sm" : ""
                            }`}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-float-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/10 blur-3xl animate-float-slow animation-delay-4000"></div>
      </div>
    </section>
  );
}