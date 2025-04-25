import { create } from 'zustand'
import type { TableHook, TableSearchProps } from './types'

export const useTableHook = create<TableHook>((set) => ({
  expandedColumns: [],
  setExpandedColumns: (columns) => set({ expandedColumns: columns }),
}))

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const useTableSearch = create<TableSearchProps<any>>((set, get) => ({
  search: '',
  setSearch: (search) => {
    set(() => ({ search }))
  },
  setData: (data) => {
    set(() => ({ data }))
  },
}))
