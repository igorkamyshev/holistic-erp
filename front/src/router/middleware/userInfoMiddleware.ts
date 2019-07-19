import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'

const excludedRoutes: string[] = [RouteName.Home]

export const userInfoMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  if (!excludedRoutes.includes(toState.name)) {
    await store.userStore.fetchUserInfo()
  }
}
