import type { StudySession } from '@/types'

export function HistoryItem(data: StudySession) {
  const dateFormatted = new Date(data.timestamp).toLocaleDateString('pt-BR')
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2 xl:gap-4">
        <div className="flex min-w-[130px] items-center justify-center place-self-center rounded-full border-2 border-secondary-500 px-4 py-3 font-semibold text-secondary-500">
          {Math.floor(data.duration / 3600) > 0
            ? `${Math.floor(data.duration / 3600)}h ${Math.floor((data.duration % 3600) / 60)}min`
            : `${Math.floor(data.duration / 60)}min ${data.duration % 60}s`}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{data.discipline}</p>
          <p className="text-foreground-500 text-sm">{data.subject}</p>
        </div>
      </div>
      <div className="hidden flex-col justify-between text-right sm:flex">
        <p className="">{dateFormatted}</p>
        <p className="text-foreground-500 text-sm">
          às {new Date(data.timestamp).toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
