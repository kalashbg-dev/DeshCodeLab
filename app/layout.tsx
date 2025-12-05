import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { LanguageProvider } from '@/context/language-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/whatsapp-button';

// Configuración de fuentes optimizada
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

// Metadatos SEO mejorados
export const metadata: Metadata = {
  metadataBase: new URL('https://deshcodelab.com'),
  title: {
    default: 'Kalashnikov Bello | Data Analyst & FullStack Developer',
    template: '%s | DeshCode Lab',
  },
  description:
    'Portfolio profesional de Kalashnikov Bello, especialista en análisis de datos, desarrollo FullStack y soluciones de Business Intelligence. Transformando datos en insights accionables.',
  keywords: [
    'Data Analyst',
    'FullStack Developer',
    'Business Intelligence',
    'Web Development',
    'Data Visualization',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'DeshCode Lab',
  ],
  authors: [{ name: 'Kalashnikov Bello' }],
  creator: 'Kalashnikov Bello',
  publisher: 'DeshCode Lab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://deshcodelab.com',
    siteName: 'DeshCode Lab',
    title: 'Kalashnikov Bello | Data Analyst & FullStack Developer',
    description:
      'Portfolio profesional especializado en análisis de datos, desarrollo FullStack y soluciones de Business Intelligence.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DeshCode Lab - Portfolio de Kalashnikov Bello',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalashnikov Bello | Data Analyst & FullStack Developer',
    description:
      'Portfolio profesional especializado en análisis de datos, desarrollo FullStack y soluciones de Business Intelligence.',
    images: ['/og-image.jpg'],
    creator: '@kalashdev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://deshcodelab.com',
    languages: {
      'es-ES': 'https://deshcodelab.com/es',
      'en-US': 'https://deshcodelab.com/en',
    },
  },
  category: 'technology',
  classification: 'Portfolio profesional',
  other: {
    'theme-color': '#3366cc',
    'msapplication-TileColor': '#3366cc',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'DeshCode Lab',
  },
};

// Configuración de viewport optimizada
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#10141a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${jakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preload de imágenes críticas */}
        <link rel="preload" as="image" href="/profile.webp" />
        
        {/* Manifest para PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons optimizados */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        
        {/* Meta tags adicionales */}
        <meta name="application-name" content="DeshCode Lab" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DeshCode Lab" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3366cc" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${jakarta.className} min-h-screen flex flex-col antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <main className="flex-1 flex flex-col" role="main">
              {children}
            </main>
            <WhatsAppButton />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
        
        {/* Structured Data para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kalashnikov Bello',
              jobTitle: 'Data Analyst & FullStack Developer',
              description:
                'Especialista en análisis de datos, desarrollo FullStack y soluciones de Business Intelligence',
              url: 'https://deshcodelab.com',
              sameAs: [
                'https://github.com/kalashdev',
                'https://linkedin.com/in/kalashnikov-bello',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'DeshCode Lab',
              },
              knowsAbout: [
                'Data Analysis',
                'FullStack Development',
                'Business Intelligence',
                'Web Development',
                'Data Visualization',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
