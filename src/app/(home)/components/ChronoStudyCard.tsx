// Original path: src/app/home/components/ChronoStudyCard.tsx
'use client'
import { Card, CardContent } from '@/components/ui/card'

import Theme from '@/components/theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { disciplinesData } from '@/lib/discipline-data'
import { useTimerStore } from '@/store/timerStore'
import { Timer } from './Timer'

export function ChronoStudyCard() {
  const { selectedSubject, setDiscipline, selectedDiscipline, setSubject } =
    useTimerStore()

  const subjects = disciplinesData.find(
    (discipline) => discipline.discipline === selectedDiscipline,
  )?.subjects

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-baseline justify-between">
        <div className="items flex justify-center space-x-2">
          <h1 className="text-2xl font-bold">Chrono Study</h1>
        </div>
        <Theme className="flex lg:hidden" />
      </div>
      <Card className="flex justify-center">
        <CardContent className="flex min-h-[300px] flex-col justify-between">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <span className="mb-2">Disiplina</span>
              <Select
                onValueChange={(e) => {
                  setDiscipline(e)
                  setSubject('')
                }}
                value={selectedDiscipline || ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {disciplinesData.map(({ discipline }) => (
                    <SelectItem key={discipline} value={discipline}>
                      {discipline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <span className="mb-2">Tema</span>
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
                </SelectContent>
              </Select>
            </div>
          </div>
          <Timer />
        </CardContent>
      </Card>
    </div>
  )
}
