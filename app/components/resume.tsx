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
    <div className="max-w-5xl mx-auto">
      <div className="space-y-8">
        {/* PDF Viewer Container - Centered */}
        <div className="relative">
          <div className="border border-border rounded-lg overflow-hidden bg-card">
            {!hasError ? (
              <>
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                      <p className="text-sm text-muted-foreground">Loading resume...</p>
                    </div>
                  </div>
                )}

                <iframe
                  src="/assets/Tashon_Braganca_Resume.pdf#view=FitH"
                  className="w-full h-[800px] border-none"
                  title="Tashon Braganca Resume"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  allow="fullscreen"
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[800px] space-y-4 text-center p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="w-8 h-8 text-foreground" />
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
        </div>

        {/* Action Buttons - Below PDF */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg">
            <a
              href="/assets/Tashon_Braganca_Resume.pdf"
              download="Tashon_Braganca_Resume.pdf"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          </Button>

          <Button asChild variant="outline" size="lg">
            <a
              href="/assets/Tashon_Braganca_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open in New Tab
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}