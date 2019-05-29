import { createApi } from '../api/createApi'

export const user = store => {
  store.on('@init', () => ({
    user: {
      token: null,
      agencies: [],
      lastAgencyToken: null,
      error: null,
    },
  }))

  store.on('user/set-token', (state, token) => ({
    user: {
      ...state.user,
      token,
    },
  }))

  store.on('user/set-agencies', (state, agencies) => ({
    user: {
      ...state.user,
      agencies,
    },
  }))

  store.on('user/set-last-agency-token', (state, lastAgencyToken) => ({
    user: {
      ...state.user,
      lastAgencyToken,
    },
  }))

  store.on('user/error', (state, error) => ({
    user: {
      ...state.user,
      error,
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
      const response = await api.get('user/info/main')
      const { agencies } = response.data

      store.dispatch('user/set-agencies', agencies)
      store.dispatch('common/loaded')
    } catch (e) {
      if (e.response.status === 403) {
        store.dispatch('common/forbid')
        store.dispatch('user/set-token', null)
      } else {
        store.dispatch('user/error', e)
      }
    }
  })

  store.on('user/create-agency', async (state, data) => {
    const api = createApi(state)

    try {
      const response = await api.post('/agency/create', data)
      const { token } = response.data

      store.dispatch('user/set-last-agency-token', { token, name: data.name })
      store.dispatch('user/fetch-info')
    } catch (e) {
      store.dispatch('user/error', e)
    }
  })

  store.on('user/join-agency', async (state, data) => {
    const api = createApi(state)

    try {
      await api.post('/agency/join', data)
      store.dispatch('user/fetch-info')
    } catch (e) {
      store.dispatch('user/error', e)
    }
  })
}
