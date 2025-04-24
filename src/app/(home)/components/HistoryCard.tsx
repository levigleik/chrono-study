'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTimerStore } from '@/store/timerStore'
import { Button } from '@heroui/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { HistoryItem } from './HistoryItem'

export function HistoryCard() {
  const { sessions, clearSessions } = useTimerStore((state) => state)
  const dataSessionsSorted = sessions.sort((a, b) => b.timestamp - a.timestamp)

  const [showClearDialog, setShowClearDialog] = useState(false)

  return (
    <div className="flex grow flex-col">
      <div className="my-4 flex items-baseline justify-between">
        <div className="items flex w-full justify-between space-x-2">
          <h1 className="font-bold text-2xl text-secondary-500">Histórico</h1>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onPress={() => setShowClearDialog(true)}
              radius="full"
              color="danger"
              isIconOnly
              disabled={sessions.length === 0}
              variant="bordered"
              size="sm"
              aria-label="Excluir histórico"
            >
              {<TrashIcon size={16} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Excluir histórico</TooltipContent>
        </Tooltip>
      </div>
      <Card className="flex h-full max-h-[350px] w-full grow overflow-auto py-6">
        <CardContent className="overflow-auto px-6">
          {dataSessionsSorted.map((session) => (
            <HistoryItem key={session.timestamp} {...session} />
          ))}
          {dataSessionsSorted.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-300 text-sm">
                Nenhum histórico encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpar histórico</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja limpar todo o histórico?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="bordered"
              onPress={() => setShowClearDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                clearSessions()
                setShowClearDialog(false)
                toast.success('Histórico deletado com sucesso')
              }}
              variant="bordered"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
