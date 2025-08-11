"use client"

import * as React from 'react'
import { Badge } from '@/app/components/ui/badge'
import { skills } from '@/lib/config'

export function Skills() {
  return (
    <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
      {skills.map((skill, index) => (
        <Badge 
          key={skill} 
          variant="secondary" 
          className="px-3 py-1 text-sm font-medium"
        >
          {skill}
        </Badge>
      ))}
    </div>
  )
}