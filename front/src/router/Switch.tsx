import React from 'react'
import { useRoute } from 'react-router5'

import { routes } from './routes'

export const Switch = () => {
  const { route } = useRoute()

  if (!route) {
    return null
  }

  const currentRoute = routes.find(({ name }) => route.name === name)

  if (!currentRoute) {
    return null
  }

  const CurrentComponent = currentRoute.component

  return <CurrentComponent />
}
