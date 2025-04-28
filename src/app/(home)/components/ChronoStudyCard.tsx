'use client'

import TitlebarButtons from '@/components/TitlebarButtons'
import { useFocusStore } from '@/store/focusStore'
import { useTimerMinimized } from '@/store/timerMinimized'
import { useTimerStore } from '@/store/timerStore'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Tooltip,
  addToast,
  cn,
} from '@heroui/react'
import { useEffect, useRef } from 'react'
import { FaTrash } from 'react-icons/fa'
import { AddDisciplineSubject } from './AddDisciplineSubject'
import { Timer } from './Timer'

/**
 * Componente que exibe o card do Chrono Study.
 */

export function ChronoStudyCard({
  classNameCard,
  classNameBody,
}: {
  classNameCard?: string
  classNameBody?: string
}) {
  const {
    selectedSubject,
    setDiscipline,
    selectedDiscipline,
    removeDiscipline,
    removeSubject,
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

  const handleRemoveDiscipline = (disciplineName: string) => {
    removeDiscipline(disciplineName)
    addToast({
      title: 'Disciplina removida',
      color: 'success',
    })
  }

  const handleRemoveSubject = (disciplineName: string, subject: string) => {
    removeSubject(disciplineName, subject)
    addToast({
      title: 'Tema removido',
      color: 'success',
    })
  }

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
      <CardBody className={cn('justify-between p-6', classNameBody)}>
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
                listboxProps={{
                  emptyContent: 'Nenhuma disciplina encontrada',
                }}
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
                    endContent={
                      <Tooltip
                        content="Deletar disciplina"
                        placement="bottom-end"
                      >
                        <Button
                          variant="light"
                          size="sm"
                          isIconOnly
                          radius="full"
                          color="danger"
                          onPress={() => handleRemoveDiscipline(item.name)}
                        >
                          <FaTrash />
                        </Button>
                      </Tooltip>
                    }
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
                listboxProps={{
                  emptyContent: 'Nenhum tema encontrado',
                }}
                items={subjects ?? []}
                onChange={(e) => setSubject(e.target?.value)}
              >
                {(item) => (
                  <SelectItem
                    key={item.name}
                    className="capitalize"
                    textValue={item.name}
                    endContent={
                      <Tooltip content="Deletar tema" placement="bottom-end">
                        <Button
                          variant="light"
                          size="sm"
                          isIconOnly
                          radius="full"
                          color="danger"
                          onPress={() =>
                            handleRemoveSubject(
                              selectedDiscipline ?? '',
                              item.name,
                            )
                          }
                        >
                          <FaTrash />
                        </Button>
                      </Tooltip>
                    }
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
