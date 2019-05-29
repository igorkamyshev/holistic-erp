import { createApi } from '../api/createApi'

export const team = store => {
  store.on('@init', () => ({
    team: {
      data: null,
      loading: true,
    },
  }))

  store.on('team/set-data', (state, data) => ({
    team: {
      ...state.team,
      loading: false,
      data,
    },
  }))

  store.on('team/fetch', async state => {
    const api = createApi(state)

    const { data } = await api.get('/user/info/team')
    store.dispatch('team/set-data', data)
  })
}
