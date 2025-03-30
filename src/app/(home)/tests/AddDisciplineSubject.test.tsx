import { AddDisciplineSubject } from '@/app/(home)/components/AddDisciplineSubject'
import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { render, screen } from '@testing-library/react'

// Mock das stores
jest.mock('@/store/timerStore', () => ({
  useTimerStore: jest.fn(),
}))

jest.mock('@/store/disciplineStore', () => ({
  useDisciplineStore: jest.fn(),
}))

describe('Componente AddDisciplineSubject', () => {
  const mockSetDiscipline = jest.fn()
  const mockSetSubject = jest.fn()
  const mockAddDiscipline = jest.fn()
  const mockAddSubject = jest.fn()
  const mockOnOpenChange = jest.fn()
  const onSubmit = jest.fn()
  const mockUseForm = jest.fn()
  beforeEach(() => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValue({
      setDiscipline: mockSetDiscipline,
      selectedDiscipline: 'Matemática',
      setSubject: mockSetSubject,
      isRunning: false,
    })
    ;(useDisciplineStore as unknown as jest.Mock).mockReturnValue({
      addDiscipline: mockAddDiscipline,
      addSubject: mockAddSubject,
    })
    ;(mockUseForm as unknown as jest.Mock).mockReturnValue({
      useForm: mockUseForm,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza o botão de adicionar e o formulário corretamente', () => {
    render(
      <AddDisciplineSubject
        open={false}
        onOpenChange={mockOnOpenChange}
        type="discipline"
        onSubmit={onSubmit}
      />,
    )

    const addButton = screen.getByRole('button', {
      name: /adicionar disciplina/i,
    })
    expect(addButton).toBeInTheDocument()
    expect(addButton).not.toBeDisabled()
  })

  it('desabilita o botão de adicionar quando o cronômetro está em execução', () => {
    ;(useTimerStore as unknown as jest.Mock).mockReturnValueOnce({
      setDiscipline: mockSetDiscipline,
      selectedDiscipline: 'Matemática',
      setSubject: mockSetSubject,
      isRunning: true,
    })

    render(
      <AddDisciplineSubject
        open={false}
        onOpenChange={mockOnOpenChange}
        type="discipline"
        onSubmit={onSubmit}
      />,
    )

    const addButton = screen.getByRole('button', {
      name: /adicionar disciplina/i,
    })
    expect(addButton).toBeDisabled()
  })
})
