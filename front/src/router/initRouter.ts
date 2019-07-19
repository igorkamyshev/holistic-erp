import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { store } from '&front/store'

import { routes } from './routes'
import { RouteName } from './RouteName'
import { mobxPlugin } from './mobxPlugin'
import { userInfoMiddleware } from './middleware/userInfoMiddleware'

export const initRouter = () => {
  const router = createRouter(routes, { defaultRoute: RouteName.Home })

  const plugins = [browserPlugin({ useHash: false }), mobxPlugin(store)]

  const middlewares: any[] = [userInfoMiddleware]

  router.usePlugin(...plugins)

  router.useMiddleware(...middlewares)

  return router
}
