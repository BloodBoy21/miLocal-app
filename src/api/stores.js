import axios from 'axios'
const URL = import.meta.env.VITE_API_URL

const client = axios.create({
  baseURL: `${URL}/store`
})

export const getNearby = async ({
  lat,
  lon
}) => {
  const { data } = await client.get('/nearby', {
    params: {
      lat,
      lon
    }
  })
  return data
}

export const getStoreProducts = async (storeId, queryParams = {}) => {
  const { data } = await client.get(`/${storeId}/products`, {
    params: queryParams
  })
  return data
}

export const getStoreInfo = async (storeId) => {
  const { data } = await client.get(`/${storeId}`)
  return data
}
