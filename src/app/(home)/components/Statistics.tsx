'use client'

import type { ChartConfig } from '@/components/ui/chart'

import {
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Theme from '@/app/(home)/components/Theme'
import { useTimerStore } from '@/store/timerStore'
import { useMemo, useState } from 'react'
import { calculateTopStudied, columns } from '../utils'
import { StatisticsCard } from './StatisticsCard'

/**
 * Componente que exibe o card de estatísticas.
 */
export function Statistics() {
  const [sorting, setSorting] = useState<SortingState>([])

  const data = useTimerStore((state) => state.sessions)

  const topDisciplines = useMemo(
    () => calculateTopStudied(data, 'discipline'),
    [data],
  )

  const topSubjects = useMemo(
    () => calculateTopStudied(data, 'subject'),
    [data],
  )

  const table = useReactTable({
    data: topSubjects,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  })

  const chartData = topDisciplines?.map((item, index) => ({
    name: item.name,
    duration: item.duration,
    fill: `var(--chart-${index + 1})`,
  }))

  const chartConfig = topDisciplines?.reduce(
    (config, item, index) => ({
      ...config,
      [item.name]: {
        label: item.name,
        color: `var(--chart-${index + 1})`,
      },
    }),
    { duration: { label: 'Tempo' } } as ChartConfig,
  )

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex justify-between">
        <h1 className="font-bold text-2xl text-secondary-500 dark:text-foreground">
          Estatísticas
        </h1>
        <Theme className="hidden lg:flex" />
      </div>
      <StatisticsCard
        table={table}
        chartData={chartData}
        chartConfig={chartConfig}
      />
    </div>
  )
}
