import { ChronoStudyCard } from './components/ChronoStudyCard'
import { HistoryCard } from './components/HistoryCard'
import { Statistics } from './components/Statistics'

export default function Home() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-8 px-2 py-6 sm:px-6 md:px-8 lg:flex-row">
      <div className="flex w-full flex-col lg:w-2/3">
        <ChronoStudyCard />
        <HistoryCard />
      </div>

      <div className="w-full flex-grow lg:max-w-1/3">
        <Statistics />
      </div>
    </div>
  )
}
