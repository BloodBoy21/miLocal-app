import { useQuery } from '@tanstack/react-query'
import { getNearby, getStore, getStoreInfo } from '../api/stores'

const KEY = 'store'

export const useGetNearby = (
  lat, lon
) => {
  return useQuery([KEY], () => getNearby({
    lat,
    lon
  }), {
    enabled: !!lat && !!lon,
    refetchOnWindowFocus: false
  })
}
export const useGetStore = (storeId) => {
  return useQuery([KEY, storeId], () => getStore(storeId), {
    enabled: !!storeId
  })
}

export const useGetStoreInfo = (storeId) => {
  return useQuery([KEY, storeId, 'info'], () => getStoreInfo(storeId), {
    enabled: !!storeId
  })
}
