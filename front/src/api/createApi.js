import axios from 'axios'

import { getFromStore } from '../helpers/getFromStore'
import { user } from '../stores/user'

export const createApi = () => {
  const { token } = getFromStore(user)

  const authHeaders = !!token ? { Authorization: `Bearer ${token}` } : {}

  // rollup magic!
  return axios.create({
    baseURL: 'backUrl',
    headers: authHeaders,
  })
}
