import axios from 'axios'

export const createApi = () => {
  const { token } = {}

  const authHeaders = !!token ? { Authorization: `Bearer ${token}` } : {}

  // rollup magic!
  return axios.create({
    baseURL: 'backUrl',
    headers: authHeaders,
  })
}
