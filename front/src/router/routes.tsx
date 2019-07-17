import React from 'react'

import { Home } from '&front/screens/home'

import { RouteName } from './RouteName'

const Hello = () => {
  return <p>hello</p>
}

export const routes = [
  { name: RouteName.Home, path: '/', component: Home },
  { name: RouteName.Hello, path: '/hello', component: Hello },
]
