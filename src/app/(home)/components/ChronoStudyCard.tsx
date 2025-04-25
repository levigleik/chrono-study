'use client'
import Theme from '@/app/(home)/components/Theme'

import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { Card, CardBody, Select, SelectItem } from '@heroui/react'
import { useState } from 'react'
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

  const handleDisciplineChange = (value: string) => {
    setDiscipline(value)
    setSubject('')
  }

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
    <div className="flex grow flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div className="items flex w-full justify-between space-x-2">
          <h1 className="font-bold text-2xl text-secondary-500 dark:text-foreground">
            Chrono Study
          </h1>
        </div>
        <Theme className="flex lg:hidden" />
      </div>
      <Card className="!transition-shadow flex h-full max-h-[350px] w-full grow overflow-auto border bg-card p-6 duration-300 ease-in-out hover:shadow-large">
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-4">
              <div className="mt-4 flex items-center justify-center gap-2">
                <Select
                  label={
                    <div className="mb-2 flex w-full items-center justify-between text-medium">
                      Disciplina
                      <AddDisciplineSubject
                        open={showDisciplines}
                        onOpenChange={setShowDisciplines}
                        type="discipline"
                        onSubmit={async (values) =>
                          handleSubmit(values, 'discipline')
                        }
                      />
                    </div>
                  }
                  classNames={{
                    label: 'w-full p-0',
                    popoverContent: 'bg-card border',
                    value: 'text-medium',
                  }}
                  radius="full"
                  placeholder="Selecione uma"
                  variant="bordered"
                  selectedKeys={[selectedDiscipline ?? '']}
                  labelPlacement={'outside'}
                  isDisabled={isRunning}
                  items={disciplinesData ?? []}
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
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="mt-4 flex items-center justify-center gap-2">
                <Select
                  label={
                    <div className="mb-2 flex w-full items-center justify-between text-medium">
                      Tema
                      <AddDisciplineSubject
                        open={showSubjects}
                        onOpenChange={setShowSubjects}
                        type="subject"
                        onSubmit={(values) => handleSubmit(values, 'subject')}
                        disabled={!selectedDiscipline}
                      />
                    </div>
                  }
                  isDisabled={!selectedDiscipline || isRunning}
                  classNames={{
                    label: 'w-full p-0',
                    value: 'text-medium',
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
              </div>
            </div>
          </div>
          <Timer />
        </CardBody>
      </Card>
    </div>
  )
}
