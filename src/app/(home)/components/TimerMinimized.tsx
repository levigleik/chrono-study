'use client'
import { useTimerStore } from '@/store/timerStore'
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  addToast,
} from '@heroui/react'

import TitlebarButtons from '@/components/TitlebarButtons'
import { useTimerMinimized } from '@/store/timerMinimized'
import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { FaClock, FaExclamation } from 'react-icons/fa'
import { IoBook, IoBookmark } from 'react-icons/io5'
import { HighlightCard } from './HighlightCard'

export function TimerMinimized() {
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

  const { setIsMinimized, isMinimized } = useTimerMinimized()

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

  // Estado inicial centralizado na base da tela
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - 120,
    y: window.innerHeight - 120,
  })
  const [dragging, setDragging] = useState(false)
  const offset = useState({ x: 0, y: 0 })

  // // Mouse events
  // const onMouseDown = (e: React.MouseEvent) => {
  //   setDragging(true)
  //   offset.current = {
  //     x: e.clientX - position.x,
  //     y: e.clientY - position.y,
  //   }
  //   window.addEventListener('mousemove', onMouseMove)
  //   window.addEventListener('mouseup', onMouseUp)
  // }

  // const onMouseMove = (e: MouseEvent) => {
  //   setPosition({
  //     x: e.clientX - offset.current.x,
  //     y: e.clientY - offset.current.y,
  //   })
  // }

  // const onMouseUp = () => {
  //   setDragging(false)
  //   window.removeEventListener('mousemove', onMouseMove)
  //   window.removeEventListener('mouseup', onMouseUp)
  // }

  // // Touch events para mobile
  // const onTouchStart = (e: React.TouchEvent) => {
  //   setDragging(true)
  //   const touch = e.touches[0]
  //   offset.current = {
  //     x: touch.clientX - position.x,
  //     y: touch.clientY - position.y,
  //   }
  //   window.addEventListener('touchmove', onTouchMove)
  //   window.addEventListener('touchend', onTouchEnd)
  // }

  // const onTouchMove = (e: TouchEvent) => {
  //   const touch = e.touches[0]
  //   setPosition({
  //     x: touch.clientX - offset.current.x,
  //     y: touch.clientY - offset.current.y,
  //   })
  // }

  // const onTouchEnd = () => {
  //   setDragging(false)
  //   window.removeEventListener('touchmove', onTouchMove)
  //   window.removeEventListener('touchend', onTouchEnd)
  // }

  return (
    <Card
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        cursor: dragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        minWidth: 240, // ajuste conforme o tamanho do seu card
        minHeight: 80,
      }}
    >
      <CardHeader
        className="flex cursor-grab gap-2 active:cursor-grabbing"
        // onMouseDown={onMouseDown}
        // onTouchStart={onTouchStart}
      >
        <TitlebarButtons
          linkMinus="/"
          linkPlus="/chrono"
          linkTimes="/"
          onClickMinus={() => {
            setIsMinimized(!isMinimized)
          }}
        />
      </CardHeader>
      <CardBody>
        <div className="flex flex-col text-center">
          <span className="mb-3 font-clockicons text-2xl text-secondary-500 dark:text-white">
            {formatTime(seconds)}
          </span>
        </div>
        <div className="flex gap-4 lg:justify-between lg:space-y-0">
          {!isRunning ? (
            <Button
              onPress={handleStartTimer}
              variant="bordered"
              size="sm"
              isIconOnly
              type="button"
              radius="full"
              color="secondary"
              className="text-foreground lg:flex-1"
            >
              <PlayIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onPress={pauseTimer}
              variant="bordered"
              size="sm"
              isIconOnly
              radius="full"
              type="button"
              className="lg:flex-1"
            >
              <PauseIcon className="h-4 w-4" />
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
            size="sm"
            isIconOnly
            className="text-foreground lg:flex-1 dark:text-white"
            type="button"
            radius="full"
            color="danger"
            isDisabled={
              seconds === 0 && !selectedSubject && !selectedDiscipline
            }
          >
            <RotateCcwIcon className="h-4 w-4" />
          </Button>
          <Button
            onPress={() => setShowSaveDialog(true)}
            variant="bordered"
            size="sm"
            isIconOnly
            color="success"
            radius="full"
            className="text-foreground lg:flex-1 dark:text-white"
            isDisabled={seconds === 0}
          >
            <SaveIcon className="h-4 w-4" />
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
      </CardBody>
    </Card>
  )
}

export default TimerMinimized
