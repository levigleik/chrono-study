'use client'

import { Input } from '@heroui/react'
import { FaClock } from 'react-icons/fa'

interface HighlightCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
}

export function HighlightCard(props: HighlightCardProps) {
  return (
    <div className="rounded-full border-indigo-500 border-l-4 p-5">
      <div className="flex items-center">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 bg-opacity-10 p-2">
          {props.icon}
        </div>
        <div className="w-full">
          {/*<div className="font-medium text-foreground text-xs">*/}
          {/*  {props.title}*/}
          {/*</div>*/}
          <div className="w-full font-mono font-semibold text-foreground-500 text-lg">
            <Input
              variant="bordered"
              // label={type === 'discipline' ? 'disciplina' : 'tema'}
              placeholder="Digite o nome"
              label="Tema"
              labelPlacement="outside"
              radius="full"
              classNames={{
                inputWrapper: 'w-full',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
