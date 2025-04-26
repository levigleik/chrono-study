'use client'
import { useTimerStore } from '@/store/timerStore'
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from '@heroui/react'

import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { FaClock, FaExclamation } from 'react-icons/fa'
import { IoBook, IoBookmark } from 'react-icons/io5'
import { HighlightCard } from './HighlightCard'

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
    addToast({
      title: 'Tempo salvo',
      description: 'O tempo foi salvo com sucesso',
      color: 'success',
    })
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

  const handleStartTimer = () => {
    if (!selectedSubject || !selectedDiscipline) {
      addToast({
        title: 'Selecione uma matéria e uma disciplina',
        color: 'danger',
      })
      return
    }
    startTimer()
  }

  return (
    <>
      <div className="flex flex-col text-center">
        <span className="font-clockicons text-4xl text-secondary-500 md:text-5xl lg:text-7xl dark:text-white">
          {formatTime(seconds)}
        </span>
      </div>
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:justify-between lg:space-y-0">
        {!isRunning ? (
          <Button
            onPress={handleStartTimer}
            variant="bordered"
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
            seconds === 0 && !isRunning
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
          onPress={() => setShowSaveDialog(true)}
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

      <Modal isOpen={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <ModalContent>
          <ModalHeader>Confirmar registro</ModalHeader>
          <ModalBody>
            <HighlightCard
              title="Disciplina"
              subtitle={selectedDiscipline || ''}
              icon={<IoBook size={30} className="text-white" />}
            />
            <HighlightCard
              title="Tema"
              subtitle={selectedSubject || ''}
              icon={<IoBookmark size={30} className="text-white" />}
            />
            <HighlightCard
              title="Tempo de estudo"
              subtitle={formatTime(seconds)}
              icon={<FaClock size={30} className="text-white" />}
            />
            <Alert
              color="primary"
              title="Deseja salvar esta sessão de estudo? Os dados serão adicionados às suas estatísticas."
              classNames={{
                base: 'items-center',
                iconWrapper: 'shadow-none bg-primary-50 border-none',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="bordered"
              onPress={() => setShowSaveDialog(false)}
              color="danger"
            >
              Cancelar
            </Button>
            <Button onPress={handleSave} color="secondary">
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showResetDialog} onOpenChange={setShowResetDialog}>
        <ModalContent>
          <ModalHeader>Resetar cronômetro</ModalHeader>
          <ModalBody>
            <Alert
              color="danger"
              title="Tem certeza de que deseja resetar o cronômetro?"
              icon={<FaExclamation size={24} className="text-danger" />}
              classNames={{
                base: 'items-center',
                iconWrapper: 'shadow-none bg-danger-50 border-none',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="bordered"
              onPress={() => setShowResetDialog(false)}
              color="danger"
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                resetTimer()
                setShowResetDialog(false)
              }}
              color="secondary"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
