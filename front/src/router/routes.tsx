import { Home } from '&front/screens/home'
import { Hello } from '&front/screens/hello'
import { Dashboard } from '&front/screens/dashboard'

import { RouteName } from './RouteName'

export const routes = [
  { name: RouteName.Home, path: '/', component: Home, secure: false },
  { name: RouteName.Hello, path: '/hello', component: Hello, secure: true },
  {
    name: RouteName.App,
    path: '/app',
    component: Dashboard,
    secure: true,
  },
]
