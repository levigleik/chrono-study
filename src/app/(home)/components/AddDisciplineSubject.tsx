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
    <>
      <Button
        onPress={() => onOpenChange(!open)}
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
      <Modal isOpen={open} onOpenChange={onOpenChange}>
        {/*Adicionar {type === 'discipline' ? 'disciplina' : 'tema'}*/}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Adicionar {type === 'discipline' ? 'disciplina' : 'tema'}
              </ModalHeader>
              <ModalBody>
                <HighlightCard
                  title="Disicplina"
                  subtitle="Matemática"
                  icon={<IoBook size={36} className="text-white" />}
                />
                <Form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="grid gap-4"
                >
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        variant="bordered"
                        // label={type === 'discipline' ? 'disciplina' : 'tema'}
                        placeholder="Digite o nome"
                        label="Tema"
                        labelPlacement="outside"
                        radius="full"
                        classNames={{
                          inputWrapper: 'w-full',
                        }}
                        {...field}
                      />
                    )}
                  />
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  className="w-auto lg:flex-1"
                  aria-label={
                    type === 'discipline' ? 'Salvar disciplina' : 'Salvar tema'
                  }
                >
                  Salvar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
