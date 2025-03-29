import { StudySession } from '@/types'

export function HistoryItem(data: StudySession) {
  const dateFormatted = new Date(data.timestamp).toLocaleDateString('pt-BR')
  return (
    <div className="mb-4 flex justify-between">
      <div className="flex gap-2 xl:gap-4">
        <div className="flex h-14 w-[100px] items-center justify-center place-self-center rounded-xl bg-blue-500 font-bold text-white">
          {Math.floor(data.duration / 3600) > 0
            ? `${Math.floor(data.duration / 3600)}h ${Math.floor((data.duration % 3600) / 60)}min`
            : `${Math.floor(data.duration / 60)}min ${data.duration % 60}s`}
        </div>
        <div>
          <p className="text-lg font-semibold">{data.discipline}</p>
          <p className="text-sm text-gray-300">{data.subject}</p>
        </div>
      </div>
      <div className="hidden flex-col justify-between text-right sm:flex">
        <p className="">{dateFormatted}</p>
        <p className="text-sm text-gray-300">
          às {new Date(data.timestamp).toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  )
}
