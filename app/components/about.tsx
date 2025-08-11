"use client"

import * as React from 'react'

export function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-xl font-medium text-foreground">
            I&apos;m <span className="text-accent font-semibold">Tashon Braganca</span> — a Data Science student, builder, and execution-driven problem solver.
          </p>
          
          <p className="text-foreground">
            I don&apos;t do &quot;someday&quot; plans — I build, deploy, and refine until the result is undeniable. 
            My work spans <strong className="text-blue-400">machine learning</strong>, <strong className="text-green-400">backend systems</strong>, 
            and <strong className="text-purple-400">end-to-end project execution</strong>. Every project I touch is designed to solve a real problem, 
            not just pad a resume.
          </p>
          
          <p className="text-foreground">
            I operate with a <strong className="text-accent font-bold">SYSTEM</strong> mindset — discipline, iteration, and relentless self-improvement. 
            I treat skills like assets: acquired fast, tested in real conditions, and sharpened through challenges. 
            Whether it&apos;s deploying a model, optimizing backend logic, or engineering an internship pipeline, 
            I bring precision and urgency to every task.
          </p>
          
          <p className="text-foreground">
            Outside of code, I&apos;m obsessed with <strong className="text-orange-400">fitness</strong>, 
            <strong className="text-cyan-400">strategy games</strong>, and breaking down complex systems — 
            from market data flows to human behavior. My mission is simple: master my craft, dominate my field, 
            and leave behind work that outlasts me.
          </p>
        </div>
        
        {/* Visual separator */}
        <div className="flex items-center justify-center py-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}