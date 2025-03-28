'use client'
import Theme from '@/components/theme'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { Timer } from './Timer'

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

  const subjects = disciplinesData.find(
    (discipline) => discipline.name === selectedDiscipline,
  )?.subjects

  const [showDisciplines, setShowDisciplines] = useState(false)
  const [showSubjects, setShowSubjects] = useState(false)

  const [disciplineInput, setDisciplineInput] = useState('')
  const [subjectInput, setSubjectInput] = useState('')

  const handleDisciplineChange = (value: string) => {
    setDiscipline(value)
    setSubject('')
  }
  const handlAddDiscipline = () => {
    if (!disciplineInput) return
    addDiscipline(disciplineInput)
    setDisciplineInput('')
    setDiscipline(disciplineInput)
    setSubject('')
    setShowDisciplines(false)
  }

  const handleAddSubject = () => {
    if (!selectedDiscipline) return
    if (!subjectInput) return
    addSubject(selectedDiscipline, subjectInput)
    setSubjectInput('')
    setSubject(subjectInput)
    setShowSubjects(false)
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div className="items flex w-full justify-between space-x-2">
          <h1 className="text-2xl font-bold">Chrono Study</h1>
        </div>
        <Theme className="flex lg:hidden" />
      </div>
      <Card className="flex justify-center">
        <CardContent className="flex min-h-[300px] flex-col justify-between">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-4">
              <span>Disciplina</span>
              <div className="flex gap-2">
                <Select
                  onValueChange={handleDisciplineChange}
                  value={selectedDiscipline || ''}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma disciplina" />
                  </SelectTrigger>
                  <SelectContent>
                    {disciplinesData?.length === 0 && (
                      <SelectItem value={'none'}>
                        Nenhuma disciplina encontrada
                      </SelectItem>
                    )}
                    {disciplinesData?.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover
                  open={showDisciplines}
                  onOpenChange={setShowDisciplines}
                >
                  <PopoverTrigger asChild>
                    <Button
                      onClick={() => setShowDisciplines(true)}
                      className="rounded-full"
                      size="icon"
                      disabled={isRunning}
                    >
                      {<PlusIcon />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="leading-none font-medium">
                          Adicionar disciplina
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input
                          className="col-span-2 h-8"
                          placeholder="Nome da disciplina"
                          value={disciplineInput}
                          onChange={(e) => setDisciplineInput(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        className="w-auto lg:flex-1"
                        onClick={handlAddDiscipline}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <span>Tema</span>
              <div className="flex gap-2">
                <Select
                  onValueChange={setSubject}
                  value={selectedSubject || ''}
                  disabled={!selectedDiscipline}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um tema" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects?.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                    {subjects?.length === 0 && (
                      <SelectItem value={'none'} disabled>
                        Nenhum tema encontrado
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Popover open={showSubjects} onOpenChange={setShowSubjects}>
                  <PopoverTrigger asChild>
                    <Button
                      onClick={() => setShowSubjects(true)}
                      className="rounded-full"
                      size="icon"
                      disabled={isRunning || !selectedDiscipline}
                    >
                      {<PlusIcon />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="leading-none font-medium">
                          Adicionar tema
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Input
                          className="col-span-2 h-8"
                          placeholder="Nome do tema"
                          value={subjectInput}
                          onChange={(e) => setSubjectInput(e.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        className="w-auto lg:flex-1"
                        disabled={!selectedDiscipline}
                        onClick={handleAddSubject}
                      >
                        Adicionar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <Timer />
        </CardContent>
      </Card>
    </div>
  )
}
