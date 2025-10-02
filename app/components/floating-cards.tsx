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
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <div
      className="relative group cursor-pointer transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Main card */}
      <div className="relative bg-card border border-border/50 rounded-xl p-6 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-xl transition-opacity duration-300 ${
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
  return (
    <div className="relative">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.slice(0, 9).map((repo, index) => (
          <FloatingCard
            key={repo.name}
            repo={repo}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}