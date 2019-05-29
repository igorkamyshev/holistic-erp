import axios from 'axios'

export const createApi = token => {
  let realToken = token
  if (token && typeof token === 'object') {
    realToken = token.user.token
  }

  const authHeaders = !!realToken
    ? { Authorization: `Bearer ${realToken}` }
    : {}

  // rollup magic!
  return axios.create({
    baseURL: 'backUrl',
    headers: authHeaders,
  })
}
