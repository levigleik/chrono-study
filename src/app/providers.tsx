'use client'

import { ErrorBoundary } from 'react-error-boundary'

import { useEffect, useState } from 'react'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { Button, ToastProvider } from '@heroui/react'
import { HeroUIProvider } from '@heroui/system'

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
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      fallbackRender={({ resetErrorBoundary }: any) => (
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Ocorreu um erro</h1>
          <Button
            className="mt-4"
            variant="bordered"
            radius="full"
            onPress={() => {
              resetErrorBoundary()
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}
    >
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="white">
          <ToastProvider
            placement="top-center"
            toastOffset={60}
            toastProps={{
              timeout: 3000,
              radius: 'full',
              classNames: {
                title: 'text-foreground',
              },
            }}
          />
          {children}
        </ThemeProvider>
      </HeroUIProvider>
    </ErrorBoundary>
  )
}
