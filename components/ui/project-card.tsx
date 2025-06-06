"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"

export interface ProjectCardProps {
  title: string
  description: string
  image: string
  tag: string
  tagType: "developer" | "design" | "data" | "ai" | "ecommerce"
  websiteUrl?: string
  githubUrl?: string
  isActive: boolean
  direction: "left" | "right"
  technologies?: string[] // Add this new property
}

const ProjectCard = ({
  title,
  description,
  image,
  tag,
  tagType,
  websiteUrl,
  githubUrl,
  isActive,
  direction,
  technologies = [], // Add default empty array
}: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false)
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()

  // Optimización para modo claro
  const cardBgClass = resolvedTheme === "dark" ? "bg-card" : "bg-card/95" // Ligeramente más opaco en modo claro para mejor rendimiento

  // Obtener el color de la etiqueta según el tipo
  const getTagColor = () => {
    switch (tagType) {
      case "developer":
        return "bg-blue-600/90 text-white"
      case "design":
        return "bg-purple-600/90 text-white"
      case "data":
        return "bg-green-600/90 text-white"
      case "ai":
        return "bg-amber-600/90 text-white"
      case "ecommerce":
        return "bg-pink-600/90 text-white"
      default:
        return "bg-gray-600/90 text-white"
    }
  }

  return (
    <div
      className={cn(
        "relative w-full max-w-sm mx-auto rounded-xl overflow-hidden glass-card transition-all duration-500 h-[450px] border border-border",
        isActive
          ? direction === "left"
            ? "animate-[slide-left_0.5s_ease-out_forwards]"
            : "animate-[slide-right_0.5s_ease-out_forwards]"
          : "opacity-0",
        hovered ? "shadow-lg" : "",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-52 overflow-hidden transition-all duration-500">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500",
            hovered ? "opacity-80" : "opacity-70",
          )}
        />
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            hovered ? "filter brightness-70 scale-105" : "",
          )}
          loading="lazy"
        />
      </div>

      {/* Etiqueta con clases Tailwind directas */}
      <div
        className={cn(
          "absolute top-6 left-6 px-3 py-1.5 text-xs font-medium rounded-md shadow-md z-10 transition-transform duration-300",
          getTagColor(),
          hovered ? "transform -translate-y-1" : "",
        )}
      >
        {tag}
      </div>

      <div
        className={cn(
          `p-6 ${cardBgClass} relative z-10 transition-transform duration-500`,
          hovered ? "transform -translate-y-16" : "",
        )}
      >
        <h3 className="text-xl font-bold mb-2 glitch-effect" data-text={title}>
          {title}
        </h3>

        <div
          className={cn(
            "overflow-hidden transition-all duration-500",
            hovered ? "h-auto max-h-[calc(100%-80px)]" : "h-16",
          )}
        >
          <p className={cn("text-muted-foreground text-sm mb-4", hovered ? "" : "line-clamp-2")}>{description}</p>

          {hovered && (
            <div className="animate-fade-in">
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs rounded-md bg-primary/10 text-primary text-sharp transition-colors hover:bg-primary/20 mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                {websiteUrl && (
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{language === "es" ? "Ver sitio" : "View site"}</span>
                  </a>
                )}

                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
