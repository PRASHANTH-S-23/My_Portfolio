"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar, Building2, Eye, X, Sparkles, BookOpen, ShieldCheck, Cloud } from "lucide-react"

interface Certificate {
  id: string
  title: string
  issuer: string
  issueDate: string
  credentialId?: string
  credentialUrl?: string
  skills: string[]
  description: string
  imageUrl: string
  category: "technical" | "cloud" | "certification" | "course"
}

const certificates: Certificate[] = [
  // Your certificate data here
]

const categories = [
  { id: "all", label: "All", icon: Sparkles, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "cloud", label: "Cloud", icon: Cloud, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "technical", label: "Technical", icon: Award, color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "certification", label: "Certifications", icon: ShieldCheck, color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { id: "course", label: "Courses", icon: BookOpen, color: "bg-gradient-to-r from-violet-500 to-fuchsia-500" }
]

export default function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const filteredCertificates = selectedCategory === "all" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cloud":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "technical":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "certification":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "course":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="section-container">
        {/* Section Header with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-8 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
          
          <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary hover:bg-primary/15">
            <Sparkles className="w-4 h-4 mr-2" />
            Achievements
          </Badge>
          
          <h2 className="section-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4">
            Certificates & Credentials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and learning achievements that validate my expertise and commitment to continuous growth.
          </p>
        </div>

        {/* Animated Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            const isActive = selectedCategory === category.id
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 transition-all duration-200 hover:scale-105 ${isActive ? category.color : ""}`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
                {category.id !== "all" && (
                  <Badge variant={isActive ? "secondary" : "outline"} className="ml-1 text-xs">
                    {certificates.filter(cert => cert.category === category.id).length}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {filteredCertificates.map((certificate, index) => (
            <div 
              key={certificate.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(certificate.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-30 blur transition-opacity duration-300 ${
                certificate.category === "cloud" ? "from-blue-500 to-cyan-500" :
                certificate.category === "technical" ? "from-green-500 to-emerald-500" :
                certificate.category === "certification" ? "from-orange-500 to-amber-500" :
                "from-violet-500 to-fuchsia-500"
              }`} />
              
              <Card
                className={`relative group-hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card/70 backdrop-blur-sm border-border/30 overflow-hidden ${
                  hoveredCard === certificate.id ? "ring-2 ring-offset-2" : ""
                } ${
                  certificate.category === "cloud" ? "hover:ring-blue-500" :
                  certificate.category === "technical" ? "hover:ring-green-500" :
                  certificate.category === "certification" ? "hover:ring-orange-500" :
                  "hover:ring-violet-500"
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transform: hoveredCard === certificate.id ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
                  <img
                    src={certificate.imageUrl}
                    alt={certificate.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge 
                    className={`absolute top-4 left-4 z-20 ${getCategoryColor(certificate.category)}`}
                  >
                    {certificate.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-md"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {certificate.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{certificate.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Issued {certificate.issueDate}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {certificate.description}
                  </p>

                  {/* Skills with animated hover */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {certificate.skills.slice(0, 3).map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs transition-all hover:scale-105 hover:shadow-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions with subtle hover effects */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 transition-all hover:shadow-sm hover:bg-accent/50"
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {certificate.credentialUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="transition-all hover:shadow-sm hover:bg-accent/50"
                      >
                        <a 
                          href={certificate.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block mb-6">
              <Award className="w-16 h-16 text-muted-foreground mx-auto" />
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-md -z-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No certificates found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find any certificates matching your selected category. Try a different filter or check back later.
            </p>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => setSelectedCategory("all")}
            >
              Show all certificates
            </Button>
          </div>
        )}
      </div>

      {/* Enhanced Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-background border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl">
            {/* Close button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 z-10 rounded-full"
              onClick={() => setSelectedCertificate(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            {/* Image header with gradient overlay */}
            <div className="relative">
              <img
                src={selectedCertificate.imageUrl}
                alt={selectedCertificate.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <Badge 
                className={`absolute top-4 left-4 z-10 ${getCategoryColor(selectedCertificate.category)}`}
              >
                {selectedCertificate.category}
              </Badge>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
                {selectedCertificate.title}
              </h2>
              
              {/* Metadata grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Building2 className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Issued by</p>
                    <p className="text-muted-foreground">{selectedCertificate.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Date Earned</p>
                    <p className="text-muted-foreground">{selectedCertificate.issueDate}</p>
                  </div>
                </div>
              </div>

              {/* Credential ID with copy button */}
              {selectedCertificate.credentialId && (
                <div className="mb-6">
                  <p className="font-medium mb-2">Credential ID</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-muted px-3 py-1.5 rounded text-sm font-mono flex-1">
                      {selectedCertificate.credentialId}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedCertificate.credentialId || '')
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <p className="font-medium mb-2">About this certificate</p>
                <p className="text-muted-foreground">{selectedCertificate.description}</p>
              </div>

              {/* Skills with animated hover */}
              <div className="mb-8">
                <p className="font-medium mb-3">Skills Demonstrated</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline"
                      className="transition-all hover:scale-105 hover:shadow-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCertificate(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                {selectedCertificate.credentialUrl && (
                  <Button
                    asChild
                    className="flex-1"
                  >
                    <a 
                      href={selectedCertificate.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Credential
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}