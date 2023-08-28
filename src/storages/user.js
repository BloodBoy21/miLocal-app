import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist((set, get) => ({
    user: {},
    getUser: () => get().user,
    setUser: (user = {}) => set({ user }),
    location: {
      lat: null,
      lon: null
    },
    setLocation: (lat, lon) => set({ location: { lat, lon } }),
    stores: [],
    setStores: (stores = []) => set({ stores }),
    logout: () => set({ user: {} })
  }), {
    name: 'user-storage'
  })
)
export default useUserStore
