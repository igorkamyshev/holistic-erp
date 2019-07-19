import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'

export const autoLoginMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  const alreadyLoggedIn = await store.userStore.checkToken()

  if (toState.name === RouteName.Home && alreadyLoggedIn) {
    store.routerStore.replace(RouteName.Hello)
  }

  return true
}
