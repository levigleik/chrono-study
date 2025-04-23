'use client'

import { Alert, Input } from '@heroui/react'

interface HighlightCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
}

export function HighlightCard(props: HighlightCardProps) {
  return (
    <>
      <Alert
        title={
          <div className="w-full">
            <div className="font-medium text-foreground-500 text-xs">
              {props.title}
            </div>
            <div className="w-full font-mono font-semibold text-foreground-500 text-lg">
              <div className="text-foreground text-lg">{props.subtitle}</div>
            </div>
          </div>
        }
        aria-valuetext={props.title}
        color="secondary"
        variant="bordered"
        classNames={{
          base: 'items-center',
          iconWrapper: 'w-14 h-14',
        }}
        icon={props.icon}
      />
    </>
  )
}
