'use client'

import { disciplinesData } from '@/lib/discipline-data'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DisciplineState, StudySession, TimerState } from '../types'

interface TimerStore extends TimerState {
  sessions: StudySession[]
  setSubject: (subject: string) => void
  setDiscipline: (discipline: string) => void
  disciplines: DisciplineState[]
  addDiscipline: (discipline: string) => void
  // removeDiscipline: (disciplineName: string) => void
  addSubject: (disciplineName: string, subject: string) => void
  // removeSubject: (disciplineName: string, subject: string) => void
  startTimer: () => void
  pauseTimer: () => void
  resetTimer: () => void
  syncTimer: () => void
  saveSession: () => void
  clearSessions: () => void
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
      disciplines: disciplinesData,

      addDiscipline: (discipline) =>
        set((state) => ({
          disciplines: [
            ...state.disciplines,
            { name: discipline, subjects: [] },
          ],
          selectedDiscipline: discipline,
          selectedSubject: null,
        })),

      // removeDiscipline: (disciplineName) =>
      //   set((state) => ({
      //     disciplines: state.disciplines.filter(
      //       (discipline) => discipline.name !== disciplineName,
      //     ),
      //   })),

      addSubject: (disciplineName, subject) =>
        set((state) => ({
          disciplines: state.disciplines.map((discipline) =>
            discipline.name === disciplineName
              ? {
                  ...discipline,
                  subjects: [...discipline.subjects, subject],
                }
              : discipline,
          ),
          selectedSubject: subject,
        })),
      // removeSubject: (disciplineName, subject) =>
      //   set((state) => ({
      //     disciplines: state.disciplines.map((discipline) =>
      //       discipline.name === disciplineName
      //         ? {
      //             ...discipline,
      //             subjects: discipline.subjects.filter(
      //               (s) => s.name !== subject,
      //             ),
      //           }
      //         : discipline,
      //     ),
      //   })),

      setSubject: (subject) => {
        set({ selectedSubject: subject })
        if (get().elapsedTime > 0) get().resetTimer()
      },
      setDiscipline: (discipline) => {
        set({ selectedDiscipline: discipline })
        if (get().elapsedTime > 0) get().resetTimer()
      },

      startTimer: () => {
        const { isRunning } = get()
        if (isRunning) return

        const timestampStart = Date.now()
        set({ isRunning: true, timestampStart })
        localStorage.setItem(
          'timerState',
          JSON.stringify({
            ...get(),
            isRunning: true,
            timestampStart,
          }),
        )
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
        localStorage.setItem('timerState', JSON.stringify(get()))
      },

      resetTimer: () => {
        set({
          timestampStart: 0,
          elapsedTime: 0,
          isRunning: false,
          selectedSubject: null,
          selectedDiscipline: null,
        })
        localStorage.setItem('timerState', JSON.stringify(get()))
      },

      saveSession: () => {
        const state = get()
        const newElapsedTime =
          state.elapsedTime +
          (state.isRunning ? (Date.now() - state.timestampStart) / 1000 : 0)
        const totalTime = Math.floor(newElapsedTime)

        if (
          !state.selectedSubject ||
          !state.selectedDiscipline ||
          totalTime < 1
        )
          return

        const newSession: StudySession = {
          subject: state.selectedSubject,
          discipline: state.selectedDiscipline,
          duration: totalTime,
          timestamp: Date.now(),
        }

        set({
          sessions: [...state.sessions, newSession],
          timestampStart: 0,
          elapsedTime: 0,
          isRunning: false,
          selectedSubject: null,
          selectedDiscipline: null,
        })
        localStorage.setItem('timerState', JSON.stringify(get()))
      },

      syncTimer: () => {
        const savedState = JSON.parse(
          localStorage.getItem('timerState') || '{}',
        )
        set(savedState)
      },

      clearSessions: () => {
        set({ sessions: [] })
        localStorage.setItem('timerState', JSON.stringify(get()))
      },
    }),
    {
      name: 'study-timer-storage',
      version: 1,
    },
  ),
)

// Sincroniza o estado ao abrir ou mudar de aba
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'timerState') {
      useTimerStore.getState().syncTimer()
    }
  })
}
