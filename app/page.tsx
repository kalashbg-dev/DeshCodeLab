"use client"

import { useEffect, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Portfolio from "@/components/sections/portfolio"
import Services from "@/components/sections/services"
import Testimonials from "@/components/sections/testimonials"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import Navbar from "@/components/navigation/navbar"
import ScrollProgress from "@/components/ui/scroll-progress"
import LoadingScreen from "@/components/ui/loading-screen"
import FloatingElements from "@/components/ui/floating-elements"
import CursorFollower from "@/components/ui/cursor-follower"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

// Enhanced loading placeholder with skeleton
const SectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-4xl mx-auto px-4">
      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-1/2"></div>
    </div>
  </div>
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <SectionSkeleton />
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <div ref={containerRef} className="relative">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.main
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden"
              >
                {/* Enhanced Navigation */}
                <Navbar />

                {/* Scroll Progress */}
                <ScrollProgress />

                {/* Floating Background Elements */}
                <FloatingElements />

                {/* Custom Cursor */}
                <CursorFollower />

                {/* Page Sections */}
                <Suspense fallback={<SectionSkeleton />}>
                  <Hero />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <About />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Skills />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Portfolio />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Services />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Testimonials />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Contact />
                </Suspense>

                <Suspense fallback={<SectionSkeleton />}>
                  <Footer />
                </Suspense>

                {/* Toast Notifications */}
                <Toaster />
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}
