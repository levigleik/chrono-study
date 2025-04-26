// src/stores/focusStore.ts
import { create } from 'zustand'

type FocusStore = {
  divRef: HTMLDivElement | null
  setDivRef: (ref: HTMLDivElement) => void
  focusDiv: () => void
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  divRef: null,
  setDivRef: (ref: HTMLDivElement) => set({ divRef: ref }),
  focusDiv: () => {
    const ref = get().divRef
    if (ref) ref.focus()
  },
}))
