import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { store } from '&front/store'

import { routes } from './routes'
import { RouteName } from './RouteName'
import { mobxPlugin } from './mobxPlugin'

export const initRouter = () => {
  const router = createRouter(routes, { defaultRoute: RouteName.Home })

  router.usePlugin(
    browserPlugin({ useHash: false }),
    mobxPlugin(store.routerStore),
  )

  return router
}
