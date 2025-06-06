import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDeviceCapabilities() {
  // Default values for server-side rendering
  const defaults = {
    isLowEnd: false,
    preferReducedMotion: false,
  }

  // Return defaults if not in browser environment
  if (typeof window === "undefined") {
    return defaults
  }

  const isLowEnd = navigator.hardwareConcurrency <= 2
  const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return {
    isLowEnd,
    preferReducedMotion,
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  let lastFunc: ReturnType<typeof setTimeout>
  let lastRan: number
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      lastRan = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}
