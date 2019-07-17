import React, { ReactNode } from 'react'
import { Link as Router5Link } from 'react-router5'

import { RouteName } from './RouteName'

interface Props {
  routeName: RouteName
  children: ReactNode
  routeParams?: { [key: string]: string | number | boolean }
}

export const Link = ({ routeName, children, routeParams }: Props) => {
  return (
    <Router5Link routeName={routeName} routeParams={routeParams}>
      {children}
    </Router5Link>
  )
}
