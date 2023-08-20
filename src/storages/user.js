import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useBearStore = create(
  persist((set, get) => ({
    bears: 0,
    user: null,
    getUser: () => get().user
  }), {
    name: 'user-storage',
    getStorage: () => localStorage
  })
)
export default useBearStore
