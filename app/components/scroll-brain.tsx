"use client"

import * as React from 'react'
import { 
  Brain, 
  Cpu, 
  Zap, 
  Target, 
  Database, 
  Network, 
  Bot, 
  Sparkles,
  TrendingUp,
  Layers,
  GitBranch,
  Code2,
  ArrowRight,
  Code
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'

const AI_ML_ICONS = [
  { Icon: Brain, label: 'Neural Networks', color: '#FF6B6B' },
  { Icon: Cpu, label: 'Deep Learning', color: '#4ECDC4' },
  { Icon: Bot, label: 'AI Agents', color: '#45B7D1' },
  { Icon: Target, label: 'Computer Vision', color: '#96CEB4' },
  { Icon: Database, label: 'Big Data', color: '#FECA57' },
  { Icon: Network, label: 'MLOps', color: '#FF9FF3' },
  { Icon: Zap, label: 'AutoML', color: '#54A0FF' },
  { Icon: Sparkles, label: 'Generative AI', color: '#5F27CD' },
  { Icon: TrendingUp, label: 'Predictions', color: '#00D2D3' },
  { Icon: Layers, label: 'Transformers', color: '#FF9F43' },
  { Icon: GitBranch, label: 'Model Versioning', color: '#26DE81' },
  { Icon: Code2, label: 'AI Development', color: '#FD79A8' }
]

interface ScrollBrainProps {
  children?: React.ReactNode
}

export function ScrollBrain({ children }: ScrollBrainProps) {
  const brainRef = React.useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = React.useState(0)
  const [isInView, setIsInView] = React.useState(false)

  React.useEffect(() => {
    let scrollAnimationFrame: number
    
    const handleScroll = () => {
      if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame)
      }
      
      scrollAnimationFrame = requestAnimationFrame(() => {
        if (!brainRef.current) return

        const rect = brainRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const elementHeight = rect.height
        
        // Calculate how much of the element is in view
        const visibleTop = Math.max(0, -rect.top)
        const visibleBottom = Math.min(elementHeight, windowHeight - rect.top)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        
        const progress = Math.max(0, Math.min(1, visibleHeight / elementHeight))
        setScrollProgress(progress)
        setIsInView(progress > 0.1)

      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame)
      }
    }
  }, [])

  const brainScale = 0.8 + (scrollProgress * 0.4) // Scale from 0.8 to 1.2
  const iconsRotation = scrollProgress * 720 // Double rotation for better visibility
  const contentOpacity = Math.min(1, scrollProgress * 2) // Fade in content
  const brainOpacity = Math.min(1, scrollProgress * 1.5) // Brain fades in
  const iconsOpacity = Math.min(1, scrollProgress * 3) // Icons fade in faster
  const iconDistance = 120 + (scrollProgress * 40) // Icons move farther as you scroll

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center py-12" ref={brainRef} style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-6" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-center" style={{ overflow: 'visible' }}>

          {/* Centered Brain Visual - 15% Smaller */}
          <div className="relative flex items-center justify-center" style={{ width: '500px', height: '500px', overflow: 'visible' }}>
            <div
              className="relative flex items-center justify-center"
              style={{
                width: '340px',
                height: '340px',
                opacity: brainOpacity,
                transform: `scale(${brainScale * 0.85})`,
                overflow: 'visible'
              }}
            >
              {/* Central Brain - Stationary with Flickering */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Dot Matrix Brain - No Rotation */}
                <div
                  className="relative w-32 h-32"
                  style={{
                    transform: 'none',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Brain Dot Matrix Pattern */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => {
                      const row = Math.floor(i / 8)
                      const col = i % 8
                      
                      // Create brain-like shape using mathematical pattern
                      const centerX = 3.5
                      const centerY = 3.5
                      const distanceFromCenter = Math.sqrt(Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2))
                      
                      // Brain hemisphere pattern
                      const leftHemisphere = col < 4
                      const isInBrainRegion = distanceFromCenter < 3.5
                      const isFold = (row === 2 && col >= 1 && col <= 6) || 
                                   (row === 5 && col >= 1 && col <= 6) || 
                                   (col === 2 && row >= 1 && row <= 6) || 
                                   (col === 5 && row >= 1 && row <= 6)
                      
                      const opacity = isInBrainRegion ? 
                        (isFold ? 0.9 : 0.6 - distanceFromCenter * 0.1) : 0
                      
                      const delay = (row + col) * 0.1
                      
                      return (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-sm ${
                            isInBrainRegion ? 'bg-blue-400 animate-pulse' : 'bg-transparent'
                          }`}
                          style={{
                            opacity,
                            animationDelay: `${delay}s`,
                            animationDuration: `${1.5 + Math.random()}s`,
                            boxShadow: isInBrainRegion ? `0 0 4px rgba(59, 130, 246, ${opacity})` : 'none',
                            transform: `translateZ(${isFold ? '4px' : '0px'})`,
                          }}
                        />
                      )
                    })}
                  </div>
                  
                  {/* Brain Ridge Lines */}
                  <div className="absolute inset-0">
                    {/* Vertical ridge */}
                    <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-blue-300 via-blue-500 to-blue-300 opacity-60" 
                         style={{ transform: 'translateX(-50%) translateZ(2px)' }} />
                    {/* Horizontal ridge */}
                    <div className="absolute top-1/2 left-2 right-2 h-px bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 opacity-60" 
                         style={{ transform: 'translateY(-50%) translateZ(2px)' }} />
                  </div>
                  
                  {/* Neural Activity Pulses */}
                  <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.4}s`,
                          animationDuration: '2s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Orbiting Icons - Fixed Circular Motion */}
              <div
                className="absolute gpu-accelerated"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: `rotate(${iconsRotation}deg)`,
                  transformOrigin: 'center center',
                  opacity: iconsOpacity,
                  left: 0,
                  top: 0
                }}
              >
                {AI_ML_ICONS.map(({ Icon, label, color }, index) => {
                  const angle = (index * 360) / AI_ML_ICONS.length
                  const radius = iconDistance // Dynamic radius based on scroll
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius

                  return (
                    <div
                      key={label}
                      className="absolute w-12 h-12 flex items-center justify-center rounded-xl glass-effect hover:scale-110 transition-all duration-300 group cursor-pointer"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-iconsRotation}deg)`,
                        backgroundColor: `${color}15`,
                        border: `1px solid ${color}30`
                      }}
                      title={label}
                    >
                      <Icon
                        className="w-6 h-6 transition-colors duration-300"
                        style={{ color }}
                      />

                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        
        {/* Animated particles */}
        {isInView && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
    </section>
  )
}