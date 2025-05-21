"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Trophy } from "lucide-react"
import { useState, useEffect } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(true); // Changed to true by default
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    // Set visible immediately
    setIsVisible(true);
    
    // Improved intersection observer implementation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animation class and make sure the element is visible
          entry.target.classList.add('animate-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); // Adjusted threshold and added rootMargin
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      // Set initial state more explicitly
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'all 0.8s ease-out';
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="container py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* About Me Header Section */}
      <div className={`flex flex-col items-center justify-center space-y-6 text-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 blur opacity-70"></div>
          <h2 className="relative text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            About Me
          </h2>
        </div>
        
        <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl/relaxed">
          I'm a Computer Science Engineering undergraduate with a passion for solving complex problems and
          building innovative solutions.
        </p>
        
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full mt-4"></div>
      </div>
      
      {/* About Me Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {/* First Card - Full-Stack Developer */}
        <div 
          className="animate-on-scroll opacity-0 card-animate"
          style={{ transitionDelay: "100ms" }}
          onMouseEnter={() => setActiveCard(0)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <Card className={`h-full overflow-hidden transition-all duration-300 ease-in-out border border-primary/10 ${activeCard === 0 ? 'shadow-lg shadow-primary/20 scale-105' : 'hover:shadow-md hover:shadow-primary/10 hover:scale-103'}`}>
            <CardContent className="flex flex-col items-center text-center p-8 h-full">
              <div className="mb-2 p-3 rounded-full bg-primary/10 transition-all duration-300 transform hover:scale-110">
                <Code className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Full-Stack Developer
              </h3>
              <p className="text-muted-foreground text-lg">
                I build responsive and performant web applications using modern technologies and frameworks.
              </p>
            </CardContent>
          </Card>
        </div>
          
        {/* Second Card - ML Enthusiast */}
        <div 
          className="animate-on-scroll opacity-0 card-animate"
          style={{ transitionDelay: "300ms" }}
          onMouseEnter={() => setActiveCard(1)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <Card className={`h-full overflow-hidden transition-all duration-300 ease-in-out border border-primary/10 ${activeCard === 1 ? 'shadow-lg shadow-primary/20 scale-105' : 'hover:shadow-md hover:shadow-primary/10 hover:scale-103'}`}>
            <CardContent className="flex flex-col items-center text-center p-8 h-full">
              <div className="mb-2 p-3 rounded-full bg-primary/10 transition-all duration-300 transform hover:scale-110">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                ML Enthusiast
              </h3>
              <p className="text-muted-foreground text-lg">
                I explore machine learning algorithms and models to solve real-world problems and extract insights from data.
              </p>
            </CardContent>
          </Card>
        </div>
          
        {/* Third Card - Problem Solver */}
        <div 
          className="animate-on-scroll opacity-0 card-animate"
          style={{ transitionDelay: "500ms" }}
          onMouseEnter={() => setActiveCard(2)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <Card className={`h-full overflow-hidden transition-all duration-300 ease-in-out border border-primary/10 ${activeCard === 2 ? 'shadow-lg shadow-primary/20 scale-105' : 'hover:shadow-md hover:shadow-primary/10 hover:scale-103'}`}>
            <CardContent className="flex flex-col items-center text-center p-8 h-full">
              <div className="mb-2 p-3 rounded-full bg-primary/10 transition-all duration-300 transform hover:scale-110">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                Problem Solver
              </h3>
              <p className="text-muted-foreground text-lg">
                I've solved 400+ problems on LeetCode, honing my skills in data structures and algorithms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Journey Section */}
      <div className="mt-24 space-y-6 animate-on-scroll opacity-0 journey-animate">
        <div className="relative flex justify-center">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur opacity-70"></div>
          <h3 className="relative text-3xl font-bold text-center">My Journey</h3>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent top-0"></div>
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent bottom-0"></div>
          <p className="text-muted-foreground text-center max-w-[900px] mx-auto text-lg py-8">
            I started my programming journey during my first year of college and quickly fell in love with the process of building software. Over the years, I've worked on various projects, from web applications to machine learning models, constantly expanding my skill set and knowledge. I'm passionate about learning new technologies and applying them to create impactful solutions.
          </p>
        </div>
      </div>

      {/* Add some CSS to ensure animations work properly */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .card-animate {
          transition: all 0.8s ease-out;
        }
        
        .journey-animate {
          transition: all 0.9s ease-out;
          transition-delay: 600ms;
        }
      `}</style>
    </section>
  )
}