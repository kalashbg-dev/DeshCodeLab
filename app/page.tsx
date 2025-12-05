'use client';

import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

// Importación directa de componentes críticos para evitar parpadeos y carga diferida inicial
import Hero from '@/components/sections/hero';
import Navbar from '@/components/navigation/navbar';

// Lazy loading solo para secciones que no están en el viewport inicial
const About = lazy(() => import('@/components/sections/about'));
const Skills = lazy(() => import('@/components/sections/skills'));
const Portfolio = lazy(() => import('@/components/sections/portfolio'));
const Services = lazy(() => import('@/components/sections/services'));
const Testimonials = lazy(() => import('@/components/sections/testimonials'));
const Contact = lazy(() => import('@/components/sections/contact'));
const Footer = lazy(() => import('@/components/sections/footer'));

// Componente de skeleton optimizado para secciones lazy
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
  const [error] = useState<Error | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Error boundary
  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div ref={containerRef} className="relative flex flex-col min-h-full">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex-1 flex flex-col w-full overflow-x-hidden"
      >
        {/* Navegación - Carga inmediata */}
        <Navbar />

        {/* Hero - Carga inmediata */}
        <Hero />

        {/* Secciones de la página con lazy loading */}
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
    </div>
  );
}
