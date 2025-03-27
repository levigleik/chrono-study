'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StudySession, TimerState } from '../types'

interface TimerStore extends TimerState {
  sessions: StudySession[]
  setSubject: (subject: string) => void
  setDiscipline: (discipline: string) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  saveSession: () => void
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      isRunning: false,
      timestampStart: 0,
      elapsedTime: 0,
      selectedSubject: null,
      selectedDiscipline: null,
      sessions: [],

      setSubject: (subject) => set({ selectedSubject: subject }),
      setDiscipline: (discipline) => set({ selectedDiscipline: discipline }),

      startTimer: () => {
        const { isRunning, timestampStart } = get()

        if (isRunning) return

        set({
          isRunning: true,
          timestampStart: timestampStart || Date.now(),
        })
      },

      pauseTimer: () => {
        const { isRunning, timestampStart, elapsedTime } = get()

        if (!isRunning || timestampStart === 0) return

        const newElapsedTime =
          elapsedTime + (Date.now() - timestampStart) / 1000

        set({
          isRunning: false,
          elapsedTime: newElapsedTime,
          timestampStart: 0,
        })
      },

      resetTimer: () =>
        set({
          timestampStart: 0,
          elapsedTime: 0,
          isRunning: false,
          selectedSubject: null,
          selectedDiscipline: null,
        }),

      saveSession: () => {
        const state = get()
        const newElapsedTime =
          state.elapsedTime + (Date.now() - state.timestampStart) / 1000
        const totalTime = Math.floor(newElapsedTime)

        if (
          !state.selectedSubject ||
          !state.selectedDiscipline ||
          totalTime < 1
        )
          return

        console.log('Saving session:')

        const newSession: StudySession = {
          subject: state.selectedSubject,
          discipline: state.selectedDiscipline,
          duration: totalTime,
          timestamp: Date.now(),
        }

        set((state) => ({
          sessions: [...state.sessions, newSession],
          timestampStart: 0,
          elapsedTime: 0,
          isRunning: false,
          selectedSubject: null,
          selectedDiscipline: null,
        }))
      },
    }),
    {
      name: 'study-timer-storage',
      version: 1,
    },
  ),
)
