"use client"

import { useEffect, useState } from "react"

// Función para detectar si es un dispositivo táctil o está en vista móvil
const isTouchDevice = () => {
  // Verificar si el ancho de la pantalla es menor a 768px (vista móvil)
  if (typeof window === 'undefined') return false;
  
  const isMobileView = window.innerWidth < 768;
  
  // Verificación básica de soporte táctil
  const hasTouchSupport = (
    'ontouchstart' in window ||
    (window.navigator.maxTouchPoints > 0) ||
    (window.navigator as any).msMaxTouchPoints > 0
  );

  // Considerar como dispositivo táctil si es una vista móvil o si tiene soporte táctil
  return isMobileView || hasTouchSupport;
}

export default function CustomCursor() {
  const [isTouchDeviceState, setIsTouchDevice] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Verificar si es un dispositivo táctil
    setIsTouchDevice(isTouchDevice())
    
    // Si es un dispositivo táctil, no hacer nada más
    if (isTouchDevice()) return
    
    // El resto del código solo se ejecuta en dispositivos no táctiles
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // No renderizar en dispositivos táctiles o si no es visible
  if (isTouchDeviceState || !isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 w-4 h-4 bg-primary rounded-full mix-blend-difference"
      style={{
        left: position.x - 8,
        top: position.y - 8,
        transition: "transform 0.1s ease-out",
      }}
    />
  )
}
