import { useTimerStore } from '@/store/timerStore'
import { fireEvent, render, screen } from '@testing-library/react'
import { toast } from 'sonner'
import { HistoryCard } from '../components/HistoryCard'

// Mock das stores e do toast
jest.mock('@/store/timerStore', () => ({
  useTimerStore: jest.fn(),
}))

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}))

describe('Componente HsitoryCard', () => {
  const mockClearSessions = jest.fn()

  beforeEach(() => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValue({
      sessions: [
        {
          timestamp: 1672531200000, // 01/01/2023 00:00:00
          duration: 3600,
          discipline: 'Matemática',
          subject: 'Álgebra',
        },
        {
          timestamp: 1672617600000, // 02/01/2023 00:00:00
          duration: 7200,
          discipline: 'História',
          subject: 'Idade Média',
        },
      ],
      clearSessions: mockClearSessions,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o componente corretamente', () => {
    render(<HistoryCard />)

    expect(screen.getByText('Histórico')).toBeInTheDocument()
    expect(screen.getByLabelText('Excluir histórico')).toBeInTheDocument()
  })

  it('displays a message when the history is empty', () => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValueOnce({
      sessions: [],
      clearSessions: mockClearSessions,
    })

    render(<HistoryCard />)

    expect(screen.getByText('Nenhum histórico encontrado')).toBeInTheDocument()
    expect(screen.getByLabelText('Excluir histórico')).toBeDisabled()
  })

  it('renderiza os items de histórico corretamente', () => {
    render(<HistoryCard />)

    expect(screen.getByText('Matemática')).toBeInTheDocument()
    expect(screen.getByText('Álgebra')).toBeInTheDocument()
    expect(screen.getByText('História')).toBeInTheDocument()
    expect(screen.getByText('Idade Média')).toBeInTheDocument()
  })

  it('limpa o histórico quando clicado no botão confirmar', () => {
    render(<HistoryCard />)

    const deleteButton = screen.getByLabelText('Excluir histórico')
    fireEvent.click(deleteButton)

    const confirmButton = screen.getByText('Confirmar')
    fireEvent.click(confirmButton)

    expect(mockClearSessions).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith('Histórico deletado com sucesso')
  })

  it('cancela a limpeza ao clicar no botão cancelar', () => {
    render(<HistoryCard />)

    const deleteButton = screen.getByLabelText('Excluir histórico')
    fireEvent.click(deleteButton)

    const cancelButton = screen.getByText('Cancelar')
    fireEvent.click(cancelButton)

    expect(mockClearSessions).not.toHaveBeenCalled()
  })
})
