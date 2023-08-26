import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist((set, get) => ({
    user: null,
    getUser: () => get().user,
    location: {
      lat: null,
      lon: null
    },
    setLocation: (lat, lon) => set({ location: { lat, lon } }),
    stores: [],
    setStores: (stores = []) => set({ stores })
  }), {
    name: 'user-storage',
    getStorage: () => localStorage
  })
)
export default useUserStore
