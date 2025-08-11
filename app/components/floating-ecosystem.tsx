"use client"

import * as React from 'react'
import { 
  Database, 
  Code, 
  Globe, 
  Smartphone, 
  Server, 
  GitBranch,
  Cloud,
  Terminal,
  Palette,
  Zap,
  Shield,
  Cpu,
  Brain,
  Sparkles
} from 'lucide-react'

interface FloatingCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  x: number
  y: number
  z: number
  rotation: { x: number; y: number; z: number }
  scale: number
  velocity: { x: number; y: number }
  color: string
}

interface MousePosition {
  x: number
  y: number
}

// Reduced card count for better performance
const ECOSYSTEM_CARDS: Omit<FloatingCard, 'x' | 'y' | 'z' | 'rotation' | 'scale' | 'velocity'>[] = [
  {
    id: 'react',
    title: 'React',
    subtitle: 'Frontend Framework',
    icon: Code,
    color: '#61DAFB'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    subtitle: 'Type Safety',
    icon: Terminal,
    color: '#3178C6'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    subtitle: 'Backend Runtime',
    icon: Server,
    color: '#339933'
  },
  {
    id: 'database',
    title: 'PostgreSQL',
    subtitle: 'Database',
    icon: Database,
    color: '#336791'
  },
  {
    id: 'cloud',
    title: 'Cloud',
    subtitle: 'AWS/Vercel',
    icon: Cloud,
    color: '#FF9900'
  },
  {
    id: 'git',
    title: 'Git',
    subtitle: 'Version Control',
    icon: GitBranch,
    color: '#F05032'
  },
  {
    id: 'web',
    title: 'Web APIs',
    subtitle: 'Modern Web',
    icon: Globe,
    color: '#4285F4'
  },
  {
    id: 'mobile',
    title: 'Mobile',
    subtitle: 'React Native',
    icon: Smartphone,
    color: '#61DAFB'
  },
  {
    id: 'design',
    title: 'Design',
    subtitle: 'UI/UX',
    icon: Palette,
    color: '#FF6B6B'
  },
  {
    id: 'performance',
    title: 'Performance',
    subtitle: 'Optimization',
    icon: Zap,
    color: '#FFD93D'
  },
  {
    id: 'security',
    title: 'Security',
    subtitle: 'Best Practices',
    icon: Shield,
    color: '#4ECDC4'
  },
  {
    id: 'ai',
    title: 'AI/ML',
    subtitle: 'Integration',
    icon: Brain,
    color: '#9B59B6'
  }
].slice(0, 8) // Limit to 8 cards for performance

