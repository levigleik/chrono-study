// Original path: src/app/home/components/HistoryCard.tsx
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { useTimerStore } from '@/store/timerStore'
import { HistoryItem } from './HistoryItem'

export function HistoryCard() {
  const dataSessions = useTimerStore((state) => state.sessions)
  const dataSessionsSorted = dataSessions.sort(
    (a, b) => b.timestamp - a.timestamp,
  )
  return (
    <div className="flex grow flex-col">
      <div className="my-4 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">Histórico</h1>
      </div>
      <Card className="flex h-full max-h-[350px] w-full grow overflow-auto py-6">
        <CardContent className="overflow-auto px-6">
          {dataSessionsSorted.map((session) => (
            <HistoryItem key={session.timestamp} {...session} />
          ))}
          {dataSessionsSorted.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-gray-500">
                Nenhum histórico encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
