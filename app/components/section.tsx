"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-20', className)}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}