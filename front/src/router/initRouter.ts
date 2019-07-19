import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'

import { store } from '&front/store'

import { routes } from './routes'
import { RouteName } from './RouteName'
import { mobxPlugin } from './mobxPlugin'
import { userInfoMiddleware } from './middleware/userInfoMiddleware'
import { helloRedirectMiddleware } from './middleware/helloRedirectMiddleware'
import { autoLoginMiddleware } from './middleware/autoLoginMiddleware'
import { secureMiddleware } from './middleware/secureMiddleware'

export const initRouter = () => {
  const router = createRouter(routes, { defaultRoute: RouteName.Home })

  const plugins = [browserPlugin({ useHash: false }), mobxPlugin(store)]

  const middlewares: any[] = [
    secureMiddleware,
    autoLoginMiddleware,
    userInfoMiddleware,
    helloRedirectMiddleware,
  ]

  router.usePlugin(...plugins)

  router.useMiddleware(...middlewares)

  return router
}
