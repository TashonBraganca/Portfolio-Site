"use client"

import * as React from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import { FloatingProjectsGrid } from '../floating-cards'
import type { Repository } from '@/lib/github'

interface ProjectsListProps {
  featured?: boolean
}

export function ProjectsList({ featured = false }: ProjectsListProps) {
  const [repos, setRepos] = React.useState<Repository[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/repos')
        if (!response.ok) {
          throw new Error('Failed to fetch repositories')
        }
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Loading projects from the multiverse...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold">Connection Lost</h3>
          <p className="text-muted-foreground">
            Unable to fetch projects from GitHub. The servers might be having a coffee break.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-foreground hover:text-muted-foreground transition-colors underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-2 border-muted rounded-full" />
          </div>
          <h3 className="text-xl font-semibold">No Projects Found</h3>
          <p className="text-muted-foreground">
            Looks like the project repository is currently empty. Check back soon for awesome projects!
          </p>
        </div>
      </div>
    )
  }

  return <FloatingProjectsGrid repos={repos} />
}