'use client'

import { TooltipProvider } from '../ui/tooltip'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof TooltipProvider>) {
  return <TooltipProvider {...props}>{children}</TooltipProvider>
}
