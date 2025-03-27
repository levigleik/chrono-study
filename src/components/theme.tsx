'use client'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Theme({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn('h-8 rounded-full', className)}
            size="icon"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {theme === 'dark'
            ? 'Trocar para tema claro'
            : 'Trocar para tema escuro'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
