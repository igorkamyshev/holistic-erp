import React from 'react'

import { Link } from '&front/router/Link'
import { RouteName } from '&front/router/RouteName'

export const Home = () => {
  return (
    <div>
      <p>Home page</p>
      <Link routeName={RouteName.Hello}>GO</Link>
    </div>
  )
}
