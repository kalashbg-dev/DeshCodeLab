"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [currentTheme, setCurrentTheme] = useState("") // Usamos estado local para el tema
  const { theme } = useTheme() // Obtén el hook de forma segura

  useEffect(() => {
    // Este useEffect solo se ejecutará en el cliente
    setCurrentTheme(theme || "light") // Asignamos el tema una vez que esté disponible
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsVisible(false), 500)
          return 100
        }
        return prevProgress + 2
      })
    }, 40)

    return () => clearInterval(timer)
  }, [theme]) // Re-evaluamos cuando el tema cambie

  const { language, t } = useLanguage()

  const logoSrc = currentTheme === "dark" ? "/logoKB-W.png" : "/logoKB-BLK.png"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm"
        >
          <div className="relative z-10 text-center space-y-8 p-8 rounded-2xl bg-background/80 backdrop-blur-md border border-border/50 shadow-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-70 -z-10 animate-pulse" />
              <div className="w-40 h-40 mx-auto flex items-center justify-center relative">
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-primary/30 border-r-secondary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center p-1.5 backdrop-blur-sm">
                  {currentTheme && ( // Aseguramos que el tema ya fue asignado
                    <motion.img
                      src={logoSrc}
                      alt="Kalashnikov Logo"
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))',
                      }}
                    />
                  )}
                </div>
              </div>

              <motion.h1
                className="mt-6 text-2xl font-bold bg-gradient-to-r from-foreground/90 to-foreground/70 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Kalashnikov Bello
              </motion.h1>

              <div className="w-72 mx-auto space-y-3">
                <div className="w-full h-2.5 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-0 h-full w-0.5 bg-white/50" />
                  </motion.div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    {language === "es" ? "Cargando" : "Loading"}
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {progress}%
                  </span>
                </div>
              </div>

              <motion.div
                className="text-sm text-muted-foreground/80 flex items-center justify-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  •
                </motion.span>
                <span>
                  {language === "es" ? "Preparando tu experiencia" : "Preparing your experience"}
                </span>
                <motion.span
                  className="inline-block w-2 h-2 bg-primary rounded-full"
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}