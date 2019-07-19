import { MiddlewareFactory } from './MiddlewareFactory'
import { RouteName } from '../RouteName'
import { routes } from '../routes'
import { State } from 'router5'

const isSecure = ({ name }: State) =>
  (routes.find(route => route.name === name) || { secure: false }).secure

export const secureMiddleware: MiddlewareFactory = (
  _1,
  { store },
) => async toState => {
  const loggedIn = await store.userStore.checkToken()

  if (isSecure(toState) && !loggedIn) {
    store.routerStore.replace(RouteName.Home)
  }
}
