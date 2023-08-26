import { useQuery } from '@tanstack/react-query'
import { getNearby } from '../api/stores'

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
