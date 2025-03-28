'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { LabelList, Pie, PieChart } from 'recharts'

import { flexRender, type Table } from '@tanstack/react-table'

import {
  TableBody,
  TableCell,
  Table as TableComponent,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { columns } from './utils'

interface StatisticsCardProps {
  chartData?: {
    name: string
    duration: number
    fill: string
  }[]
  chartConfig: ChartConfig
  table?: Table<{ name: string; duration: number }>
}

export function StatisticsCard({
  chartData,
  chartConfig,
  table,
}: StatisticsCardProps) {
  return (
    <Card className="flex h-full items-center">
      <CardContent className="overflow-auto px-4">
        <h3 className="mb-8 text-lg font-bold">Disciplinas mais estudadas</h3>
        {chartData && chartData?.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-text]:fill-background mx-auto mb-8 aspect-square max-h-[240px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item) => (
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.payload.fill }}
                        />
                        <div>{name}</div>
                        <div>
                          {Math.floor(Number(value) / 3600) > 0
                            ? `${Math.floor(Number(value) / 3600)}h ${Math.floor((Number(value) % 3600) / 60)}min`
                            : `${Math.floor(Number(value) / 60)}min ${Number(value) % 60}s`}
                        </div>
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={chartData}
                dataKey="duration"
                nameKey="name"
                strokeWidth={10}
              >
                <LabelList
                  dataKey="browser"
                  className="fill-black"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.color
                  }
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        )}
        {chartData?.length === 0 && (
          <div className="flex h-24 items-center justify-center">
            <p className="text-sm text-gray-500">Nenhum histórico encontrado</p>
          </div>
        )}

        <h3 className="mb-8 text-lg font-bold">Temas mais estudados</h3>
        <TableComponent>
          <TableHeader>
            {table?.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-gray-500"
                >
                  Nenhum histórico encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </CardContent>
    </Card>
  )
}
