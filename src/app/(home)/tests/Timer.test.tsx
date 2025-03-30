import { useTimerStore } from '@/store/timerStore'
import { fireEvent, render, screen } from '@testing-library/react'
import { Timer } from '../components/Timer'

// Mock do estado global
jest.mock('@/store/timerStore', () => ({
  useTimerStore: jest.fn(),
}))

// Mock do toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}))

describe('Timer Component', () => {
  const mockStartTimer = jest.fn()
  const mockPauseTimer = jest.fn()
  const mockResetTimer = jest.fn()
  const mockSaveSession = jest.fn()

  beforeEach(() => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValue({
      isRunning: false,
      elapsedTime: 0,
      timestampStart: 0,
      selectedSubject: 'Matemática',
      selectedDiscipline: 'Álgebra',
      startTimer: mockStartTimer,
      pauseTimer: mockPauseTimer,
      resetTimer: mockResetTimer,
      saveSession: mockSaveSession,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o cronômetro com o tempo inicial', () => {
    render(<Timer />)

    expect(screen.getByText('00:00:00')).toBeInTheDocument()
  })

  it('inicia o cronômetro ao clicar no botão "Iniciar"', () => {
    render(<Timer />)

    const startButton = screen.getByRole('button', { name: /iniciar/i })
    fireEvent.click(startButton)

    expect(mockStartTimer).toHaveBeenCalled()
  })

  it('pausa o cronômetro ao clicar no botão "Pausar"', () => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValue({
      isRunning: true,
      elapsedTime: 120,
      timestampStart: Date.now(),
      selectedSubject: 'Matemática',
      selectedDiscipline: 'Álgebra',
      startTimer: mockStartTimer,
      pauseTimer: mockPauseTimer,
      resetTimer: mockResetTimer,
      saveSession: mockSaveSession,
    })

    render(<Timer />)

    const pauseButton = screen.getByRole('button', { name: /pausar/i })
    fireEvent.click(pauseButton)

    expect(mockPauseTimer).toHaveBeenCalled()
  })
})
