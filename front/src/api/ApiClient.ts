import axios, { AxiosInstance } from 'axios'

import { getConfig } from '&front/utils/getConfig'

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
}
