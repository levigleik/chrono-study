'use client'

import TitlebarButtons from '@/components/TitlebarButtons'
import { useFocusStore } from '@/store/focusStore'
import { useTimerStore } from '@/store/timerStore'
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  cn,
} from '@heroui/react'
import { useEffect, useRef } from 'react'
import { AddDisciplineSubject } from './AddDisciplineSubject'
import { Timer } from './Timer'
import { useTimerMinimized } from '@/store/timerMinimized'

/**
 * Componente que exibe o card do Chrono Study.
 */

export function ChronoStudyCard() {
  const {
    selectedSubject,
    setDiscipline,
    selectedDiscipline,
    setSubject,
    isRunning,
    disciplines: disciplinesData,
  } = useTimerStore()

  const subjects = disciplinesData
    .find((discipline) => discipline.name === selectedDiscipline)
    ?.subjects?.map((name) => ({ name }))

  const setDivRef = useFocusStore((state) => state.setDivRef)
  const divRef = useRef<HTMLDivElement>(null)
  const { setIsMinimized, isMinimized } = useTimerMinimized()

  useEffect(() => {
    if (divRef.current) {
      setDivRef(divRef.current)
    }
  }, [setDivRef])

  return (
    <Card
      ref={divRef}
      tabIndex={-1}
      className={cn(
        '!transition-shadow flex min-h-fit w-full grow overflow-auto',
        'border bg-card duration-300 ease-in-out hover:shadow-large',
        'focus:border-secondary-500',
      )}
    >
      {/* <CardHeader className="flex gap-2 ">
        <TitlebarButtons
          linkMinus="/"
          linkPlus="/chrono"
          linkTimes="/"
          onClickMinus={() => {
            setIsMinimized(!isMinimized)
          }}
        />
      </CardHeader> */}
      <CardBody className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-end justify-center gap-2">
              <Select
                label="Disciplina"
                classNames={{
                  label: 'w-full text-medium',
                  popoverContent: 'bg-card border',
                  value: 'text-sm',
                }}
                radius="full"
                placeholder="Selecione uma"
                variant="bordered"
                size="sm"
                selectedKeys={[selectedDiscipline ?? '']}
                labelPlacement={'outside'}
                isDisabled={isRunning}
                items={disciplinesData ?? []}
                // renderValue={(item) => (
                //   <span className="text-medium">{item.name}</span>
                // )}
                onChange={(e) => setDiscipline(e.target?.value)}
              >
                {(item) => (
                  <SelectItem
                    key={item.name}
                    className="capitalize"
                    textValue={item.name}
                  >
                    {item.name}
                  </SelectItem>
                )}
              </Select>
              <AddDisciplineSubject type="discipline" />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-end justify-center gap-2">
              <Select
                label="Tema"
                size="sm"
                isDisabled={!selectedDiscipline || isRunning}
                classNames={{
                  label: 'w-full text-medium',
                  popoverContent: 'bg-card border',
                  value: 'text-sm',
                }}
                radius="full"
                placeholder="Selecione um"
                variant="bordered"
                selectedKeys={[selectedSubject ?? '']}
                labelPlacement={'outside'}
                items={subjects ?? []}
                onChange={(e) => setSubject(e.target?.value)}
              >
                {(item) => (
                  <SelectItem
                    key={item.name}
                    className="capitalize"
                    textValue={item.name}
                  >
                    {item.name}
                  </SelectItem>
                )}
              </Select>
              <AddDisciplineSubject
                type="subject"
                disabled={!selectedDiscipline}
              />
            </div>
          </div>
        </div>
        <Timer />
      </CardBody>
    </Card>
  )
}
