import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'

const allowedForUserWithoutAgency: string[] = [RouteName.Hello, RouteName.Home]

export const helloRedirectMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  const { primaryAgencyExists } = store.userStore

  if (toState.name === RouteName.Hello && primaryAgencyExists) {
    store.routerStore.replace(RouteName.App)
  }

  if (
    !allowedForUserWithoutAgency.includes(toState.name) &&
    !primaryAgencyExists
  ) {
    store.routerStore.replace(RouteName.Hello)
  }
}
