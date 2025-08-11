"use client"

import * as React from 'react'
import { Mail, Github, Linkedin, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { links } from '@/lib/config'

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`)
    const body = encodeURIComponent(
      `Hi Tashon,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
    )
    
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold mb-4">Let&apos;s work together</h3>
        <p className="text-muted-foreground mb-8">
          Have a project in mind? Drop me a message and I&apos;ll get back to you.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <a
              href={`mailto:${links.email}`}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={`tel:${links.phone}`}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        </div>
        
        {/* Contact Details Display */}
        <div className="mb-8 p-4 glass-effect rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{links.email}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{links.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <Textarea
          name="message"
          placeholder="Tell me about your project..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
        />
        
        <Button 
          type="submit" 
          className="w-full bg-foreground text-background hover:bg-foreground/90"
        >
          Send Message
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}