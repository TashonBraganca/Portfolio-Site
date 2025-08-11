"use client"

import * as React from 'react'
import { FloatingEcosystem } from './floating-ecosystem'
import { ScrollBrain } from './scroll-brain'
import { Button } from './ui/button'
import { ArrowRight, Code, Sparkles } from 'lucide-react'

interface DynamicShowcaseProps {
  title: string
  subtitle: string
  description: string
  onExploreClick?: () => void
}

export function DynamicShowcase({ 
  title, 
  subtitle, 
  description, 
  onExploreClick 
}: DynamicShowcaseProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const sectionRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative" ref={sectionRef}>
      {/* Floating Ecosystem */}
      <FloatingEcosystem />
      
      {/* Main Content with Scroll Brain */}
      <ScrollBrain>
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8">
              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Interactive Experience</span>
                </div>
                
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-foreground">{title}</span>
                  <span className="block text-muted-foreground text-4xl sm:text-5xl lg:text-6xl">
                    {subtitle}
                  </span>
                </h2>
              </div>
              
              <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

            </div>

          </div>
        </div>
      </ScrollBrain>

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-move 25s linear infinite'
          }}
        />
      </div>
    </section>
  )
}