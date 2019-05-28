import { createApi } from '../api/createApi'

export const user = store => {
  store.on('@init', () => ({
    user: {
      token: null,
      agencies: [],
    },
  }))

  store.on('user/set-token', ({ user }, token) => ({
    user: {
      ...user,
      token,
    },
  }))

  store.on('user/set-agencies', ({ user }, agencies) => ({
    user: {
      ...user,
      agencies,
    },
  }))

  store.on('user/login', async (_, data) => {
    const api = createApi()

    const response = await api.post('user/auth/telegram', data)
    const { token } = response.data

    store.dispatch('user/set-token', token)
  })

  store.on('user/fetch-info', async state => {
    const api = createApi(state)

    try {
      const response = await api.get('user/info')
      const { agencies } = response.data

      store.dispatch('user/set-agencies', agencies)
      store.dispatch('common/loaded')
    } catch (e) {
      if (e.response.status === 403) {
        store.dispatch('common/forbid')
        store.dispatch('user/set-token', null)
      } else {
        throw e
      }
    }
  })
}
