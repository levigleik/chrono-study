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
import { useTimerStore } from '@/store/timerStore'

import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

  return (
    <>
      <div className="flex flex-col text-center">
        <span className="font-clockicons my-2 text-5xl md:text-6xl lg:text-8xl">
          {formatTime(seconds)}
        </span>
      </div>
      <div className="mt-4 flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:space-y-0">
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
        <Button
          onClick={
            seconds === 0
              ? () => {
                  resetTimer()
                }
              : () => {
                  setShowResetDialog(true)
                }
          }
          variant="outline"
          size="lg"
          className="w-auto lg:flex-1"
          type="button"
          disabled={seconds === 0 && !selectedSubject && !selectedDiscipline}
        >
          <RotateCcwIcon className="mr-2 h-4 w-4" />
          Resetar
        </Button>
        <Button
          onClick={() => {
            pauseTimer()
            setShowSaveDialog(true)
          }}
          variant="default"
          size="lg"
          className="w-auto lg:flex-1"
          disabled={seconds === 0}
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
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
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
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
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
