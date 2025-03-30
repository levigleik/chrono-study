import { StudySession } from '@/types'
import { render, screen } from '@testing-library/react'
import { HistoryItem } from '../components/HistoryItem'

describe('Componente HistoryItem', () => {
  const mockData: StudySession = {
    timestamp: 1672531200000, // 01/01/2023 00:00:00
    duration: 3665,
    discipline: 'Matemática',
    subject: 'Álgebra',
  }

  it('renderiza o componente com os dados corretos', () => {
    render(<HistoryItem {...mockData} />)

    const dateFormatted = new Date(mockData.timestamp).toLocaleDateString(
      'pt-BR',
      {
        timeZone: 'America/Sao_Paulo',
      },
    )
    const timeFormatted = new Date(mockData.timestamp).toLocaleTimeString(
      'pt-BR',
      {
        timeZone: 'America/Sao_Paulo',
      },
    )

    expect(screen.getByText('1h 1min')).toBeInTheDocument()
    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('Álgebra')).toBeInTheDocument()
    expect(screen.getByText(dateFormatted)).toBeInTheDocument()
    expect(screen.getByText(`às ${timeFormatted}`)).toBeInTheDocument()
  })

  it('renderiza a duração em minutos e segundos se for menor que uma hora', () => {
    const shortDurationData: StudySession = {
      ...mockData,
      duration: 125,
    }

    render(<HistoryItem {...shortDurationData} />)

    expect(screen.getByText('2min 5s')).toBeInTheDocument()
  })
})
