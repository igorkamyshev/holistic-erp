import { observable, action } from 'mobx'
import { Router, State, NavigationOptions } from 'router5'

import { RouteName } from './RouteName'

export class RouterStore {
  @observable.ref route: State | null = null

  private router: Router | null = null

  setRouter = (router: Router) => {
    this.router = router
  }

  @action onTransitionSuccess = (route: State) => {
    this.route = route
  }

  navigate = (
    name: RouteName,
    params: Record<string, string | number | boolean>,
    opts: NavigationOptions,
  ) => {
    if (!this.router) {
      return
    }
    this.router.navigate(name, params, opts)
  }
}
