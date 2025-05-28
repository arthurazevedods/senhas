import { create } from 'zustand'
import type { Category, Ticket } from '@/models/ticket'

type StoreState = {
  queue: Ticket[]
  addTicket: (ticket: Ticket) => void
  removeAllQueue: () => void
  setQueue: (newQueue: Ticket[]) => void
}

const useStore = create<StoreState>((set) => ({
  queue: [],
  addTicket: (ticket) => set((state) => ({ queue: [...state.queue, ticket] })),
  removeAllQueue: () => set({ queue: [] }),
  setQueue: (newQueue) => set({ queue: newQueue }),
}))

export default useStore
