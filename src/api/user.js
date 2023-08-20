import axios from 'axios'
const URL = import.meta.env.VITE_API_URL

const client = axios.create({
  baseURL: `${URL}/user`
})

export const login = async (body) =>
  await client.post('/login', body).then((res) => res.data)

export const register = async (body) =>
  await client.post('/register', body).then((res) => res.data)
