'use client'

import { HighlightCard } from '@/app/(home)/components/HighlightCard'
import { useTimerStore } from '@/store/timerStore'
import {
  addToast,
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  toast,
  useDisclosure,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { IoBook } from 'react-icons/io5'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
})

type FormSchema = z.infer<typeof formSchema>

interface AddDisciplineSubjectProps {
  type: 'discipline' | 'subject'
  disabled?: boolean
}

/**
 * Componente que exibe o modal de adicionar disciplina ou tema.
 *
 * @param open - Booleano que controla a visibilidade do modal.
 * @param onOpenChange - Função que é chamada quando o estado de `open` muda.
 * @param type - Tipo de disciplina ou tema.
 * @param onSubmit - Função que é chamada quando o formulário é submetido.
 * @param disabled - Booleano que controla se o botão de adicionar está desabilitado.
 */
export function AddDisciplineSubject({
  type,
  disabled,
}: AddDisciplineSubjectProps) {
  const {
    isRunning,
    addDiscipline,
    addSubject,
    setSubject,
    selectedDiscipline,
    disciplines,
  } = useTimerStore()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    // errors: { name: { message: 'asd', type: 'min' } },
  })

  const { isOpen, onOpenChange, onClose } = useDisclosure()

  function handleSubmit(values: FormSchema) {
    if (type === 'discipline') {
      if (disciplines.find((d) => d.name === values.name)) {
        addToast({
          title: 'Disciplina já existe',
          color: 'danger',
        })
        return
      }
      addDiscipline(values.name)
    } else {
      if (!selectedDiscipline) return
      if (
        disciplines
          .find((d) => d.name === selectedDiscipline)
          ?.subjects.find((s) => s === values.name)
      ) {
        addToast({
          title: 'Tema já existe',
          color: 'danger',
        })
        return
      }
      addSubject(selectedDiscipline, values.name)
    }
    addToast({
      title:
        type === 'discipline' ? 'Disciplina adicionada' : 'Tema adicionado',
      color: 'success',
    })
    form.reset()
    onClose()
  }

  return (
    <Popover
      placement="bottom-end"
      classNames={{
        content: 'bg-card border',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger>
        <Button
          radius="full"
          isIconOnly
          size="sm"
          isDisabled={isRunning || disabled}
          variant="bordered"
          aria-label={`Adicionar ${
            type === 'discipline' ? 'disciplina' : 'tema'
          }`}
        >
          {<PlusIcon size={16} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm items-start gap-4 p-4">
        <div className="text-left font-semibold text-lg">
          {type === 'discipline' ? 'Nova disciplina' : 'Novo tema'}
        </div>
        {type === 'subject' && (
          <HighlightCard
            title="Disicplina"
            subtitle="Matemática"
            icon={<IoBook size={36} className="text-white" />}
          />
        )}
        <Form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid w-full gap-4"
        >
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                {...field}
                variant="bordered"
                placeholder={
                  type === 'discipline' ? 'Ex: Matemática' : 'Ex: Álgebra'
                }
                autoFocus
                radius="full"
                classNames={{
                  inputWrapper: 'w-full',
                }}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="w-auto text-foreground lg:flex-1"
            radius="full"
            variant="bordered"
            color="primary"
            aria-label={
              type === 'discipline' ? 'Salvar disciplina' : 'Salvar tema'
            }
          >
            Salvar
          </Button>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
