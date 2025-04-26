'use client'

import { useTimerStore } from '@/store/timerStore'
import {
  Alert,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from '@heroui/react'
import { Button, Card, CardBody } from '@heroui/react'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { FaExclamation, FaHistory } from 'react-icons/fa'
import { toast } from 'sonner'
import { HistoryItem } from './HistoryItem'

/**
 * Renderiza um componente de histórico de estudos, com um header e
 * uma lista de componentes {@link HistoryItem} que representam as
 * sess es de estudo realizadas.
 *
 * Tem um bot o de excluir histórico, que, quando clicado, abre um
 * di logo de confirma o. Se confirmado, o histórico   limpo com
 * sucesso e uma mensagem de sucesso   exibida.
 */
export function HistoryCard() {
  const { sessions, clearSessions } = useTimerStore((state) => state)
  const dataSessionsSorted = sessions.sort((a, b) => b.timestamp - a.timestamp)

  const [showClearDialog, setShowClearDialog] = useState(false)

  return (
    <>
      <Card className="!transition-shadow flex max-h-[350px] min-h-[300px] w-full grow overflow-auto border bg-card p-6 hover:shadow-large">
        <CardHeader className="flex items-baseline justify-between">
          <h1 className="font-bold text-2xl text-secondary-500 dark:text-foreground">
            Histórico
          </h1>
          <Tooltip content="Excluir histórico" placement="bottom-end">
            <Button
              onPress={() => setShowClearDialog(true)}
              radius="full"
              color="danger"
              isIconOnly
              isDisabled={sessions.length === 0}
              variant="bordered"
              size="sm"
              aria-label="Excluir histórico"
            >
              {<TrashIcon size={16} />}
            </Button>
          </Tooltip>
        </CardHeader>
        <CardBody>
          {dataSessionsSorted.map((session) => (
            <HistoryItem key={session.timestamp} {...session} />
          ))}
          {dataSessionsSorted.length === 0 && (
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <FaHistory size={60} className="text-secondary-500" />
              <span className="mt-2 font-semibold text-gray-600 text-lg">
                Nenhum histórico encontrado.
              </span>
              <span className="text-base text-gray-400">
                Registre seu tempo de estudo para ver o histórico.
              </span>
            </div>
          )}
        </CardBody>
      </Card>
      <Modal isOpen={showClearDialog} onOpenChange={setShowClearDialog}>
        <ModalContent>
          <ModalHeader>Limpar histórico</ModalHeader>
          <ModalBody>
            <Alert
              color="danger"
              title="Tem certeza de que deseja limpar todo o histórico?"
              icon={<FaExclamation size={24} className="text-danger" />}
              classNames={{
                base: 'items-center',
                iconWrapper: 'shadow-none bg-danger-50 border-none',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="bordered"
              onPress={() => setShowClearDialog(false)}
              color="danger"
            >
              Cancelar
            </Button>
            <Button
              onPress={() => {
                clearSessions()
                setShowClearDialog(false)
                toast.success('Histórico deletado com sucesso')
              }}
              color="secondary"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
