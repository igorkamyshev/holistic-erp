import React from 'react'
import { observer } from 'mobx-react'

import { store } from '&front/store'

export const Dashboard = observer(() => {
  const { userStore } = store

  if (!userStore.agencies) {
    return <p>fail</p>
  }

  return (
    <section>
      <h1>Dashboard</h1>

      <p>Ваши агенства {userStore.agencies.join(', ')}</p>
    </section>
  )
})
