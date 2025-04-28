'use client'
import { motion } from 'framer-motion'
import { ChronoStudyCard } from '../components/ChronoStudyCard'
import { HistoryCard } from '../components/HistoryCard'
import { Statistics } from '../components/Statistics'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { TimerMinimized } from './TimerMinimized'
import { useTimerMinimized } from '@/store/timerMinimized'

export default function HomePage() {
  const { isMinimized } = useTimerMinimized()
  return (
    <>
      <motion.div
        className="flex w-full flex-col gap-8 lg:w-2/3"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0 }}
      >
        <ViewTransition name="chrono-card">
          {!isMinimized && <ChronoStudyCard />}
        </ViewTransition>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <HistoryCard />
        </motion.div>
      </motion.div>
      <motion.div
        className="w-full flex-grow lg:max-w-1/3"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Statistics />
      </motion.div>
    </>
  )
}
