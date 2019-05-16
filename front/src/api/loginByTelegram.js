import { createApi } from './createApi'

export const loginByTelegram = async data => {
  const api = createApi()

  const response = await api.post('user/auth/telegram', data)

  console.log(response.data)
}
