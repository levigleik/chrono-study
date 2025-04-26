'use client'
import Theme from '@/app/(home)/components/Theme'

import { useDisciplineStore } from '@/store/disciplineStore'
import { useFocusStore } from '@/store/focusStore'
import { useTimerStore } from '@/store/timerStore'
import { Button, Card, CardBody, Select, SelectItem, cn } from '@heroui/react'
import { PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AddDisciplineSubject } from './AddDisciplineSubject'
import { Timer } from './Timer'

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
  } = useTimerStore()

  const {
    disciplines: disciplinesData,
    addDiscipline,
    addSubject,
  } = useDisciplineStore()

  const subjects = disciplinesData
    .find((discipline) => discipline.name === selectedDiscipline)
    ?.subjects?.map((name) => ({ name }))

  const [showDisciplines, setShowDisciplines] = useState(false)
  const [showSubjects, setShowSubjects] = useState(false)

  const setDivRef = useFocusStore((state) => state.setDivRef)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (divRef.current) {
      setDivRef(divRef.current)
    }
  }, [setDivRef])

  const handleSubmit = (
    values: { name: string },
    type: 'discipline' | 'subject',
  ) => {
    if (type === 'discipline') {
      addDiscipline(values.name)
      setDiscipline(values.name)
      setSubject('')
    } else {
      if (!selectedDiscipline) return
      addSubject(selectedDiscipline, values.name)
      setSubject(values.name)
    }
  }

  return (
    <Card
      ref={divRef}
      tabIndex={-1}
      className={cn(
        '!transition-shadow flex min-h-fit w-full grow overflow-auto',
        'border bg-card p-6 duration-300 ease-in-out hover:shadow-large',
        'focus:border-secondary-500',
      )}
    >
      <CardBody>
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
              <AddDisciplineSubject
                open={showDisciplines}
                onOpenChange={setShowDisciplines}
                type="discipline"
                onSubmit={async (values) => handleSubmit(values, 'discipline')}
              />
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
                open={showSubjects}
                onOpenChange={setShowSubjects}
                type="subject"
                onSubmit={(values) => handleSubmit(values, 'subject')}
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
