import { RouterStore } from '&front/router/RouterStore'
import { UserStore } from '&front/store/UserStore'

export interface ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore
}
