'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DisciplineState } from '../types'
import { disciplinesData } from '@/lib/discipline-data'

interface DisciplineStore {
  disciplines: DisciplineState[]
  addDiscipline: (discipline: string) => void
  // removeDiscipline: (disciplineName: string) => void
  addSubject: (disciplineName: string, subject: string) => void
  // removeSubject: (disciplineName: string, subject: string) => void
}

export const useDisciplineStore = create<DisciplineStore>()(
  persist(
    (set) => ({
      disciplines: disciplinesData,

      addDiscipline: (discipline) =>
        set((state) => ({
          disciplines: [
            ...state.disciplines,
            { name: discipline, subjects: [] },
          ],
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
    }),
    {
      name: 'study-discipline-storage',
      version: 1,
    },
  ),
)
