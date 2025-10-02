"use client"

import * as React from 'react'
import { ArrowRight, Github, Code, Sparkles } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { ASCIIHero } from './ascii-effects'
import { hero, links } from '@/lib/config'

const FloatingIcon = ({ 
  children, 
  className, 
  delay = 0,
  duration = 8
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}) => (
  <div 
    className={`absolute opacity-30 ${className}`}
    style={{ 
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
)

export function Hero() {
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>
      
      {/* Floating elements - subtle and static */}
      <div className="absolute top-20 left-20 opacity-5">
        <div className="w-20 h-20 border border-white/20 rounded-lg">
          <Code className="w-8 h-8 text-white/40 m-6" />
        </div>
      </div>

      <div className="absolute top-32 right-32 opacity-5">
        <div className="w-16 h-16 border border-white/20 rounded-full">
          <Sparkles className="w-6 h-6 text-white/40 m-5" />
        </div>
      </div>

      <div className="absolute bottom-40 left-40 opacity-5">
        <div className="w-24 h-16 border border-dashed border-white/20 rounded-xl" />
      </div>

      <div className="absolute bottom-32 right-20 opacity-5">
        <div className="w-12 h-12 bg-white/10 rotate-45" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* ASCII Art Section */}
          <div className="text-center mb-8">
            <ASCIIHero />
          </div>

          {/* Main Hero Content */}
          <div className="text-center space-y-8">
            {/* Clean, professional typography */}
            <div className="space-y-4">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-tight text-foreground">
                  {hero.name}
                </h1>
              </div>

              <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground/90">
                  {hero.title}
                </h2>
              </div>
            </div>
            
            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center pt-8 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group bg-foreground text-background hover:bg-foreground/90 text-base px-8 py-6 h-auto font-medium"
              >
                {hero.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="group border-border hover:border-foreground/40 hover:bg-foreground/5 text-base px-8 py-6 h-auto font-medium"
              >
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  {hero.cta.secondary}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="w-1 h-1 bg-white/50 rounded-full" />
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-3deg); }
        }
      `}</style>
    </section>
  )
}