'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTimerStore } from '@/store/timerStore'
import { Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
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
}

export function AddDisciplineSubject({
  open,
  onOpenChange,
  type,
  onSubmit,
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
    <Popover open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button
              onPress={() => onOpenChange(!open)}
              radius="full"
              isIconOnly
              size="sm"
              disabled={isRunning}
              variant="bordered"
              aria-label={`Adicionar ${
                type === 'discipline' ? 'disciplina' : 'tema'
              }`}
            >
              {<PlusIcon size={16} />}
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent side="bottom">
          Adicionar {type === 'discipline' ? 'disciplina' : 'tema'}
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>
                    Adicionar {type === 'discipline' ? 'disciplina' : 'tema'}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-auto lg:flex-1"
              aria-label={
                type === 'discipline' ? 'Salvar disciplina' : 'Salvar tema'
              }
            >
              Salvar
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
