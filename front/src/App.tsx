import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'mobx-react'
import { RouterProvider } from 'react-router5'

import { initRouter } from './router/initRouter'
import { Switch } from './router/Switch'
import { routerStore } from './store/routerStore'

const router = initRouter()

const Root = () => (
  <StoreProvider routerStore={routerStore}>
    <RouterProvider router={router}>
      <Switch />
    </RouterProvider>
  </StoreProvider>
)

if (process.env.NODE_ENV !== 'production') {
  const makeInspectable = require('mobx-devtools-mst').default

  makeInspectable(routerStore)
}

router.start(() => {
  ReactDOM.render(<Root />, document.getElementById('app'))
})
