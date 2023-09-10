import { useQuery } from '@tanstack/react-query'
import { getNearby, getStoreProducts, getStoreInfo } from '../api/stores'

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
export const useGetStoreProducts = (storeId, queryParams) => {
  return useQuery([KEY, storeId], () => getStoreProducts(storeId, queryParams), {
    enabled: !!storeId
  })
}

export const useGetAllStoreProducts = (storeId) => {
  return useQuery([KEY, storeId, 'all'], () => getStoreProducts(storeId), {
    enabled: !!storeId
  })
}

export const useGetStoreInfo = (storeId) => {
  return useQuery([KEY, storeId, 'info'], () => getStoreInfo(storeId), {
    enabled: !!storeId
  })
}
