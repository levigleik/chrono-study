'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerMinimized {
  isMinimized: boolean
  setIsMinimized: (isMinimized: boolean) => void
}

export const useTimerMinimized = create<TimerMinimized>()(
  persist(
    (set) => ({
      isMinimized: false,
      setIsMinimized: (isMinimized) => set({ isMinimized }),
    }),
    {
      name: 'timer-minimized-storage',
      version: 1,
    },
  ),
)
