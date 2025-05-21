import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

// Social link interface
interface SocialLink {
  href: string
  icon: React.ReactNode
  label: string
  external?: boolean
}

export default function Footer() {
  // Current year for copyright
  const currentYear = new Date().getFullYear()
  
  // Social links array for better maintainability
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/yourusername",
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      external: true
    },
    {
      href: "https://linkedin.com/in/yourusername",
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      external: true
    },
    {
      href: "https://twitter.com/yourusername",
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      external: true
    },
    {
      href: "mailto:prashanthkumarsvpl@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      label: "Email"
    },
  ]

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Prashanth Kumar S</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with passion and precision.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Quick links column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2">
                <li>
                  <Link href="/#home" className="text-sm hover:text-primary transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-sm hover:text-primary transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-sm hover:text-primary transition-colors duration-200">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-sm hover:text-primary transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Prashanth Kumar S. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}