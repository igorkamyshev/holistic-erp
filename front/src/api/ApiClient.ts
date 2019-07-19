import axios, { AxiosInstance } from 'axios'

import { getConfig } from '&front/utils/getConfig'

import { makeUrl } from './helpers/makeUrl'
import { Parameters } from './Parameters'

type Token = string | null

const { apiUrl } = getConfig()

export class ApiClient {
  private readonly axios: AxiosInstance

  constructor(token: Token) {
    this.axios = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  post = <Response>(suffix: string) => (data: object) =>
    this.axios.post(suffix, data).then(reponse => reponse.data as Response)

  get = <Response>(suffix: string) => (data: Parameters = {}) =>
    this.axios
      .get(makeUrl(suffix, data))
      .then(response => response.data as Response)
}
