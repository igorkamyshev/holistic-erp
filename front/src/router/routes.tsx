import React from 'react'

import { Home } from '&front/screens/home'
import { Hello } from '&front/screens/hello'

import { RouteName } from './RouteName'

export const routes = [
  { name: RouteName.Home, path: '/', component: Home },
  { name: RouteName.Hello, path: '/hello', component: Hello, secure: true },
  {
    name: RouteName.App,
    path: '/app',
    component: () => <p>app</p>,
    secure: true,
  },
]
