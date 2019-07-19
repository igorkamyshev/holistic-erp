import { RouterStore } from '&front/router/RouterStore'

import { ApplicationStore } from './ApplicationStore'
import { UserStore } from './UserStore'
import { computed } from 'mobx'
import { ApiClient } from '&front/api/ApiClient'

export class RootStore implements ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore

  constructor() {
    this.routerStore = new RouterStore()
    this.userStore = new UserStore(this)
  }

  @computed
  get api() {
    return new ApiClient(this.userStore.token)
  }
}
