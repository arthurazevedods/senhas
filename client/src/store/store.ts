import { create } from 'zustand'

type StoreState = {
  queue: string[]
  addPriorite: (priorite: string) => void
  removeAllQueue: () => void
  setQueue: (newqueue: string[]) => void
}

const useStore = create<StoreState>((set) => ({
  queue: [],
  addPriorite: (priorite) => set((state) => ({ queue: [...state.queue, priorite] })),
  removeAllQueue: () => set({ queue: [] }),
  setQueue: (newqueue) => set({ queue: newqueue }),
}))

export default useStore
