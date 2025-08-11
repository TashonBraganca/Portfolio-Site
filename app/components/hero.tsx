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
  const [currentWord, setCurrentWord] = React.useState(0)
  const words = ['Data Scientist', 'ML Engineer', 'Problem Solver', 'System Builder']

  React.useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      
      {/* Floating elements - more sophisticated */}
      <FloatingIcon className="top-20 left-20" delay={0} duration={12}>
        <div className="w-20 h-20 border border-white/10 rounded-lg backdrop-blur-sm bg-white/5 flex items-center justify-center">
          <Code className="w-8 h-8 text-white/40" />
        </div>
      </FloatingIcon>
      
      <FloatingIcon className="top-32 right-32" delay={2} duration={15}>
        <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white/50" />
        </div>
      </FloatingIcon>
      
      <FloatingIcon className="bottom-40 left-40" delay={4} duration={10}>
        <div className="w-24 h-16 border-2 border-dashed border-white/10 rounded-xl backdrop-blur-sm bg-white/5" />
      </FloatingIcon>
      
      <FloatingIcon className="bottom-32 right-20" delay={1} duration={14}>
        <div className="w-12 h-12 bg-white/10 rotate-45 backdrop-blur-sm" />
      </FloatingIcon>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* ASCII Art Section */}
          <div className="text-center mb-8">
            <ASCIIHero />
          </div>

          {/* Main Hero Content */}
          <div className="text-center space-y-8">
            {/* Large typography like supermemory */}
            <div className="space-y-4">
              <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                  <span className="block text-foreground min-h-[1.2em]">Your next</span>
                  <span className="relative inline-block min-h-[1.2em]">
                    <span className="bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent transition-all duration-500">
                      {words[currentWord]}
                    </span>
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-transparent blur-xl -z-10" />
                  </span>
                </h1>
              </div>
              
              <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-muted-foreground">
                  always executing
                </h2>
              </div>
            </div>
            
            {/* Subtitle */}
            <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
                {hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center pt-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                className="group bg-white text-black hover:bg-white/90 text-lg px-8 py-6 h-auto font-medium"
              >
                {hero.cta.primary}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="group border-white/20 hover:border-white/40 hover:bg-white/5 text-lg px-8 py-6 h-auto font-medium"
              >
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  {hero.cta.secondary}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className={`mt-20 text-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-3 text-sm text-muted-foreground bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Available for new opportunities</span>
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