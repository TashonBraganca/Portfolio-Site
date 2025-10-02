"use client"

import * as React from 'react'
import { Github, Linkedin, Download, Mail, Twitter } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { ThemeToggle } from './theme-toggle'
import { links } from '@/lib/config'

const navigation = [
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'About', href: '#about' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' }
]

export function Header() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-8">
            <div className="font-semibold text-lg tracking-tight">
              Tashon Braganca
            </div>
            
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            {/* Social/Contact Icons */}
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="/assets/Tashon_Braganca_Resume.pdf"
                  download="Tashon_Braganca_Resume.pdf"
                  title="Download Resume"
                >
                  <Download className="h-4 w-4" />
                </a>
              </Button>
              
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={`mailto:${links.email}`}
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}