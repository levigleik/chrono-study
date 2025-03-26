'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useInterval } from '@/lib/use-interval'
import { useTimerStore } from '@/store/timerStore'

import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export function Timer() {
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const {
    isRunning,
    seconds,
    selectedSubject,
    selectedDiscipline,
    startTimer,
    pauseTimer,
    resetTimer,
    tick,
    saveSession,
  } = useTimerStore()

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useInterval(() => {
    if (isRunning) {
      tick()
    }
  }, 1000)

  const handleSave = useCallback(() => {
    saveSession()
    setShowSaveDialog(false)
    toast.success('Tempo salvo com sucesso!')
  }, [saveSession])

  // useEffect(() => {
  //   const spaceBtn = (e: KeyboardEvent) => {
  //     if (e.key === 's') {
  //       e.preventDefault()
  //       if (isRunning) {
  //         pauseTimer()
  //       } else {
  //         startTimer()
  //       }
  //     }
  //   }

  //   document.addEventListener('keydown', spaceBtn)
  //   return () => document.removeEventListener('keydown', spaceBtn)
  // }, [isRunning, pauseTimer, startTimer])

  useEffect(() => {
    const rBtn = (e: KeyboardEvent) => {
      if (e.key === 'r') {
        e.preventDefault()
        resetTimer()
      } else if (e.key === 's' && seconds !== 0) {
        e.preventDefault()
        setShowSaveDialog(true)
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        if (isRunning) {
          pauseTimer()
        } else {
          startTimer()
        }
      }
    }

    document.addEventListener('keydown', rBtn)
    return () => document.removeEventListener('keydown', rBtn)
  }, [resetTimer, handleSave, seconds, isRunning, pauseTimer, startTimer])

  // useEffect(() => {
  //   const sBtn = (e: KeyboardEvent) => {
  //     if (e.key === 's') {
  //       e.preventDefault()
  //       handleSave()
  //     }
  //   }

  //   document.addEventListener('keydown', sBtn)
  //   return () => document.removeEventListener('keydown', sBtn)
  // }, [handleSave])

  return (
    <div className="flex flex-col text-center">
      <span className="font-clockicons text-5xl md:text-6xl lg:text-8xl">
        {formatTime(seconds)}
      </span>
      <TooltipProvider>
        <div className="mt-4 flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:space-y-0">
          <Tooltip>
            <TooltipTrigger asChild>
              {!isRunning ? (
                <Button
                  onClick={startTimer}
                  disabled={!selectedSubject || !selectedDiscipline}
                  size="lg"
                  type="button"
                  className="w-auto lg:flex-1"
                >
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Iniciar
                </Button>
              ) : (
                <Button
                  onClick={pauseTimer}
                  variant="secondary"
                  size="lg"
                  type="button"
                  className="w-auto lg:flex-1"
                >
                  <PauseIcon className="mr-2 h-4 w-4" />
                  Pausar
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Pressione a tecla{' '}
              <span className="font-bold italic">
                <kbd>espaço</kbd>
              </span>{' '}
              para iniciar ou pausar o cronômetro.
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
                className="w-auto lg:flex-1"
                type="button"
                disabled={
                  seconds === 0 && !selectedSubject && !selectedDiscipline
                }
              >
                <RotateCcwIcon className="mr-2 h-4 w-4" />
                Resetar
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Pressione a tecla{' '}
              <span className="font-bold italic">
                <kbd>r</kbd>
              </span>{' '}
              para resetar o cronômetro.
            </TooltipContent>
          </Tooltip>{' '}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setShowSaveDialog(true)}
                variant="default"
                size="lg"
                className="w-auto lg:flex-1"
                disabled={seconds === 0}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Pressione a tecla{' '}
              <span className="font-bold italic">
                <kbd>s</kbd>
              </span>{' '}
              para salvar o tempo.
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar tempo</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja salvar esta sessão de estudo? Isso irá
              reiniciar o cronômetro.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar tempo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
