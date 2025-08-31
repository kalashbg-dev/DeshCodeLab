"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Función para detectar si es un dispositivo táctil o está en vista móvil
const isTouchDevice = () => {
  // Verificar si el ancho de la pantalla es menor a 768px (vista móvil)
  if (typeof window === 'undefined') return false;
  
  const isMobileView = window.innerWidth < 768;
  
  // Verificación básica de soporte táctil
  const hasTouchSupport = (
    'ontouchstart' in window ||
    (window.navigator.maxTouchPoints > 0) ||
    ((window.navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints ?? 0) > 0
  );

  // Considerar como dispositivo táctil si es una vista móvil o si tiene soporte táctil
  return isMobileView || hasTouchSupport;
}

export default function CursorFollower() {
  const [isTouchDeviceState, setIsTouchDevice] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Verificar si es un dispositivo táctil
    const touchDevice = isTouchDevice()
    setIsTouchDevice(touchDevice)
    
    // Si es un dispositivo táctil, no hacer nada más
    if (touchDevice) return
    
    // El resto del código solo se ejecuta en dispositivos no táctiles
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll("button, a, [role='button']")

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  // No renderizar en dispositivos táctiles
  if (isTouchDeviceState) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
      />
    </>
  )
}
