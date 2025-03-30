import { render, screen, fireEvent } from '@testing-library/react'
import { ChronoStudyCard } from '../components/ChronoStudyCard'
import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'

// Mock the stores
jest.mock('@/store/disciplineStore', () => ({
  useDisciplineStore: jest.fn(),
}))

jest.mock('@/store/timerStore', () => ({
  useTimerStore: jest.fn(),
}))

describe('ChronoStudyCard Component', () => {
  const mockSetDiscipline = jest.fn()
  const mockSetSubject = jest.fn()
  const mockAddDiscipline = jest.fn()
  const mockAddSubject = jest.fn()

  beforeEach(() => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValue({
      selectedDiscipline: '',
      selectedSubject: '',
      setDiscipline: mockSetDiscipline,
      setSubject: mockSetSubject,
    })
    ;(useDisciplineStore as unknown as jest.Mock).mockReturnValue({
      disciplines: [
        { name: 'Matemática', subjects: ['Álgebra', 'Geometria'] },
        { name: 'História', subjects: ['Idade Média', 'Renascimento'] },
      ],
      addDiscipline: mockAddDiscipline,
      addSubject: mockAddSubject,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component correctly', () => {
    render(<ChronoStudyCard />)

    expect(screen.getByText('Chrono Study')).toBeInTheDocument()
    expect(screen.getByText('Disciplina')).toBeInTheDocument()
    expect(screen.getByText('Tema')).toBeInTheDocument()
  })

  it('adds a new discipline', () => {
    render(<ChronoStudyCard />)

    const addButton = screen.getByLabelText('Adicionar disciplina')
    fireEvent.click(addButton)

    const input = screen.getByPlaceholderText('Digite o nome')
    fireEvent.change(input, { target: { value: 'Física' } })

    const saveButton = screen.getByLabelText('Salvar disciplina')
    fireEvent.click(saveButton)
  })

  it('adds a new subject', () => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValueOnce({
      selectedDiscipline: 'Matemática',
      selectedSubject: '',
      setDiscipline: mockSetDiscipline,
      setSubject: mockSetSubject,
    })

    render(<ChronoStudyCard />)

    const addButton = screen.getByLabelText('Adicionar tema')
    fireEvent.click(addButton)

    const input = screen.getByPlaceholderText('Digite o nome')
    fireEvent.change(input, { target: { value: 'Trigonometria' } })

    const saveButton = screen.getByLabelText('Salvar tema')
    fireEvent.click(saveButton)
  })
})
