"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/context/language-context"
import { ZoomIn, ZoomOut, Move, Filter } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { getDeviceCapabilities } from "@/lib/utils"

interface Skill {
  id: string
  name: string
  level: number // 1-10
  category: "frontend" | "backend" | "data" | "tools"
  related: string[] // IDs of related skills
}

const skills: Skill[] = [
  { id: "react", name: "React", level: 9, category: "frontend", related: ["javascript", "typescript", "nextjs"] },
  { id: "nextjs", name: "Next.js", level: 8, category: "frontend", related: ["react", "javascript", "typescript"] },
  { id: "javascript", name: "JavaScript", level: 9, category: "frontend", related: ["typescript", "react", "nodejs"] },
  { id: "typescript", name: "TypeScript", level: 8, category: "frontend", related: ["javascript", "react", "nextjs"] },
  { id: "tailwind", name: "Tailwind CSS", level: 9, category: "frontend", related: ["css", "react"] },
  { id: "css", name: "CSS", level: 8, category: "frontend", related: ["html", "tailwind"] },
  { id: "html", name: "HTML", level: 9, category: "frontend", related: ["css", "javascript"] },
  { id: "nodejs", name: "Node.js", level: 8, category: "backend", related: ["javascript", "express", "mongodb"] },
  { id: "express", name: "Express", level: 7, category: "backend", related: ["nodejs", "mongodb"] },
  { id: "mongodb", name: "MongoDB", level: 8, category: "data", related: ["nodejs", "express"] },
  { id: "sql", name: "SQL", level: 9, category: "data", related: ["postgresql", "python"] },
  { id: "postgresql", name: "PostgreSQL", level: 8, category: "data", related: ["sql", "python"] },
  { id: "python", name: "Python", level: 9, category: "data", related: ["sql", "powerbi", "pandas"] },
  { id: "pandas", name: "Pandas", level: 8, category: "data", related: ["python", "numpy", "powerbi"] },
  { id: "numpy", name: "NumPy", level: 7, category: "data", related: ["python", "pandas"] },
  { id: "powerbi", name: "Power BI", level: 9, category: "data", related: ["python", "sql", "excel"] },
  { id: "excel", name: "Excel", level: 9, category: "tools", related: ["powerbi"] },
  { id: "git", name: "Git", level: 8, category: "tools", related: ["github"] },
  { id: "github", name: "GitHub", level: 8, category: "tools", related: ["git"] },
]

interface Node {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  skill: Skill
  highlighted: boolean
  dragging: boolean
  visible: boolean
}

type CategoryFilter = "all" | "frontend" | "backend" | "data" | "tools"

