import { RouterStore } from '&front/router/RouterStore'

import { ApplicationStore } from './ApplicationStore'
import { UserStore } from './UserStore'

export class RootStore implements ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore

  constructor() {
    this.routerStore = new RouterStore()
    this.userStore = new UserStore(this)
  }
}
