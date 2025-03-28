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

import { LabelList, Pie, PieChart } from 'recharts'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import Theme from '@/components/theme'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTimerStore } from '@/store/timerStore'
import { useEffect, useState } from 'react'
import { SubjectTable } from '../types'
import { calculateTopStudied } from '../utils'

export const columns: ColumnDef<SubjectTable>[] = [
  {
    accessorKey: 'name',
    header: () => <span className="font-bold">Disciplina</span>,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'totalDuration',
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
      const seconds = parseFloat(row.getValue('totalDuration'))
      const formatted = `${
        Math.floor(seconds / 3600) > 0
          ? `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}min`
          : `${Math.floor(seconds / 60)}min ${seconds % 60}s`
      }`

      return <div className="text-right font-bold">{formatted}</div>
    },
  },
]

export function StatisticsCard() {
  const [sorting, setSorting] = useState<SortingState>([])

  const data = useTimerStore((state) => state.sessions)

  const [topDisciplines, setTopDisciplines] = useState<SubjectTable[]>([])
  const [topSubjects, setTopSubjects] = useState<SubjectTable[]>([])

  useEffect(() => {
    setTopDisciplines(calculateTopStudied(data, 'discipline'))
    setTopSubjects(calculateTopStudied(data, 'subject'))
  }, [data])

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

  const chartData = topDisciplines.map((item, index) => ({
    name: item.name,
    duration: item.totalDuration,
    fill: `var(--chart-${index + 1})`,
  }))

  const chartConfig = topDisciplines.reduce(
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
        <h1 className="text-2xl font-bold">Estatísticas</h1>
        <Theme className="hidden lg:flex" />
      </div>
      <Card className="items-centerpy-6 flex h-full">
        <CardContent className="overflow-auto px-4">
          <h3 className="mb-8 text-lg font-bold">Disciplinas mais estudadas</h3>
          {chartData.length > 0 && (
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
          {chartData.length === 0 && (
            <div className="flex h-24 items-center justify-center">
              <p className="text-sm text-gray-500">
                Nenhum histórico encontrado
              </p>
            </div>
          )}

          {/* <div className="my-8 h-px w-full bg-gray-200" /> */}
          <h3 className="mb-8 text-lg font-bold">Temas mais estudados</h3>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows?.length ? (
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
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
