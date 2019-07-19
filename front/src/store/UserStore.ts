import { observable, action, runInAction, computed } from 'mobx'

import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { RouteName } from '&front/router/RouteName'
import { UserInfo } from '&shared/model/UserInfo'
import { ApiClient } from '&front/api/ApiClient'
import { Token } from '&shared/model/Token'

import { ApplicationStore } from './ApplicationStore'

const TOKEN_LOCALSTORAGE_KEY = 'access-token'

export class UserStore {
  @observable
  token: string | null = null

  @observable
  agencies: string[] | null = null

  constructor(private readonly store: ApplicationStore) {
    this.token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
  }

  @computed
  get api() {
    return new ApiClient(this.token)
  }

  @action
  async telegramSignIn(telegramPayload: TelegramAuthPayload) {
    const token = await this.api.post<Token>('/user/auth/telegram')(
      telegramPayload,
    )

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  @action
  async internalSignIn(credentials: LoginPasswordCredentials) {
    const token = await this.api.post<Token>('/user/auth/login')(credentials)

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  @action
  async fetchUserInfo() {
    if (this.agencies === null) {
      const { agencies } = await this.api.get<UserInfo>('/user/info/main')()

      runInAction(() => {
        this.agencies = agencies
      })
    }
  }

  @action
  private saveToken = ({ token }: Token) => {
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token)

    runInAction(() => {
      this.token = token
    })
  }
}
