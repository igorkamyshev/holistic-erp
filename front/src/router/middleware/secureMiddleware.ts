import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'

export const secureMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  const loggedIn = await store.userStore.checkToken()

  const { secure } = toState as any

  if (secure && !loggedIn) {
    store.routerStore.replace(RouteName.Home)
  }
}
