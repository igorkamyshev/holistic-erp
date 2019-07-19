import { observable, action, runInAction } from 'mobx'

import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { RouteName } from '&front/router/RouteName'
import { UserInfo } from '&shared/model/UserInfo'
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

  @action
  async telegramSignIn(telegramPayload: TelegramAuthPayload) {
    const token = await this.store.api.post<Token>('/user/auth/telegram')(
      telegramPayload,
    )

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  @action
  async internalSignIn(credentials: LoginPasswordCredentials) {
    const token = await this.store.api.post<Token>('/user/auth/login')(
      credentials,
    )

    this.saveToken(token)

    this.store.routerStore.navigate(RouteName.Hello)
  }

  @action
  async fetchUserInfo() {
    if (this.agencies === null) {
      const { agencies } = await this.store.api.get<UserInfo>(
        '/user/info/main',
      )()

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
