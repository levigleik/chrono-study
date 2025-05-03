import type { Meta, StoryObj } from '@storybook/react'
import { Timer } from '../app/(home)/components/Timer'
import { useTimerStore } from '../store/timerStore'
import { useEffect } from 'react'

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Timer para controle de sessões de estudo. Permite iniciar, pausar, resetar e salvar o tempo de estudo, exibindo o tempo decorrido em formato digital.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Timer>

export const Default: Story = {
  render: () => {
    // Decorator para inicializar o Zustand store com valores mockados
    useEffect(() => {
      useTimerStore.getState().setDiscipline('Matemática')
      useTimerStore.getState().setSubject('Álgebra')
    }, [])
    return <Timer />
  },
  name: 'Timer padrão',
}
