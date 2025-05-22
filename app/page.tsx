import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Certificates from "@/components/certificates";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <main className="relative z-10">
        <section id="hero" className="relative">
          <Hero />
        </section>
        
        <section id="about" className="py-16 md:py-24 bg-secondary/30">
          <About />
        </section>
        
        <section id="skills" className="py-16 md:py-24">
          <Skills />
        </section>
        
        <section id="projects" className="py-16 md:py-24 bg-secondary/30">
          <Projects />
        </section>
        
        <section id="certificates" className="py-16 md:py-24">
          <Certificates />
        </section>

        <section id="contact" className="py-16 md:py-24">
          <Contact />
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
}