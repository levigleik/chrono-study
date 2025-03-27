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
      <h1 className="mb-4 text-2xl font-bold">Estatísticas</h1>
      <Card className="flex w-full items-center py-6 lg:h-[89dvh]">
        <CardContent className="w-full overflow-auto px-4 lg:w-2xl">
          <ChartContainer
            config={chartConfig}
            className="mx-auto mb-8 aspect-square max-h-[280px]"
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
          <div className="my-8 h-px w-full bg-gray-200" />
          <div className="flex flex-col">
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-between gap-2 xl:gap-4">
                <div className="flex h-12 w-12 items-center justify-center place-self-center rounded-full bg-blue-500 text-white">
                  123m
                </div>
                <div>
                  <p className="text-lg font-semibold">Matemática</p>
                  <p className="text-sm text-gray-500">Álgebra Linear</p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="">04/10/2023</p>
                <p className="text-sm text-gray-500">08:00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
