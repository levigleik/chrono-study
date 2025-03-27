import { ChronoStudy } from './components/ChronoStudy'
import { History } from './components/History'
import { Statistics } from './components/Statistics'

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row xl:gap-8">
      <div className="flex flex-2/3 flex-col justify-between">
        <ChronoStudy />
        <History />
      </div>

      <div className="flex-1/3">
        <Statistics />
      </div>
    </div>
  )
}
