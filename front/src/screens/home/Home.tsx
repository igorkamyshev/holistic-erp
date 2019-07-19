import React from 'react'
import { observer } from 'mobx-react'

import { store } from '&front/store'
import { Loader } from '&front/ui/loader'

import { LoginPassword } from './providers/login-password'
import { Header } from './components/header/Header'
import { Telegram } from './providers/telegram'
import s from './Home.css'

export const Home = observer(() => {
  if (store.userStore.loggedIn) {
    return <Loader />
  }

  return (
    <section className={s.container}>
      <Header className={s.header} />

      <LoginPassword className={s.main} />

      <section className={s.aside}>
        <Telegram />
        <p>Google</p>
        <p>Facebook</p>
      </section>
    </section>
  )
})
