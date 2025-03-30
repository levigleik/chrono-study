import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import Theme from '../components/Theme'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('Component Theme', () => {
  it('renderiza o botão com o ícone correto para o tema escuro', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
    })

    render(<Theme />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })

  it('renderiza o botão com o ícone correto para o tema claro', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
    })

    render(<Theme />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('alterna o tema ao clicar no botão', () => {
    const setThemeMock = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock,
    })

    render(<Theme />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(setThemeMock).toHaveBeenCalledWith('light')
  })
})
