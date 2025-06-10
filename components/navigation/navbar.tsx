"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "#about", label: { en: "About", es: "Acerca" } },
  { href: "#skills", label: { en: "Skills", es: "Habilidades" } },
  { href: "#portfolio", label: { en: "Portfolio", es: "Portafolio" } },
  { href: "#services", label: { en: "Services", es: "Servicios" } },
  { href: "#contact", label: { en: "Contact", es: "Contacto" } },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-background/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DeshCode by <span className="text-primary">KalashDEV</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {language === "es" ? item.label.es : item.label.en}
              </button>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
            overflow: 'hidden',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden w-full absolute left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg"
          style={{ top: '100%' }}
        >
          <div className="p-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                {language === 'es' ? item.label.es : item.label.en}
              </button>
            ))}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="flex items-center gap-2 px-4"
              >
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {language === 'en' ? 'English' : 'Español'}
                </span>
              </Button>
              <div className="px-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
