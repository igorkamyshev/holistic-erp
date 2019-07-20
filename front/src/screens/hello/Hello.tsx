import React, { useState, useCallback } from 'react'
import { observer } from 'mobx-react'

import { store } from '&front/store'
import { Loader } from '&front/ui/loader'
import { CreateAgency } from '&front/features/create-agency'
import { Link } from '&front/router/Link'
import { RouteName } from '&front/router/RouteName'
import { JoinAgency } from '&front/features/join-agency'

import s from './Hello.css'

export const Hello = observer(() => {
  const [acted, setActed] = useState(false)
  const onActed = useCallback(() => setActed(true), [setActed])

  if (store.userStore.primaryAgencyExists) {
    return <Loader />
  }

  return (
    <section className={s.container}>
      <CreateAgency onCreated={onActed} />
      <JoinAgency onJoin={onActed} />
      {acted && <Link routeName={RouteName.App}>Перейти к приложению</Link>}
    </section>
  )
})
