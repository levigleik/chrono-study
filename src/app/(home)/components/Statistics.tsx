'use client'
import { Card, CardContent } from '@/components/ui/card'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Pie, PieChart } from 'recharts'

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--chart-3)' },
  { browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'other', visitors: 190, fill: 'var(--chart-5)' },
]

const chartConfig = {
  visitors: {
    label: 'Estudos',
  },
  chrome: {
    label: 'Álgebra Linear',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Mecânica Clássica',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Revolução Francesa',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Cálculo Diferencial',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Eletromagnetismo',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function Statistics() {
  return (
    <div className="flex flex-col">
      <h1 className="my-2 text-2xl font-bold">Estatísticas</h1>
      <Card className="flex w-full items-center justify-center overflow-auto py-0 lg:max-h-[40dvh]">
        <CardContent className="w-full px-4 lg:w-2xl">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[280px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                strokeWidth={5}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
