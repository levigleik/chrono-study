import type { Meta, StoryObj } from '@storybook/react'
import { FaBook, FaCheck, FaClock } from 'react-icons/fa'
import { IoBook, IoBookmark } from 'react-icons/io5'
import { HighlightCard } from '../app/(home)/components/HighlightCard'

const meta: Meta<typeof HighlightCard> = {
  title: 'Components/HighlightCard',
  component: HighlightCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de destaque para exibir informações resumidas de sessão, matéria, disciplina, etc. Usa o componente Alert estilizado.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof HighlightCard>

export const Default: Story = {
  render: () => (
    <HighlightCard
      title="Disciplina"
      subtitle="Matemática"
      icon={<IoBook size={30} className="text-secondary" />}
    />
  ),
  name: 'Com disciplina',
}

export const ComTema: Story = {
  render: () => (
    <HighlightCard
      title="Tema"
      subtitle="Álgebra"
      icon={<IoBookmark size={30} className="text-secondary" />}
    />
  ),
  name: 'Com tema',
}

export const ComTempo: Story = {
  render: () => (
    <HighlightCard
      title="Tempo de estudo"
      subtitle="00:42:00"
      icon={<FaClock size={30} className="text-secondary" />}
    />
  ),
  name: 'Com tempo',
}
