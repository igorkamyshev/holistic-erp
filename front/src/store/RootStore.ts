import { computed } from 'mobx'

import { RouterStore } from '&front/router/RouterStore'
import { ApiClient } from '&front/api/ApiClient'

import { ApplicationStore } from './ApplicationStore'
import { UserStore } from './UserStore'
import { AgecnyStore } from './AgencyStore'

export class RootStore implements ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore
  readonly agencyStore: AgecnyStore

  constructor() {
    this.routerStore = new RouterStore()
    this.userStore = new UserStore(this)
    this.agencyStore = new AgecnyStore(this)
  }

  @computed
  get api() {
    return new ApiClient(this.userStore.token)
  }
}
