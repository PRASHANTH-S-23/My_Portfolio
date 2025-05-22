"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Trophy, Sparkles, Zap, Target, Brain, Cpu, Award } from "lucide-react"
import { useState, useEffect } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      elements.forEach(el => observer.unobserve(el));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cardData = [
    {
      icon: Code,
      title: "Full-Stack Developer",
      description: "I build responsive and performant web applications using modern technologies and frameworks.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      delay: "100ms"
    },
    {
      icon: Brain,
      title: "ML Enthusiast",
      description: "I explore machine learning algorithms and models to solve real-world problems and extract insights from data.",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      delay: "300ms"
    },
    {
      icon: Award,
      title: "Problem Solver",
      description: "I've solved 400+ problems on LeetCode, honing my skills in data structures and algorithms.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      delay: "500ms"
    }
  ];

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-float-${i + 1}`}
      style={{
        left: `${20 + (i * 15)}%`,
        top: `${10 + (i * 10)}%`,
        animationDelay: `${i * 0.5}s`,
      }}
    />
  ));

  return (
    <section 
      id="about" 
      className="relative container py-24 sm:py-32 overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements}
        
        {/* Dynamic gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            right: '10%',
            bottom: '20%',
          }}
        />
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header Section with Enhanced Animations */}
      <div 
        className={`flex flex-col items-center justify-center space-y-8 text-center transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <div className="relative group">
          {/* Animated background glow */}
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
          
          {/* Main gradient background */}
          <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 blur-lg opacity-70 animate-gradient-shift"></div>
          
          <h2 className="relative text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient-text">
            About Me
            <Sparkles className="inline-block ml-4 w-8 h-8 text-primary animate-spin-slow" />
          </h2>
        </div>
        
        <div className="relative max-w-4xl">
          <p className="text-muted-foreground text-lg md:text-xl/relaxed leading-relaxed animate-fade-in-up">
            I'm a <span className="text-primary font-semibold">Computer Science Engineering</span> undergraduate with a passion for solving complex problems and
            building innovative solutions that make a difference.
          </p>
        </div>
        
        {/* Enhanced decorative line */}
        <div className="relative w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary animate-shimmer"></div>
        </div>
      </div>
      
      {/* Enhanced Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        {cardData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              className="animate-on-scroll opacity-0 transform translate-y-8"
              style={{ 
                transitionDelay: card.delay,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <Card className={`
                group h-full overflow-hidden transition-all duration-500 ease-out
                border border-primary/20 backdrop-blur-sm
                ${activeCard === index 
                  ? 'shadow-2xl shadow-primary/25 scale-105 -translate-y-2' 
                  : 'hover:shadow-xl hover:shadow-primary/15 hover:scale-102 hover:-translate-y-1'
                }
                bg-gradient-to-br ${card.bgGradient} hover:bg-gradient-to-tl
                relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
              `}>
                <CardContent className="relative flex flex-col items-center text-center p-8 h-full">
                  {/* Animated icon container */}
                  <div className={`
                    relative mb-6 p-4 rounded-2xl transition-all duration-500 transform
                    bg-gradient-to-br ${card.bgGradient}
                    ${activeCard === index ? 'scale-110 rotate-3' : 'group-hover:scale-105 group-hover:-rotate-1'}
                    border border-white/10 backdrop-blur-sm
                  `}>
                    {/* Icon glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                    
                    <Icon className={`relative h-12 w-12 text-transparent transition-all duration-300 ${
                      activeCard === index ? 'animate-pulse' : ''
                    }`} 
                    style={{
                      background: `linear-gradient(to right, ${card.gradient.includes('blue') ? '#3b82f6, #06b6d4' : card.gradient.includes('purple') ? '#8b5cf6, #ec4899' : '#f97316, #ef4444'})`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text'
                    }}
                    />
                    
                    {/* Add a fallback solid color version */}
                    <Icon className={`absolute inset-0 h-12 w-12 opacity-50 ${
                      card.gradient.includes('blue') ? 'text-blue-500' : 
                      card.gradient.includes('purple') ? 'text-purple-500' : 'text-orange-500'
                    }`} />
                    
                    {/* Floating particles around icon */}
                    {activeCard === index && (
                      <>
                        <Zap className="absolute -top-2 -right-2 w-4 h-4 text-primary animate-ping" />
                        <Target className="absolute -bottom-2 -left-2 w-4 h-4 text-primary animate-ping" style={{ animationDelay: '0.5s' }} />
                      </>
                    )}
                  </div>
                  
                  <h3 className={`
                    text-2xl font-bold mb-4 transition-all duration-300
                    bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}
                    ${activeCard === index ? 'animate-pulse' : ''}
                  `}>
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg leading-relaxed transition-all duration-300 group-hover:text-foreground/90">
                    {card.description}
                  </p>
                  
                  {/* Card hover indicator */}
                  <div className={`
                    absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}
                    transform transition-all duration-300 ease-out
                    ${activeCard === index ? 'scale-x-100' : 'scale-x-0'}
                  `}></div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      
      {/* Enhanced Journey Section */}
      <div className="relative mt-32 space-y-8 animate-on-scroll opacity-0 transform translate-y-8">
        <div className="relative flex justify-center group">
          {/* Multiple layered glows */}
          <div className="absolute -inset-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 blur-lg opacity-70 animate-pulse-slow"></div>
          
          <h3 className="relative text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            My Journey
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </h3>
        </div>
        
        <div className="relative group max-w-4xl mx-auto">
          {/* Enhanced border animations */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" style={{ animationDelay: '1s' }}></div>
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-shimmer" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Content with enhanced background */}
          <div className="relative backdrop-blur-sm bg-gradient-to-br from-background/80 to-background/60 rounded-2xl p-8 border border-primary/10">
            <p className="text-muted-foreground text-center text-lg leading-relaxed group-hover:text-foreground/90 transition-all duration-500">
              I started my programming journey during my first year of college and quickly fell in love with the process of building software. 
              Over the years, I've worked on various projects, from <span className="text-primary font-medium">web applications</span> to 
              <span className="text-primary font-medium"> machine learning models</span>, constantly expanding my skill set and knowledge. 
              I'm passionate about learning new technologies and applying them to create <span className="text-primary font-medium">impactful solutions</span>.
            </p>
          </div>
          
          {/* Floating accent elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full blur-sm animate-float-1"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/40 rounded-full blur-sm animate-float-2"></div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(90deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-90deg); }
        }
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(270deg); }
        }
        @keyframes float-6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(-270deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 3.5s ease-in-out infinite; }
        .animate-float-4 { animation: float-4 4.5s ease-in-out infinite; }
        .animate-float-5 { animation: float-5 2.5s ease-in-out infinite; }
        .animate-float-6 { animation: float-6 5s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 4s ease infinite; background-size: 200% 200%; }
        .animate-gradient-text { animation: gradient-text 3s ease infinite; background-size: 200% 200%; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        
        .scale-102 { transform: scale(1.02); }
        .scale-103 { transform: scale(1.03); }
      `}</style>
    </section>
  )
}