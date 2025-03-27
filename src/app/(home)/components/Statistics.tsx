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

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { disciplinesData } from '@/lib/discipline-data'
import { useState } from 'react'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    time: 316,
    discipline: 'Matemática',
    subject: 'Cálculo Diferencial',
  },
  {
    id: '3u1reuv4',
    time: 242,
    discipline: 'Matemática',
    subject: 'Eletromagnetismo',
  },
  {
    id: 'derv1ws0',
    time: 837,
    discipline: 'História',
    subject: 'Álgebra Linear',
  },
  {
    id: '5kma53ae',
    time: 874,
    discipline: 'Matemática',
    subject: 'Idade Média',
  },
  {
    id: 'bhqecj4p',
    time: 721,
    discipline: 'Física',
    subject: 'Mecânica Clássica',
  },
]

export type Payment = {
  id: string
  time: number
  discipline: (typeof disciplinesData)[number]['discipline']
  subject: (typeof disciplinesData)[number]['subjects'][number]
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'discipline',
    header: () => <span className="font-bold">Disciplina</span>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('discipline')}</div>
    ),
  },
  {
    accessorKey: 'subject',
    header: () => <span className="font-bold">Tema</span>,
    cell: ({ row }) => <div>{row.getValue('subject')}</div>,
  },
  {
    accessorKey: 'time',
    header: ({ column }) => {
      return (
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
      )
    },
    cell: ({ row }) => {
      const time = parseFloat(row.getValue('time'))

      // Format the time as hours and minutes
      const formatted = `${Math.floor(time / 60)}h ${time % 60}m`

      return <div className="text-right font-bold">{formatted}</div>
    },
  },
]

export function Statistics() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-2xl font-bold">Estatísticas</h1>
      <Card className="flex h-[90dvh] w-full items-center py-6">
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
          <h3 className="mb-8 text-2xl font-bold">
            Disciplinas mais estudadas
          </h3>
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
                    className="h-24 text-center"
                  >
                    No results.
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
