import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { routerStore } from '&front/store/routerStore'

import { routes } from './routes'
import { RouteName } from './RouteName'
import { mobxPlugin } from './mobxPlugin'

export const initRouter = () => {
  const router = createRouter(routes, { defaultRoute: RouteName.Home })

  router.usePlugin(browserPlugin({ useHash: false }), mobxPlugin(routerStore))

  return router
}
