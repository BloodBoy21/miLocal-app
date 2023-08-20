import { useQueryClient, useMutation } from '@tanstack/react-query'
import { register, login } from '../api/user'

const KEY = 'user'

export const UseRegister = () => {
  const queryClient = useQueryClient()
  return useMutation(register, {
    onSuccess: (userData) => {
      queryClient.invalidateQueries([KEY])
      queryClient.setQueriesData([KEY], userData)
    }
  })
}

export const UseLogin = () => {
  const queryClient = useQueryClient()
  return useMutation(login, {
    onSuccess: (userData) => {
      queryClient.invalidateQueries([KEY])
      queryClient.setQueriesData([KEY], userData)
    }
  })
}
