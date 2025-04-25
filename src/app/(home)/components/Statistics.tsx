'use client'

import type { ChartConfig } from '@/components/ui/chart'

import Theme from '@/app/(home)/components/Theme'
import { useTimerStore } from '@/store/timerStore'
import { useMemo, useState } from 'react'
import { calculateTopStudied, columns } from '../utils'
import { StatisticsCard } from './StatisticsCard'

/**
 * Componente que exibe o card de estatísticas.
 */
export function Statistics() {
  const data = useTimerStore((state) => state.sessions)

  const topDisciplines = useMemo(
    () => calculateTopStudied(data, 'discipline'),
    [data],
  )

  const topSubjects = useMemo(
    () => calculateTopStudied(data, 'subject'),
    [data],
  )

  const chartData = topDisciplines?.map((item, index) => ({
    name: item.name,
    duration: item.duration,
    fill: `var(--chart-${index + 1})`,
  }))

  const chartConfig = topDisciplines
    ? (Object.fromEntries(
        topDisciplines.map((item, index) => [
          item.name,
          {
            label: item.name,
            color: `var(--chart-${index + 1})`,
          },
        ]),
      ) as ChartConfig)
    : { duration: { label: 'Tempo' } }

  return (
    <div className="flex h-full flex-col">
      <StatisticsCard
        tableData={topSubjects}
        chartData={chartData}
        chartConfig={chartConfig}
      />
    </div>
  )
}
