import { RouterStore } from '&front/router/RouterStore'
import { UserStore } from '&front/store/UserStore'
import { ApiClient } from '&front/api/ApiClient'

export interface ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore

  readonly api: ApiClient
}
