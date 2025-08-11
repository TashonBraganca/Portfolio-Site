"use client"

import * as React from 'react'

interface MousePosition {
  x: number
  y: number
}

const ASCII_CHARS = ['█', '▓', '▒', '░', '▪', '▫', '●', '○', '◦', '·']
const DEVELOPER_ASCII = [
  '██████╗ ███████╗██╗   ██╗',
  '██╔══██╗██╔════╝██║   ██║',
  '██║  ██║█████╗  ██║   ██║',
  '██║  ██║██╔══╝  ╚██╗ ██╔╝',
  '██████╔╝███████╗ ╚████╔╝ ',
  '╚═════╝ ╚══════╝  ╚═══╝  '
]

export function ASCIIEffects() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = React.useState<MousePosition>({ x: 0, y: 0 })
  const animationFrameRef = React.useRef<number>()
  const particlesRef = React.useRef<Array<{
    x: number
    y: number
    char: string
    life: number
    vx: number
    vy: number
  }>>([])
  const lastTimeRef = React.useRef<number>(0)
  const mouseAnimationFrameRef = React.useRef<number>()

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseAnimationFrameRef.current) {
        cancelAnimationFrame(mouseAnimationFrameRef.current)
      }
      
      mouseAnimationFrameRef.current = requestAnimationFrame(() => {
        const newPos = { x: e.clientX, y: e.clientY }
        setMousePos(newPos)

        // Reduced particle generation for better performance
        if (Math.random() > 0.85 && particlesRef.current.length < 50) {
          particlesRef.current.push({
            x: newPos.x + (Math.random() - 0.5) * 20,
            y: newPos.y + (Math.random() - 0.5) * 20,
            char: ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)],
            life: 40, // Reduced lifetime
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
          })
        }
      })
    }

    const animate = (currentTime: number) => {
      // Limit to 30 FPS for better performance
      const deltaTime = currentTime - lastTimeRef.current
      if (deltaTime < 33.33) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTimeRef.current = currentTime
      
      // Use more efficient clearing with transparency
      ctx.fillStyle = 'rgba(13, 17, 23, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '10px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Batch particle operations
      const activeParticles = []
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life--
        
        if (particle.life > 0) {
          const alpha = (particle.life / 40) * 0.6 // Reduced opacity
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fillText(particle.char, particle.x, particle.y)
          activeParticles.push(particle)
        }
      }
      particlesRef.current = activeParticles

      // Simplified mouse trail effect
      if (mousePos.x > 0 && mousePos.y > 0) {
        const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 30)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.fillRect(mousePos.x - 30, mousePos.y - 30, 60, 60)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mouseAnimationFrameRef.current) {
        cancelAnimationFrame(mouseAnimationFrameRef.current)
      }
    }
  }, []) // mousePos is handled via requestAnimationFrame, no dependency needed

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export function ASCIIHero() {
  const [currentFrame, setCurrentFrame] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % DEVELOPER_ASCII.length)
    }, 800) // Faster animation - reduced from 2000ms to 800ms

    return () => clearInterval(interval)
  }, [])

  const handleMouseEnter = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
    >
      <pre className={`text-xs font-mono text-muted-foreground/40 transition-all duration-500 ${
        isAnimating ? 'scale-110 text-foreground/60' : ''
      }`}>
        {DEVELOPER_ASCII.map((line, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 ${
              index === currentFrame ? 'text-foreground/80' : ''
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms` 
            }}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}