import { createApi } from './createApi'

export const loginByTelegram = async (id, user, security) => {
  const api = createApi()

  console.log('START')
  const response = await api.post('', {
    id,
    user,
    security,
  })
  console.log('END')

  const success = Math.random() > 0.5

  return success
}
