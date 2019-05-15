import { createApi } from './createApi'

export const loginByTelegram = async data => {
  const api = createApi()

  console.log('START')
  const response = await api.post('', data)
  console.log('END')

  const success = Math.random() > 0.5

  return success
}
