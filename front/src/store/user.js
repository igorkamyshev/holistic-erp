import { createApi } from '../api/createApi'

export const user = store => {
  store.on('@init', () => ({ user: { token: null, error: false } }))

  store.on('success', (state, token) => ({
    ...state,
    user: { token, error: false },
  }))
  store.on('failure', state => ({
    ...state,
    user: { token: null, error: true },
  }))

  store.on('login', async (_, data) => {
    const api = createApi()

    try {
      const response = await api.post('user/auth/telegram', data)
      store.dispatch('success', response.data.token)
    } catch (e) {
      store.dispatch('error')
    }
  })
}