export default function SkillGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const { t } = useLanguage()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const nodesRef = useRef<Node[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [showLabels, setShowLabels] = useState(false)
  const isMobile = useIsMobile()
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [simplifiedView, setSimplifiedView] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
  const [legendPosition, setLegendPosition] = useState<"bottom" | "overlay">("overlay")

  // Initialize dimensions and check device capabilities
  useEffect(() => {
    setIsMounted(true)

    // Check device capabilities
    const { isLowEnd, preferReducedMotion } = getDeviceCapabilities()
    setIsLowEndDevice(isLowEnd || preferReducedMotion)
    setSimplifiedView(isLowEnd || preferReducedMotion)

    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const container = document.getElementById("skill-graph-container")
        if (container) {
          const containerWidth = container.clientWidth
          setDimensions({
            width: containerWidth,
            height: isMobile ? Math.min(containerWidth * 0.8, 400) : Math.min(containerWidth * 0.6, 500),
          })

          // Set legend position based on screen width
          setLegendPosition(window.innerWidth < 640 ? "bottom" : "overlay")
        }
      }
    }

    updateDimensions()

    // Debounced resize handler for better performance
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateDimensions()
        // Update legend position on resize
        setLegendPosition(window.innerWidth < 640 ? "bottom" : "overlay")
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMobile])

  // Create nodes
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    // Create nodes with additional properties for visual effects
    const newNodes: Node[] = skills.map((skill) => {
      return {
        id: skill.id,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: 0,
        vy: 0,
        radius: simplifiedView ? 6 + skill.level * 0.8 : isMobile ? 8 + skill.level * 1.2 : 10 + skill.level * 1.5,
        skill,
        highlighted: false,
        dragging: false,
        visible: categoryFilter === "all" || skill.category === categoryFilter,
      }
    })

    nodesRef.current = newNodes
  }, [dimensions, isMobile, simplifiedView, categoryFilter])

  // Update node visibility when filter changes
  useEffect(() => {
    if (nodesRef.current.length === 0) return

    nodesRef.current.forEach((node) => {
      node.visible = categoryFilter === "all" || node.skill.category === categoryFilter
    })
  }, [categoryFilter])

  // Handle mouse interactions
  useEffect(() => {
    if (!canvasRef.current || !isMounted) return

    const canvas = canvasRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / zoom - panOffset.x
      const mouseY = (e.clientY - rect.top) / zoom - panOffset.y

      if (isDragging && draggedNode === null) {
        // Panning the canvas
        const dx = (e.clientX - lastMousePos.x) / zoom
        const dy = (e.clientY - lastMousePos.y) / zoom
        setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
        setLastMousePos({ x: e.clientX, y: e.clientY })
        return
      }

      // Check if mouse is over any visible node
      let hoveredNodeId: string | null = null
      for (const node of nodesRef.current) {
        if (!node.visible) continue

        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < node.radius) {
          hoveredNodeId = node.id

          // If we're dragging a node, update its position
          if (isDragging && draggedNode === node.id) {
            node.x = mouseX
            node.y = mouseY
            node.vx = 0
            node.vy = 0
          }

          break
        }
      }

      // Update hovered node
      if (hoveredNodeId !== hoveredNode) {
        setHoveredNode(hoveredNodeId)
        canvas.style.cursor = hoveredNodeId ? "pointer" : "move"
      }

      // Update last mouse position for dragging
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / zoom - panOffset.x
      const mouseY = (e.clientY - rect.top) / zoom - panOffset.y

      // Check if clicking on a visible node
      for (const node of nodesRef.current) {
        if (!node.visible) continue

        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < node.radius) {
          setDraggedNode(node.id)
          node.dragging = true
          setIsDragging(true)
          return
        }
      }

      // If not clicking on a node, start panning
      setIsDragging(true)
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setDraggedNode(null)

      // Reset dragging state for all nodes
      nodesRef.current.forEach((node) => {
        node.dragging = false
      })
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Calculate zoom factor
      const delta = -Math.sign(e.deltaY) * 0.1
      const newZoom = Math.max(0.5, Math.min(2, zoom + delta))

      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Calculate new pan offset to zoom toward mouse position
      const zoomRatio = newZoom / zoom
      const newPanOffsetX = mouseX / zoom - mouseX / newZoom
      const newPanOffsetY = mouseY / zoom - mouseY / newZoom

      setPanOffset((prev) => ({
        x: prev.x + newPanOffsetX,
        y: prev.y + newPanOffsetY,
      }))

      setZoom(newZoom)
    }

    // Add touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        setLastMousePos({ x: touch.clientX, y: touch.clientY })

        // Check if touching a visible node
        const rect = canvas.getBoundingClientRect()
        const touchX = (touch.clientX - rect.left) / zoom - panOffset.x
        const touchY = (touch.clientY - rect.top) / zoom - panOffset.y

        for (const node of nodesRef.current) {
          if (!node.visible) continue

          const dx = touchX - node.x
          const dy = touchY - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < node.radius) {
            setHoveredNode(node.id)
            return
          }
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]

        // Pan the canvas
        const dx = (touch.clientX - lastMousePos.x) / zoom
        const dy = (touch.clientY - lastMousePos.y) / zoom
        setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }))
        setLastMousePos({ x: touch.clientX, y: touch.clientY })
      }
    }

    const handleTouchEnd = () => {
      setHoveredNode(null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseUp)
    canvas.addEventListener("wheel", handleWheel, { passive: false })
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseUp)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [hoveredNode, isMounted, zoom, panOffset, isDragging, draggedNode, lastMousePos])

  // Update highlighted nodes
  useEffect(() => {
    if (hoveredNode === null) {
      // Reset all highlights
      nodesRef.current.forEach((node) => {
        node.highlighted = false
      })
      return
    }

    // Highlight the hovered node and its connections
    const relatedNodeIds = new Set<string>([hoveredNode])

    // Find all directly connected nodes
    const hoveredSkill = skills.find((skill) => skill.id === hoveredNode)
    if (hoveredSkill) {
      hoveredSkill.related.forEach((relatedId) => {
        relatedNodeIds.add(relatedId)
      })
    }

    // Update nodes
    nodesRef.current.forEach((node) => {
      node.highlighted = relatedNodeIds.has(node.id)
    })
  }, [hoveredNode])

  // Animation loop with physics
  useEffect(() => {
    if (!canvasRef.current || nodesRef.current.length === 0 || !isMounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Reduce animation complexity for simplified view
    const simulationSteps = simplifiedView ? 1 : 3
    const damping = simplifiedView ? 0.8 : 0.95

    // Force-directed graph simulation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Apply zoom and pan transformations
      ctx.save()
      ctx.translate(panOffset.x * zoom, panOffset.y * zoom)
      ctx.scale(zoom, zoom)

      const nodes = nodesRef.current
      const visibleNodes = nodes.filter((node) => node.visible)

      // Skip physics for simplified view or run less frequently
      if (!simplifiedView || Math.random() < 0.5) {
        // Apply forces between nodes (repulsion)
        for (let i = 0; i < visibleNodes.length; i++) {
          for (let j = i + 1; j < visibleNodes.length; j++) {
            const nodeA = visibleNodes[i]
            const nodeB = visibleNodes[j]

            // Skip if either node is being dragged
            if (nodeA.dragging || nodeB.dragging) continue

            const dx = nodeB.x - nodeA.x
            const dy = nodeB.y - nodeA.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = nodeA.radius + nodeB.radius + 20

            if (distance < minDistance) {
              // Repulsive force
              const force = simplifiedView ? 0.03 : 0.05
              const fx = (dx / distance) * force
              const fy = (dy / distance) * force

              nodeA.vx -= fx
              nodeA.vy -= fy
              nodeB.vx += fx
              nodeB.vy += fy
            }
          }
        }

        // Apply forces for related nodes (attraction)
        for (const node of visibleNodes) {
          const skill = skills.find((s) => s.id === node.id)
          if (skill) {
            for (const relatedId of skill.related) {
              const relatedNode = visibleNodes.find((n) => n.id === relatedId)
              if (relatedNode) {
                // Skip if either node is being dragged
                if (node.dragging || relatedNode.dragging) continue

                const dx = relatedNode.x - node.x
                const dy = relatedNode.y - node.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                const targetDistance = simplifiedView ? 80 : 100

                // Attractive force
                const force = simplifiedView ? 0.001 : 0.002
                const fx = (dx / distance) * force * (distance - targetDistance)
                const fy = (dy / distance) * force * (distance - targetDistance)

                node.vx += fx
                node.vy += fy
                relatedNode.vx -= fx
                relatedNode.vy -= fy
              }
            }
          }
        }

        // Apply boundary forces and update positions
        for (const node of visibleNodes) {
          // Skip if node is being dragged
          if (node.dragging) continue

          // Boundary forces
          const padding = node.radius
          const boundaryForce = simplifiedView ? 0.05 : 0.1

          if (node.x < padding) node.vx += boundaryForce
          if (node.x > dimensions.width - padding) node.vx -= boundaryForce
          if (node.y < padding) node.vy += boundaryForce
          if (node.y > dimensions.height - padding) node.vy -= boundaryForce

          // Apply velocity with damping
          node.x += node.vx
          node.y += node.vy
          node.vx *= damping
          node.vy *= damping
        }
      }

      // Draw connections
      if (!simplifiedView || categoryFilter !== "all") {
        for (const node of visibleNodes) {
          const skill = skills.find((s) => s.id === node.id)
          if (skill) {
            for (const relatedId of skill.related) {
              const relatedNode = visibleNodes.find((n) => n.id === relatedId)
              if (relatedNode) {
                const isHighlighted = node.highlighted && relatedNode.highlighted

                ctx.beginPath()
                ctx.moveTo(node.x, node.y)
                ctx.lineTo(relatedNode.x, relatedNode.y)

                // Update connection colors based on theme
                if (isHighlighted) {
                  if (theme === "dark") {
                    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)" // Bright blue
                  } else {
                    ctx.strokeStyle = "rgba(37, 99, 235, 0.7)" // Blue
                  }
                  ctx.lineWidth = 2
                } else {
                  if (theme === "dark") {
                    ctx.strokeStyle = "rgba(59, 130, 246, 0.3)" // Blue with low opacity
                  } else {
                    ctx.strokeStyle = "rgba(37, 99, 235, 0.2)" // Blue with low opacity
                  }
                  ctx.lineWidth = 1
                }

                ctx.stroke()
              }
            }
          }
        }
      }

      // Draw nodes
      for (const node of visibleNodes) {
        // Draw the node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)

        // Fill based on category and highlight state
        let fillColor

        if (theme === "dark") {
          // Dark mode colors
          switch (node.skill.category) {
            case "frontend":
              fillColor = node.highlighted ? "#60a5fa" : "rgba(96, 165, 250, 0.8)" // Light blue
              break
            case "backend":
              fillColor = node.highlighted ? "#818cf8" : "rgba(129, 140, 248, 0.8)" // Indigo
              break
            case "data":
              fillColor = node.highlighted ? "#a78bfa" : "rgba(167, 139, 250, 0.8)" // Violet
              break
            case "tools":
              fillColor = node.highlighted ? "#c4b5fd" : "rgba(196, 181, 253, 0.8)" // Lavender
              break
          }
        } else {
          // Light mode colors
          switch (node.skill.category) {
            case "frontend":
              fillColor = node.highlighted ? "#3b82f6" : "rgba(59, 130, 246, 0.7)" // Blue
              break
            case "backend":
              fillColor = node.highlighted ? "#4f46e5" : "rgba(79, 70, 229, 0.7)" // Indigo
              break
            case "data":
              fillColor = node.highlighted ? "#7c3aed" : "rgba(124, 58, 237, 0.7)" // Violet
              break
            case "tools":
              fillColor = node.highlighted ? "#8b5cf6" : "rgba(139, 92, 246, 0.7)" // Purple
              break
          }
        }

        ctx.fillStyle = fillColor
        ctx.fill()

        // Draw border for highlighted nodes
        if (node.highlighted) {
          ctx.strokeStyle = theme === "dark" ? "#FFFFFF" : "#000000"
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Draw skill name
        if (node.highlighted || showLabels) {
          ctx.font = node.highlighted ? "bold 12px Arial" : "12px Arial"

          // Create text background for better readability
          const textWidth = ctx.measureText(node.skill.name).width
          const textHeight = 16
          const padding = 4

          // Background with higher opacity for better contrast
          ctx.fillStyle =
            theme === "dark"
              ? "rgba(255, 255, 255, 0.9)" // White background in dark mode
              : "rgba(0, 0, 0, 0.8)" // Black background in light mode

          ctx.fillRect(
            node.x - textWidth / 2 - padding,
            node.y - textHeight / 2 - padding,
            textWidth + padding * 2,
            textHeight + padding * 2,
          )

          // Draw text with contrasting color
          ctx.fillStyle = theme === "dark" ? "#000000" : "#FFFFFF"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(node.skill.name, node.x, node.y)
        }
      }

      ctx.restore()

      // Use a less frequent animation frame for simplified view
      if (simplifiedView) {
        setTimeout(() => {
          animationFrameRef.current = requestAnimationFrame(animate)
        }, 33) // ~30fps for simplified view
      } else {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, theme, hoveredNode, isMounted, zoom, panOffset, showLabels, simplifiedView, categoryFilter])

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(2, prev + 0.1))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(0.5, prev - 0.1))
  }

  const handleResetView = () => {
    setZoom(1)
    setPanOffset({ x: 0, y: 0 })
  }

  const toggleLabels = () => {
    setShowLabels((prev) => !prev)
  }

  const toggleSimplifiedView = () => {
    setSimplifiedView((prev) => !prev)
  }

  // Display loading state or empty state
  if (!isMounted || dimensions.width === 0) {
    return (
      <div id="skill-graph-container" className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div id="skill-graph-container" className="w-full relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="cursor-move rounded-lg"
        style={{ touchAction: "none" }} // Prevent default touch actions
        aria-label="Interactive skill graph"
      />

      {/* Category filter buttons */}
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`px-2 py-1 text-xs rounded-md transition-all ${
            categoryFilter === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card/80 backdrop-blur-sm border border-border hover:bg-muted"
          }`}
          aria-label="Show all skills"
        >
          {t("tech.all")}
        </button>
        <button
          onClick={() => setCategoryFilter("frontend")}
          className={`px-2 py-1 text-xs rounded-md transition-all ${
            categoryFilter === "frontend"
              ? "bg-[#3b82f6] text-white"
              : "bg-card/80 backdrop-blur-sm border border-border hover:bg-muted"
          }`}
          aria-label="Filter frontend skills"
        >
          {t("tech.frontend.title")}
        </button>
        <button
          onClick={() => setCategoryFilter("backend")}
          className={`px-2 py-1 text-xs rounded-md transition-all ${
            categoryFilter === "backend"
              ? "bg-[#4f46e5] text-white"
              : "bg-card/80 backdrop-blur-sm border border-border hover:bg-muted"
          }`}
          aria-label="Filter backend skills"
        >
          {t("tech.backend.title")}
        </button>
        <button
          onClick={() => setCategoryFilter("data")}
          className={`px-2 py-1 text-xs rounded-md transition-all ${
            categoryFilter === "data"
              ? "bg-[#7c3aed] text-white"
              : "bg-card/80 backdrop-blur-sm border border-border hover:bg-muted"
          }`}
          aria-label="Filter data skills"
        >
          {t("tech.data.title")}
        </button>
        <button
          onClick={() => setCategoryFilter("tools")}
          className={`px-2 py-1 text-xs rounded-md transition-all ${
            categoryFilter === "tools"
              ? "bg-[#8b5cf6] text-white"
              : "bg-card/80 backdrop-blur-sm border border-border hover:bg-muted"
          }`}
          aria-label="Filter tools"
        >
          {t("tech.tools")}
        </button>
      </div>

      {/* Controls */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={toggleSimplifiedView}
          className={`p-1.5 rounded-full ${
            simplifiedView
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border hover:bg-muted transition-colors"
          }`}
          aria-label="Toggle simplified view"
        >
          <Filter className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-full bg-card border border-border hover:bg-muted transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-full bg-card border border-border hover:bg-muted transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={handleResetView}
          className="p-1.5 rounded-full bg-card border border-border hover:bg-muted transition-colors"
          aria-label="Reset view"
        >
          <Move className="h-4 w-4" />
        </button>
      </div>

      {/* Toggle labels button */}
      <div className="absolute top-12 right-2">
        <button
          onClick={toggleLabels}
          className={`px-2 py-1 text-xs rounded-md transition-colors ${
            showLabels ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"
          }`}
          aria-label={showLabels ? "Hide labels" : "Show all labels"}
        >
          {showLabels ? "Hide Labels" : "Show All Labels"}
        </button>
      </div>

      {/* Legend - Responsive positioning with smooth transition */}
      <div
        className={`flex flex-wrap gap-2 text-xs bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border transition-all duration-300 ease-in-out ${
          legendPosition === "bottom" ? "relative mt-4 p-2" : "absolute bottom-2 right-2"
        }`}
      >
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[#3b82f6] dark:bg-[#60a5fa] mr-1"></span>
          <span>{t("tech.frontend.title")}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[#4f46e5] dark:bg-[#818cf8] mr-1"></span>
          <span>{t("tech.backend.title")}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[#7c3aed] dark:bg-[#a78bfa] mr-1"></span>
          <span>{t("tech.data.title")}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 rounded-full bg-[#8b5cf6] dark:bg-[#c4b5fd] mr-1"></span>
          <span>{t("tech.tools")}</span>
        </div>
      </div>

      {/* Zoom indicator - Responsive positioning with smooth transition */}
      <div
        className={`text-xs bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border transition-all duration-300 ease-in-out ${
          legendPosition === "bottom" ? "absolute bottom-2 left-2" : "absolute bottom-2 left-2"
        }`}
      >
        {Math.round(zoom * 100)}%
      </div>

      {/* Screen reader accessible description */}
      <div className="sr-only">
        Interactive skill graph showing connections between different technologies. Frontend skills include React,
        Next.js, JavaScript, TypeScript, Tailwind CSS, CSS, and HTML. Backend skills include Node.js and Express. Data
        skills include MongoDB, SQL, PostgreSQL, Python, Pandas, NumPy, and Power BI. Tools include Excel, Git, and
        GitHub. You can interact with the graph by clicking on skills to see their connections.
      </div>
    </div>
  )
}
