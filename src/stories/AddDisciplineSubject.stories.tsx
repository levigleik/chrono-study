import type { Meta, StoryObj } from '@storybook/react'
import { AddDisciplineSubject } from '../app/(home)/components/AddDisciplineSubject'
import { useTimerStore } from '../store/timerStore'
import { useEffect } from 'react'

const meta: Meta<typeof AddDisciplineSubject> = {
  title: 'Components/AddDisciplineSubject',
  component: AddDisciplineSubject,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente para adicionar disciplinas ou temas (subjects) via popover. Usa Zustand para gerenciar o estado global. O tipo determina se adiciona disciplina ou tema.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof AddDisciplineSubject>

export const AdicionarDisciplina: Story = {
  render: () => <AddDisciplineSubject type="discipline" />,
  name: 'Adicionar disciplina',
}

export const AdicionarTema: Story = {
  render: () => {
    // Inicializa Zustand para garantir que selectedDiscipline está setado
    useEffect(() => {
      useTimerStore.getState().setDiscipline('Matemática')
    }, [])
    return <AddDisciplineSubject type="subject" />
  },
  name: 'Adicionar tema',
}
