"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"
import ProjectCard from "./project-card"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tag: string
  tagType: "developer" | "design" | "data" | "ai" | "ecommerce"
  websiteUrl?: string
  githubUrl?: string
  technologies?: string[]
}

interface ProjectCarouselProps {
  projects: Project[]
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const { t, language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [transitioning, setTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // For small screens show 1, for medium screens show 2, for large screens show 3
  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1280) return 3
      if (window.innerWidth >= 768) return 2
      return 1
    }
    return 1
  }

  const [visibleCount, setVisibleCount] = useState(1) // Default to 1 for SSR

  useEffect(() => {
    setVisibleCount(getVisibleCount())

    const handleResize = () => {
      setVisibleCount(getVisibleCount())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setTimeout(() => setTransitioning(false), 500)
  }, [transitioning, projects.length])

  const prevSlide = useCallback(() => {
    if (transitioning) return
    setTransitioning(true)
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setTimeout(() => setTransitioning(false), 500)
  }, [transitioning, projects.length])

  // Get the visible projects based on the current index and visible count
  const getVisibleProjects = useCallback(() => {
    const visibleProjects = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % projects.length
      visibleProjects.push({
        ...projects[index],
        isActive: true,
        direction: i === 0 ? direction : "right",
      })
    }
    return visibleProjects
  }, [currentIndex, visibleCount, projects, direction])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && !transitioning) {
      nextSlide()
    }

    if (isRightSwipe && !transitioning) {
      prevSlide()
    }

    // Reset values
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Go directly to a specific slide
  const goToSlide = (index: number) => {
    if (transitioning || index === currentIndex) return
    setTransitioning(true)
    setDirection(index < currentIndex ? "left" : "right")
    setCurrentIndex(index)
    setTimeout(() => setTransitioning(false), 500)
  }

  // Calculate which indicators should be visible
  const getVisibleIndicators = () => {
    const totalProjects = projects.length

    // On mobile show max 5 indicators
    if (visibleCount === 1 && totalProjects > 5) {
      const start = Math.max(0, Math.min(currentIndex - 2, totalProjects - 5))
      return Array.from({ length: 5 }, (_, i) => i + start)
    }

    return Array.from({ length: totalProjects }, (_, i) => i)
  }

  return (
    <div
      className="w-full py-10"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-title">
            <span className="text-glow">{t("portfolio.title")}</span>
          </h2>

          {/* Improved navigation buttons */}
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              disabled={transitioning}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors disabled:opacity-50"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              disabled={transitioning}
              className="p-3 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors disabled:opacity-50"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {getVisibleProjects().map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                title={project.title}
                description={project.description}
                image={project.image}
                tag={project.tag}
                tagType={project.tagType}
                websiteUrl={project.websiteUrl}
                githubUrl={project.githubUrl}
                isActive={project.isActive}
                direction={project.direction as "left" | "right"}
                technologies={project.technologies}
              />
            ))}
          </div>
        </div>

        <div className="md:hidden text-center text-xs text-muted-foreground mt-4">
          <span>← {language === "es" ? "Desliza para navegar" : "Swipe to navigate"} →</span>
        </div>

        {/* Improved pagination indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {getVisibleIndicators().map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-colors duration-300 ${
                currentIndex === index ? "w-8 bg-primary shadow-glow" : "w-2 bg-primary/40 hover:bg-primary/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            >
              <span className="sr-only">{`Slide ${index + 1}`}</span>
            </button>
          ))}
        </div>

        {/* Current slide indicator */}
        <div className="text-center mt-2 text-xs font-medium text-muted-foreground">
          <span>
            {currentIndex + 1} / {projects.length}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCarousel
