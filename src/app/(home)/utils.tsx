import { Button } from '@/components/ui/button'
import type { StudySession, SubjectTable } from '@/types'
import { ArrowUpDown } from 'lucide-react'

export const calculateTopStudied = (
  sessions: StudySession[],
  type: 'subject' | 'discipline',
) => {
  const studyMap = new Map<string, number>()

  for (const session of sessions) {
    const key = session[type]
    studyMap.set(key, (studyMap.get(key) || 0) + session.duration)
  }

  return Array.from(studyMap.entries())
    .map(([name, duration]) => ({ name, duration }))
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5)
}

import type { ColumnProps } from '@/components/table/types'

export const columns: ColumnProps<SubjectTable>[] = [
  {
    uid: 'name',
    label: 'Nome',
  },
  {
    uid: 'duration',
    label: 'Tempo',
    sortable: true,
    renderCell(item) {
      const seconds = Number(item.duration)
      const formatted = `${
        Math.floor(seconds / 3600) > 0
          ? `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}min`
          : `${Math.floor(seconds / 60)}min ${seconds % 60}s`
      }`

      return <div className="text-right font-bold">{formatted}</div>
    },
  },
]
