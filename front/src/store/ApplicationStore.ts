import { RouterStore } from '&front/router/RouterStore'
import { ApiClient } from '&front/api/ApiClient'

import { UserStore } from './UserStore'
import { AgecnyStore } from './AgencyStore'

export interface ApplicationStore {
  readonly routerStore: RouterStore
  readonly userStore: UserStore
  readonly agencyStore: AgecnyStore

  readonly api: ApiClient
}
