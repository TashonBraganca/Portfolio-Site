"use client"

import * as React from 'react'
import { Download, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/app/components/ui/button'

export function Resume() {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const handleIframeLoad = () => {
    setIsLoaded(true)
  }

  const handleIframeError = () => {
    setHasError(true)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </div>
          
          <h3 className="text-2xl font-semibold text-foreground">
            View My Resume
          </h3>
          
          <p className="text-muted-foreground">
            Download or view my latest resume with detailed experience and skills.
          </p>
        </div>

        {/* PDF Viewer Container */}
        <div className="relative">
          <div className="glass-effect rounded-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* PDF Embed */}
              <div className="flex-1 relative">
                {!hasError ? (
                  <>
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                          <p className="text-sm text-muted-foreground">Loading resume...</p>
                        </div>
                      </div>
                    )}
                    
                    <iframe
                      src="/assets/Tashon_Braganca_Resume.pdf#zoom=85"
                      className="w-full h-[600px] border-none"
                      title="Tashon Braganca Resume"
                      onLoad={handleIframeLoad}
                      onError={handleIframeError}
                      allow="fullscreen"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[600px] space-y-4 text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground">PDF Preview Unavailable</h4>
                    <p className="text-muted-foreground max-w-md">
                      The resume preview couldn&apos;t be loaded in your browser. 
                      Please download the PDF directly to view it.
                    </p>
                    <Button asChild className="mt-4">
                      <a 
                        href="/assets/Tashon_Braganca_Resume.pdf" 
                        download="Tashon_Braganca_Resume.pdf"
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Resume
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Side Actions */}
              <div className="lg:w-64 p-6 bg-background/30 border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-foreground mb-2">Quick Actions</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download my resume or view it in a new tab.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <a 
                        href="/assets/Tashon_Braganca_Resume.pdf" 
                        download="Tashon_Braganca_Resume.pdf"
                        className="flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <a 
                        href="/assets/Tashon_Braganca_Resume.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                      </a>
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h5 className="text-sm font-medium text-foreground mb-2">Resume Highlights</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Data Science Student</li>
                      <li>• Machine Learning Projects</li>
                      <li>• Backend Development</li>
                      <li>• System Design Experience</li>
                      <li>• End-to-End Execution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>
      </div>
    </div>
  )
}