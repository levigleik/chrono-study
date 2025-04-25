'use client'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'

import { HighlightCard } from '@/app/(home)/components/HighlightCard'
import { useTimerStore } from '@/store/timerStore'
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { IoBook } from 'react-icons/io5'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'É necessário preencher o campo.',
  }),
})

interface AddDisciplineSubjectProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'discipline' | 'subject'
  onSubmit: (values: z.infer<typeof formSchema>) => void
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
  open,
  onOpenChange,
  type,
  onSubmit,
  disabled,
}: AddDisciplineSubjectProps) {
  const { isRunning } = useTimerStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)
    toast.success(
      type === 'discipline'
        ? 'Disciplina adicionada com sucesso'
        : 'Tema adicionado com sucesso',
    )
    form.reset()
    onOpenChange(false)
  }

  return (
    <Popover
      placement="bottom-end"
      // showArrow
      classNames={{
        content: 'bg-card border',
      }}
    >
      <PopoverTrigger>
        <Button
          // onPress={() => onOpenChange(!open)}
          radius="full"
          isIconOnly
          size="sm"
          disabled={isRunning || disabled}
          variant="bordered"
          aria-label={`Adicionar ${
            type === 'discipline' ? 'disciplina' : 'tema'
          }`}
        >
          {<PlusIcon size={16} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm items-start gap-4 p-4">
        {(titleProps) => (
          <>
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
                    variant="bordered"
                    placeholder={
                      type === 'discipline' ? 'Ex: Matemática' : 'Ex: Álgebra'
                    }
                    autoFocus
                    // label={type === 'discipline' ? 'Disciplina' : 'Tema'}
                    // labelPlacement="outside"
                    radius="full"
                    isRequired
                    classNames={{
                      inputWrapper: 'w-full',
                    }}
                    // errorMessage={}
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
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
