import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import Theme from './Theme'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('Theme Component', () => {
  it('renders the button with the correct icon for dark theme', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
    })

    render(<Theme />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })

  it('renders the button with the correct icon for light theme', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
    })

    render(<Theme />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('toggles theme on button click', () => {
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
