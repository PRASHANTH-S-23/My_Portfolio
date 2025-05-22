"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon } from "lucide-react"
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
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { toast } = useToast()

  // Navigation items array
  const navItems: NavItem[] = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ]

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(systemPrefersDark)
    }
  }, [])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const headerBgClass = isDarkMode 
    ? (isScrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50" : "bg-slate-900")
    : (isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50" : "bg-white")

  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const logoGradientClass = isDarkMode 
    ? "bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent"
    : "bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text text-transparent"

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out
          ${headerBgClass}
          ${isScrolled ? "h-16 shadow-lg" : "h-20"}
        `}
      >
        <div className="container flex items-center justify-between px-4 md:px-8 h-full">
          <Link 
            href="#home" 
            className={`text-xl md:text-2xl tracking-widest font-copper transition-all duration-300 ${logoGradientClass} hover:scale-105`}
          >
            Prashanth Kumar S
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex gap-6 items-center ${textClass}`}>
            <ul className="flex gap-6 items-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm font-medium relative transition-all duration-200 hover:scale-105 ${
                      isDarkMode 
                        ? "hover:text-white hover:underline decoration-white decoration-2 underline-offset-4" 
                        : "hover:text-gray-900 hover:underline decoration-gray-900 decoration-2 underline-offset-4"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle Button */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={`w-9 h-9 transition-all duration-200 hover:scale-110 ${
                isDarkMode 
                  ? "text-white hover:bg-slate-800 hover:text-yellow-400" 
                  : "text-gray-900 hover:bg-gray-100 hover:text-orange-500"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              onClick={handleResumeClick}
              variant="outline"
              className={`transition-all duration-200 hover:scale-105 ml-2 ${
                isDarkMode 
                  ? "border-white text-white hover:bg-white hover:text-slate-900" 
                  : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              }`}
            >
              Resume
            </Button>
          </nav>

          {/* Mobile Navigation Toggle and Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className={`w-9 h-9 transition-all duration-200 ${
                isDarkMode 
                  ? "text-white hover:bg-slate-800 hover:text-yellow-400" 
                  : "text-gray-900 hover:bg-gray-100 hover:text-orange-500"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              className={`p-2 transition-all duration-200 ${textClass}`}
              size="icon" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}
      <div 
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-full z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden ${
          isDarkMode ? "bg-slate-900 border-l border-slate-800" : "bg-white border-l border-gray-200"
        } shadow-xl`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            isDarkMode ? "border-slate-800" : "border-gray-200"
          }`}>
            <span className={`text-lg font-semibold ${textClass}`}>
              Navigation
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={closeMenu}
              className={`${textClass} hover:bg-opacity-10`}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-3 px-4 text-base font-medium transition-all duration-200 rounded-lg ${
                      isDarkMode 
                        ? "text-white hover:bg-slate-800 active:bg-slate-700" 
                        : "text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Resume Button */}
            <div className="mt-6 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}">
              <Button
                onClick={() => {
                  handleResumeClick();
                  closeMenu();
                }}
                variant="outline"
                className={`w-full transition-all duration-200 ${
                  isDarkMode 
                    ? "border-white text-white hover:bg-white hover:text-slate-900" 
                    : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                }`}
              >
                Download Resume
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}