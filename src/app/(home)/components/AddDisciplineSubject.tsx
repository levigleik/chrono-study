'use client'
import { Button } from '@/components/ui/button'
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
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDisciplineStore } from '@/store/disciplineStore'
import { useTimerStore } from '@/store/timerStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
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
}

export function AddDisciplineSubject({
  open,
  onOpenChange,
  type,
}: AddDisciplineSubjectProps) {
  const { setDiscipline, selectedDiscipline, setSubject, isRunning } =
    useTimerStore()

  const { addDiscipline, addSubject } = useDisciplineStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === 'discipline') {
      addDiscipline(values.name)
      setDiscipline(values.name)
      setSubject('')
    } else {
      if (!selectedDiscipline) return
      addSubject(selectedDiscipline, values.name)
      setSubject(values.name)
    }
    form.reset()
    onOpenChange(false)
  }

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={onOpenChange}>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onOpenChange(!open)}
                className="rounded-full"
                size="icon"
                disabled={isRunning}
                aria-label={`Adicionar ${
                  type === 'discipline' ? 'disciplina' : 'tema'
                }`}
              >
                {<PlusIcon />}
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent side="bottom">
            Adicionar {type === 'discipline' ? 'disciplina' : 'tema'}
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              <Button type="submit" className="w-auto lg:flex-1">
                Salvar
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
