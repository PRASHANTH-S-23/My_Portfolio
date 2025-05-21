"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Navigation item interface
interface NavItem {
  name: string
  href: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { toast } = useToast()

  // Navigation items array
  const navItems: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  // Toggle menu with accessibility improvements
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // Close menu when clicking on a link
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Handle resume download
  const handleResumeClick = useCallback(() => {
    toast({
      title: "Resume",
      description: "Resume download started!",
    })

    const link = document.createElement("a")
    link.href = "/PRASHANTH%20KUMAR%20S_1BY22CS136_BMSIT%26M.pdf"
    link.download = "PRASHANTH_KUMAR_S_1BY22CS136_BMSIT&M.pdf"
    link.setAttribute("type", "application/pdf")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [toast])

  // Handle scroll events with performance optimization
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial check for page load with scroll position
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  return (
    <header
      className={`sticky top-0 z-40 w-full flex items-center transition-colors duration-300 ease-in-out
        ${isScrolled 
          ? "bg-[#0f172a]/80 backdrop-blur-sm h-16 shadow-md" 
          : "bg-[#0f172a] h-20"
        }
      `}
    >
      <div className="container flex items-center justify-between px-4 md:px-8">
        <Link href="#home" className="text-2xl tracking-widest font-copper bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent">
          Prashanth Kumar S
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center text-white">
          <ul className="flex gap-6 items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium relative transition-colors hover:text-white"
                >
                  <span className="hover:underline decoration-white decoration-2 underline-offset-4">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Button
            onClick={handleResumeClick}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary transition-colors ml-2"
          >
            Resume
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <Button 
          variant="ghost" 
          className="md:hidden p-2 text-white" 
          size="icon" 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu - Using transitions */}
      <div 
        id="mobile-menu"
        className={`fixed top-[${isScrolled ? '4rem' : '5rem'}] left-0 right-0 bg-[#0f172a] border-b border-gray-700 z-50 shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="container py-4 text-white">
          <ul className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block py-2 px-4 text-sm font-medium transition-colors hover:bg-gray-800 rounded"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                onClick={() => {
                  handleResumeClick();
                  closeMenu();
                }}
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors"
              >
                Download Resume
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}