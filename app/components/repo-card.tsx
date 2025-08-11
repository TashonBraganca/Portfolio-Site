"use client"

import * as React from 'react'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import type { Repository } from '@/lib/github'

interface RepoCardProps {
  repo: Repository
  index: number
}

export function RepoCard({ repo, index }: RepoCardProps) {
  return (
    <Card className="group border hover:border-foreground/20 transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-semibold leading-tight">
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
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
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
                <div className="w-2 h-2 bg-muted-foreground rounded-full" />
                {repo.language}
              </div>
            )}
          </div>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs px-2 py-0.5"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}