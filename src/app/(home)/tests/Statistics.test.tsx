import { ChartConfig } from '@/components/ui/chart'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { render, screen } from '@testing-library/react'
import { StatisticsCard } from '../components/StatisticsCard'

// Mock ResizeObserver for the test environment
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

import { Statistics } from '../components/Statistics'

const mockChartData = [
  { name: 'Matemática', duration: 7200, fill: '#ff0000' },
  { name: 'História', duration: 3600, fill: '#00ff00' },
]

const mockChartConfig: ChartConfig = {
  duration: { color: '#ff0000' },
}

// Criando colunas usando createColumnHelper
const columnHelper = createColumnHelper<{
  name: string
  duration: number
}>()
const columns = [
  columnHelper.accessor('name', {
    header: 'Disciplina',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('duration', {
    header: 'Tempo Total',
    cell: (info) => `${Math.floor(Number(info.getValue()) / 60)}min`,
  }),
]

// Componente Wrapper para inicializar a tabela corretamente
function StatisticsCardWrapper({
  chartData,
}: {
  chartData: { name: string; duration: number; fill: string }[]
}) {
  const table = useReactTable({
    data: chartData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <StatisticsCard
      chartData={chartData}
      chartConfig={mockChartConfig}
      table={table}
    />
  )
}

describe('Componente StatisticsCard', () => {
  it('renderiza o título e o botão de tema', () => {
    render(<Statistics />)
    expect(screen.getByText('Estatísticas')).toBeInTheDocument()
    expect(
      screen.queryByTestId('sun-icon') || screen.queryByTestId('moon-icon'),
    ).toBeInTheDocument()
  })

  it('renderiza o gráfico de pizza quando chartData é fornecido', () => {
    render(<StatisticsCardWrapper chartData={mockChartData} />)

    expect(screen.getByText('Disciplinas mais estudadas')).toBeInTheDocument()
    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('História')).toBeInTheDocument()
  })

  it('renderiza a tabela com os dados', () => {
    render(<StatisticsCardWrapper chartData={mockChartData} />)

    expect(screen.getByText('Temas mais estudados')).toBeInTheDocument()
    expect(screen.getByText('Disciplina')).toBeInTheDocument()
    expect(screen.getByText('Tempo Total')).toBeInTheDocument()
    expect(screen.getByText('120min')).toBeInTheDocument() // 7200s = 120min
    expect(screen.getByText('60min')).toBeInTheDocument() // 3600s = 60min
  })

  it('renderiza mensagem quando nenhum chartData está disponível', () => {
    render(<StatisticsCardWrapper chartData={[]} />)

    expect(screen.getAllByText('Nenhum histórico encontrado').length).toBe(2)
  })
})
