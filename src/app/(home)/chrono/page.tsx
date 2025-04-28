import { unstable_ViewTransition as ViewTransition } from 'react'
import { ChronoStudyCard } from '../components/ChronoStudyCard'
import { HistoryCard } from '../components/HistoryCard'
import { Statistics } from '../components/Statistics'
import { StatisticsCard } from '../components/StatisticsCard'

export default function Chrono() {
  return (
    <>
      <ViewTransition name="chrono-card">
        <div className="m-auto flex max-w-[1440px] flex-col gap-8 px-2 py-6 sm:px-6 md:px-8">
          <ChronoStudyCard
            classNameCard="h-[80dvh]"
            classNameBody="justify-between"
          />
          <Statistics />
          <HistoryCard />
        </div>
      </ViewTransition>
    </>
  )
}
