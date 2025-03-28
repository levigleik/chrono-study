import { Button } from '@/components/ui/button'
import { StudySession, SubjectTable } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
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
    .slice(0, 3)
}

export const columns: ColumnDef<SubjectTable>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-bold">Disciplina</span>,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-bold"
        >
          Tempo
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const seconds = parseFloat(row.getValue('duration'))
      const formatted = `${
        Math.floor(seconds / 3600) > 0
          ? `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}min`
          : `${Math.floor(seconds / 60)}min ${seconds % 60}s`
      }`

      return <div className="text-right font-bold">{formatted}</div>
    },
  },
]
