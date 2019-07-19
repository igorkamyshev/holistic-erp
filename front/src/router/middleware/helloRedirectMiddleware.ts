import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'

export const helloRedirectMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  const { primaryAgencyExists } = store.userStore

  if (toState.name === RouteName.Hello && primaryAgencyExists) {
    store.routerStore.replace(RouteName.App)
  }
}
