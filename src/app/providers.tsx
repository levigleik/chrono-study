'use client'

import { ErrorBoundary } from 'react-error-boundary'

import { useEffect, useState } from 'react'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(typeof window !== 'undefined')
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ErrorBoundary
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fallbackRender={({ resetErrorBoundary }: any) => (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Ocorreu um erro</h1>
          <Button
            className="mt-4"
            onClick={() => {
              resetErrorBoundary()
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}
    >
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ duration: 4000 }}
        />
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}
