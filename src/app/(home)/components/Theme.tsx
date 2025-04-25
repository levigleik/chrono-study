'use client'

import { cn } from '@/lib/utils'
import { Button, Tooltip } from '@heroui/react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Theme({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()
  return (
    <Tooltip
      content={
        theme === 'dark' ? 'Trocar para tema claro' : 'Trocar para tema escuro'
      }
      placement="bottom-end"
    >
      <Button
        variant="bordered"
        onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={cn(className)}
        isIconOnly
        size="sm"
        radius="full"
        aria-label="Trocar tema"
        data-testid={theme === 'dark' ? 'sun-icon' : 'moon-icon'}
      >
        {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </Button>
    </Tooltip>
  )
}
