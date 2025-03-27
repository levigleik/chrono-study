import { ChronoStudyCard } from './components/ChronoStudyCard'
import { HistoryCard } from './components/HistoryCard'
import { StatisticsCard } from './components/StatisticsCard'

export default function Home() {
  return (
    <div className="m-auto flex max-w-7xl flex-col gap-8 px-2 py-6 sm:px-6 md:px-8 lg:flex-row">
      <div className="flex w-full flex-col lg:w-4/6">
        <ChronoStudyCard />
        <div className="overflow-y-auto">
          <HistoryCard />
        </div>
      </div>

      <div className="w-full flex-grow lg:max-w-1/3">
        <StatisticsCard />
      </div>
    </div>
  )
}
