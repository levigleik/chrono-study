import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { fireEvent, render, screen } from '@testing-library/react'
import { ChronoStudyCard } from '../components/ChronoStudyCard'

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

    expect(screen.getByLabelText('Disciplina')).toBeInTheDocument()
    expect(screen.getByLabelText('Tema')).toBeInTheDocument()
  })

  it('adds a new discipline', () => {
    render(<ChronoStudyCard />)

    const addButton = screen.getByLabelText('Adicionar disciplina')
    fireEvent.click(addButton)

    const input = screen.getByPlaceholderText('Digite o nome')
    fireEvent.change(input, { target: { value: 'Física' } })

    const saveButton = screen.getByLabelText('Salvar disciplina')
    fireEvent.click(saveButton)

    // Asserção extra: verifica se a função de adicionar disciplina foi chamada corretamente
    expect(mockAddDiscipline).toHaveBeenCalledWith('Física')
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

    // Asserção extra: verifica se a função de adicionar tema foi chamada corretamente
    expect(mockAddSubject).toHaveBeenCalledWith('Matemática', 'Trigonometria')
  })
})
