'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import LoadingScreen from '@/components/ui/loading-screen';

// Lazy loading de componentes para mejor performance
const Hero = lazy(() => import('@/components/sections/hero'));
const About = lazy(() => import('@/components/sections/about'));
const Skills = lazy(() => import('@/components/sections/skills'));
const Portfolio = lazy(() => import('@/components/sections/portfolio'));
const Services = lazy(() => import('@/components/sections/services'));
const Testimonials = lazy(() => import('@/components/sections/testimonials'));
const Contact = lazy(() => import('@/components/sections/contact'));
const Footer = lazy(() => import('@/components/sections/footer'));
const Navbar = lazy(() => import('@/components/navigation/navbar'));
const ScrollProgress = lazy(() => import('@/components/ui/scroll-progress'));
const FloatingElements = lazy(() => import('@/components/ui/floating-elements'));
const CursorFollower = lazy(() => import('@/components/ui/cursor-follower'));

// Componente de skeleton optimizado
const SectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      <div className="h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
      <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse w-1/2" />
    </div>
  </div>
);

// Componente de error boundary
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-destructive">Algo salió mal</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Recargar página
      </button>
    </div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [error] = useState<Error | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Simular tiempo de carga para mejor UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reducido de 2s a 1.5s

    return () => clearTimeout(timer);
  }, []);

  // Error boundary
  if (error) {
    return <ErrorFallback error={error} />;
  }

  if (!mounted) {
    return <SectionSkeleton />;
  }

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-1 flex flex-col w-full overflow-x-hidden"
          >
            {/* Navegación */}
            <Suspense fallback={<SectionSkeleton />}>
              <Navbar />
            </Suspense>

            {/* Barra de progreso */}
            <Suspense fallback={null}>
              <ScrollProgress />
            </Suspense>

            {/* Elementos flotantes de fondo */}
            <Suspense fallback={null}>
              <FloatingElements />
            </Suspense>

            {/* Cursor personalizado solo en desktop */}
            <Suspense fallback={null}>
              <CursorFollower />
            </Suspense>

            {/* Secciones de la página con lazy loading */}
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
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