export function FloatingEcosystem() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number>()
  const [cards, setCards] = React.useState<FloatingCard[]>([])
  const [mousePos, setMousePos] = React.useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = React.useState(false)

  // Initialize cards with random positions
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const initialCards: FloatingCard[] = ECOSYSTEM_CARDS.map((card, index) => ({
      ...card,
      x: Math.random() * (window.innerWidth - 300) + 150,
      y: Math.random() * (window.innerHeight - 200) + 100,
      z: Math.random() * 100,
      rotation: {
        x: (Math.random() - 0.5) * 30,
        y: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 15
      },
      scale: 0.8 + Math.random() * 0.4,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5
      }
    }))

    setCards(initialCards)
    
    // Trigger visibility after mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  // Optimized mouse tracking with throttling
  React.useEffect(() => {
    let animationFrame: number
    
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      
      animationFrame = requestAnimationFrame(() => {
        if (!containerRef.current) return
        
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  // Highly optimized animation loop for better performance
  React.useEffect(() => {
    let lastTime = 0
    const targetFPS = 30 // Reduced from 60 for better performance
    const frameTime = 1000 / targetFPS
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= frameTime) {
        setCards(prevCards => 
          prevCards.map(card => {
            // Smooth interpolation factor
            const dt = Math.min(deltaTime / 16.67, 2) // Cap at 2x for stability
            
            let newX = card.x + card.velocity.x * dt
            let newY = card.y + card.velocity.y * dt
            let newVelocityX = card.velocity.x
            let newVelocityY = card.velocity.y

            // Improved boundary bouncing with padding
            const padding = 100
            const maxX = window.innerWidth - padding
            const maxY = window.innerHeight - padding
            
            if (newX <= padding || newX >= maxX) {
              newVelocityX = -newVelocityX * 0.7
              newX = Math.max(padding, Math.min(maxX, newX))
            }
            if (newY <= padding || newY >= maxY) {
              newVelocityY = -newVelocityY * 0.7
              newY = Math.max(padding, Math.min(maxY, newY))
            }

            // Smoother mouse interaction
            const dx = mousePos.x - newX
            const dy = mousePos.y - newY
            const mouseDistance = Math.sqrt(dx * dx + dy * dy)
            
            if (mouseDistance < 180 && mouseDistance > 0) {
              const force = Math.pow((180 - mouseDistance) / 180, 2) * 0.015
              const normalizedDx = dx / mouseDistance
              const normalizedDy = dy / mouseDistance
              
              newVelocityX += normalizedDx * force * dt
              newVelocityY += normalizedDy * force * dt
            }

            // Improved damping
            const dampingFactor = Math.pow(0.98, dt)
            newVelocityX *= dampingFactor
            newVelocityY *= dampingFactor

            // Further reduced random impulse for performance
            if (Math.random() < 0.0005 * dt) {
              const impulse = 0.08
              newVelocityX += (Math.random() - 0.5) * impulse
              newVelocityY += (Math.random() - 0.5) * impulse
            }

            // Velocity limits
            const maxVelocity = 2
            const velocityMagnitude = Math.sqrt(newVelocityX * newVelocityX + newVelocityY * newVelocityY)
            if (velocityMagnitude > maxVelocity) {
              newVelocityX = (newVelocityX / velocityMagnitude) * maxVelocity
              newVelocityY = (newVelocityY / velocityMagnitude) * maxVelocity
            }

            return {
              ...card,
              x: newX,
              y: newY,
              velocity: { x: newVelocityX, y: newVelocityY }
            }
          })
        )
        lastTime = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible]) // mousePos is handled via requestAnimationFrame, no dependency needed

  const getCardDistance = (card: FloatingCard) => {
    return Math.sqrt(
      Math.pow(mousePos.x - card.x, 2) + Math.pow(mousePos.y - card.y, 2)
    )
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    >
      {cards.map((card) => {
        const distance = getCardDistance(card)
        const isNear = distance < 150
        const scale = card.scale * (isNear ? 1.1 : 1)
        const opacity = Math.max(0.6, 1 - card.z / 100)
        const blur = card.z / 20

        return (
          <div
            key={card.id}
            className="absolute pointer-events-auto cursor-pointer gpu-accelerated"
            style={{
              left: card.x,
              top: card.y,
              transform: `
                perspective(1000px)
                rotateX(${card.rotation.x + (isNear ? -5 : 0)}deg)
                rotateY(${card.rotation.y + (isNear ? 5 : 0)}deg)
                rotateZ(${card.rotation.z}deg)
                scale(${scale})
                translateZ(${isNear ? 20 : 0}px)
              `,
              opacity,
              filter: `blur(${blur}px)`,
              zIndex: Math.floor(100 - card.z)
            }}
          >
            <div 
              className="glass-effect rounded-xl p-4 min-w-[200px] group transition-all duration-300 ease-out"
              style={{
                boxShadow: isNear 
                  ? '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.25)'
                  : '0 6px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                transform: isNear ? 'translateY(-2px)' : 'translateY(0)'
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${card.color}20`,
                    border: `1px solid ${card.color}40`,
                    color: card.color
                  }}
                >
                  <card.icon 
                    className="w-5 h-5 transition-colors duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Connection lines (if card is near mouse) */}
            {isNear && (
              <div
                className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  height: distance,
                  transform: `
                    translate(-50%, -50%) 
                    rotate(${Math.atan2(mousePos.y - card.y, mousePos.x - card.x)}rad)
                  `,
                  transformOrigin: '0 50%'
                }}
              />
            )}
          </div>
        )
      })}

      {/* Mouse indicator */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
      </div>
    </div>
  )
}