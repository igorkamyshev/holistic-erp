import { observable, action, runInAction, computed } from 'mobx'

import { ApiClient } from '&front/api/ApiClient'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { Token } from '&shared/model/Token'

const TOKEN_LOCALSTORAGE_KEY = 'access-token'

class UserStore {
  @observable
  token: string | null = null

  constructor() {
    this.token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)
  }

  @computed
  get api() {
    return new ApiClient(this.token)
  }

  @action
  async telegramSignIn(telegramPayload: TelegramAuthPayload) {
    const { token } = await this.api.post<Token>('/user/auth/telegram')(
      telegramPayload,
    )

    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token)

    runInAction(() => {
      this.token = token
    })
  }
}

export const userStore = new UserStore()
