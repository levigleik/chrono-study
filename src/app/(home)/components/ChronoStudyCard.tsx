'use client'
import Theme from '@/app/(home)/components/Theme'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { useState } from 'react'
import { AddDisciplineSubject } from './AddDisciplineSubject'
import { Timer } from './Timer'

export function ChronoStudyCard() {
  const { selectedSubject, setDiscipline, selectedDiscipline, setSubject } =
    useTimerStore()

  const { disciplines: disciplinesData } = useDisciplineStore()

  const subjects = disciplinesData.find(
    (discipline) => discipline.name === selectedDiscipline,
  )?.subjects

  const [showDisciplines, setShowDisciplines] = useState(false)
  const [showSubjects, setShowSubjects] = useState(false)

  const handleDisciplineChange = (value: string) => {
    setDiscipline(value)
    setSubject('')
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
                <AddDisciplineSubject
                  open={showDisciplines}
                  onOpenChange={setShowDisciplines}
                  type="discipline"
                />
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
                <AddDisciplineSubject
                  open={showSubjects}
                  onOpenChange={setShowSubjects}
                  type="subject"
                />
              </div>
            </div>
          </div>
          <Timer />
        </CardContent>
      </Card>
    </div>
  )
}
