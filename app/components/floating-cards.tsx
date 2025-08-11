"use client"

import * as React from 'react'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import type { Repository } from '@/lib/github'

interface FloatingCardProps {
  repo: Repository
  index: number
  style?: React.CSSProperties
}

export function FloatingCard({ repo, index, style }: FloatingCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    setMousePos({
      x: (e.clientX - centerX) / 10,
      y: (e.clientY - centerY) / 10
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const cardStyle: React.CSSProperties = {
    ...style,
    transform: `
      perspective(1000px) 
      rotateY(${mousePos.x}deg) 
      rotateX(${-mousePos.y}deg) 
      translateZ(${isHovered ? '20px' : '0px'})
      scale(${isHovered ? '1.05' : '1'})
    `,
    transformStyle: 'preserve-3d',
    transition: isHovered ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
    >
      {/* Card shadow/depth */}
      <div 
        className="absolute inset-0 bg-black/50 rounded-xl"
        style={{
          transform: 'translateZ(-10px)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Main card */}
      <div className="relative bg-card border border-border/50 rounded-xl p-6 backdrop-blur-sm overflow-hidden">
        {/* Gradient overlay on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Card content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1 flex-1">
              <h3 className="text-lg font-semibold leading-tight group-hover:text-white/90 transition-colors">
                {repo.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {repo.description || 'No description available.'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={`ml-2 shrink-0 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${repo.name} on GitHub`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {repo.forks_count}
              </div>
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  {repo.language}
                </div>
              )}
            </div>

            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                    +{repo.topics.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Shine effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 transition-all duration-700 ${
            isHovered ? 'translate-x-full' : '-translate-x-full'
          }`}
        />
      </div>
    </div>
  )
}

export function FloatingProjectsGrid({ repos }: { repos: Repository[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.slice(0, 6).map((repo, index) => {
          // Create floating positions based on index and mouse
          const baseX = (index % 3) * 20 - 20
          const baseY = Math.floor(index / 3) * 15 - 10
          const parallaxX = (mousePos.x - 0.5) * baseX * 0.5
          const parallaxY = (mousePos.y - 0.5) * baseY * 0.5

          return (
            <FloatingCard
              key={repo.name}
              repo={repo}
              index={index}
              style={{
                animationDelay: `${index * 200}ms`,
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}