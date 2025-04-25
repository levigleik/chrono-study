'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTimerStore } from '@/store/timerStore'
import { Button } from '@heroui/react'

import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export function Timer() {
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const {
    isRunning,
    elapsedTime,
    timestampStart,
    selectedSubject,
    selectedDiscipline,
    startTimer,
    pauseTimer,
    resetTimer,
    saveSession,
    syncTimer,
  } = useTimerStore()

  const [seconds, setSeconds] = useState(0)

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const sec = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const handleSave = useCallback(() => {
    saveSession()
    setShowSaveDialog(false)
    toast.success('Tempo salvo com sucesso!')
  }, [saveSession])

  useEffect(() => {
    const updateTimer = () => {
      setSeconds(
        Math.floor(
          elapsedTime + (isRunning ? (Date.now() - timestampStart) / 1000 : 0),
        ),
      )
    }

    updateTimer()

    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [isRunning, timestampStart, elapsedTime])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'timerState') {
        syncTimer()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [syncTimer])

  return (
    <>
      <div className="flex flex-col text-center">
        <span className="my-2 mt-4 font-clockicons text-5xl text-secondary-500 md:text-6xl lg:text-8xl dark:text-white">
          {formatTime(seconds)}
        </span>
      </div>
      <div className="mt-4 flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:space-y-0">
        {!isRunning ? (
          <Button
            onPress={startTimer}
            variant="bordered"
            isDisabled={!selectedSubject || !selectedDiscipline}
            size="lg"
            type="button"
            radius="full"
            color="secondary"
            className="w-auto text-foreground lg:flex-1"
          >
            <PlayIcon className="mr-2 h-4 w-4" />
            Iniciar
          </Button>
        ) : (
          <Button
            onPress={pauseTimer}
            variant="bordered"
            size="lg"
            radius="full"
            type="button"
            className="w-auto lg:flex-1"
          >
            <PauseIcon className="mr-2 h-4 w-4" />
            Pausar
          </Button>
        )}
        <Button
          onPress={
            seconds === 0
              ? () => {
                  resetTimer()
                }
              : () => {
                  setShowResetDialog(true)
                }
          }
          variant="bordered"
          size="lg"
          className="w-auto text-foreground lg:flex-1 dark:text-white"
          type="button"
          radius="full"
          color="danger"
          isDisabled={seconds === 0 && !selectedSubject && !selectedDiscipline}
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Resetar
        </Button>
        <Button
          onPress={() => {
            pauseTimer()
            setShowSaveDialog(true)
          }}
          variant="bordered"
          size="lg"
          color="success"
          radius="full"
          className="w-auto text-foreground lg:flex-1 dark:text-white"
          isDisabled={seconds === 0}
        >
          <SaveIcon className="mr-2 h-4 w-4" />
          Salvar
        </Button>
      </div>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar tempo</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja salvar esta sessão de estudo?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="bordered" onPress={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onPress={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resetar cronômetro</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja resetar o cronômetro?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="bordered"
              onPress={() => setShowResetDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                resetTimer()
                setShowResetDialog(false)
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
