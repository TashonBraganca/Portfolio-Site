"use client"

import * as React from 'react'
import { Target, Zap, TrendingUp } from 'lucide-react'

export function Mission() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-8">
        {/* Mission Statement */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <Target className="w-4 h-4" />
            <span>Mission Statement</span>
          </div>
          
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="text-xl font-medium text-foreground">
              To master the intersection of <span className="text-blue-400 font-semibold">machine learning</span>, 
              <span className="text-green-400 font-semibold"> backend engineering</span>, and 
              <span className="text-purple-400 font-semibold"> system design</span> — and to execute with the discipline of an athlete 
              and the precision of an engineer.
            </p>
            
            <p className="text-foreground/90">
              My goal is to create solutions that aren&apos;t just functional, but <strong className="text-accent font-semibold">transformative</strong> — 
              pushing myself and the people around me to higher levels of performance.
            </p>
          </div>
        </div>
        
        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="glass-effect rounded-xl p-6 hover-lift group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Execute Fast</h3>
              <p className="text-sm text-muted-foreground">
                No &quot;someday&quot; plans. Build, deploy, refine until results are undeniable.
              </p>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 hover-lift group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">System Mindset</h3>
              <p className="text-sm text-muted-foreground">
                Discipline, iteration, and relentless self-improvement in every task.
              </p>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 hover-lift group">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Transformative Impact</h3>
              <p className="text-sm text-muted-foreground">
                Create solutions that push performance to higher levels for everyone involved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}