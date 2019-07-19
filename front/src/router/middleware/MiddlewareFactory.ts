import { ApplicationStore } from '&front/store/ApplicationStore'
import { Router, State } from 'router5'

interface Deps {
  store: ApplicationStore
}

export type MiddlewareFactory = (
  router: Router,
  deps: Deps,
) => (toState: State, fromState: State, done: () => void) => void
