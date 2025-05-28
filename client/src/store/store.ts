import { create } from 'zustand'
import type { Category, Ticket } from '@/models/ticket'

type StoreState = {
  queue: Ticket[]
  chamadas: Ticket[]
  addTicket: (ticket: Ticket) => void
  removeAllQueue: () => void
  setQueue: (newQueue: Ticket[]) => void
  setChamadas: (newChamadas: Ticket[]) => void
}

const useStore = create<StoreState>((set) => ({
  queue: [],
  chamadas: [],
  addTicket: (ticket) => set((state) => ({ queue: [...state.queue, ticket] })),
  removeAllQueue: () => set({ queue: [] }),
  setQueue: (newQueue) => set({ queue: newQueue }),
  setChamadas: (newChamadas) => set({ chamadas: newChamadas }),
}))

export default useStore
