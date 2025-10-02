"use client"

import { Header } from '@/app/components/header'
import { Footer } from '@/app/components/footer'
import { Hero } from '@/app/components/hero'
import { Section } from '@/app/components/section'
import { ProjectsList } from '@/app/components/projects/list'
import { Skills } from '@/app/components/skills'
import { About } from '@/app/components/about'
import { Resume } from '@/app/components/resume'
import { Contact } from '@/app/components/contact'
import { ASCIIEffects } from '@/app/components/ascii-effects'
import { ScrollBrain } from '@/app/components/scroll-brain'
import { DynamicShowcase } from '@/app/components/dynamic-showcase'

export default function HomePage() {
  const scrollToSkills = () => {
    const element = document.querySelector('#skills')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ASCII Effects Layer */}
      <ASCIIEffects />

      <Header />

      <Hero />

      {/* Floating Technology Cards with Rotating Brain */}
      <DynamicShowcase
        title="Technology Stack"
        subtitle="Built with modern tools"
        description="Explore the ecosystem of frameworks, libraries, and tools that power modern development."
        onExploreClick={scrollToSkills}
      />

      <Section
        id="projects"
        title="Projects"
        description="Things I've built that I'm proud of"
      >
        <ProjectsList />
      </Section>

      <Section
        id="skills"
        title="Skills & Technologies"
        description="The tools I use to bring ideas to life"
      >
        <Skills />
      </Section>

      <Section
        id="about"
        title="About Me"
        description="Get to know me"
      >
        <About />
      </Section>
      
      <Section
        id="resume"
        title="Resume"
        description="Experience, skills, and professional background"
      >
        <Resume />
      </Section>
      
      <Section
        id="contact"
        title="Let's Build Something"
        description="Ready to turn your ideas into reality?"
      >
        <Contact />
      </Section>
      
      <Footer />
    </main>
  )
}