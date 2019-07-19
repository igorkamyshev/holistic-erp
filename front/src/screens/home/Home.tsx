import React from 'react'

import { LoginPassword } from './providers/login-password'
import { Header } from './components/header/Header'
import { Telegram } from './providers/telegram'
import s from './Home.css'

export const Home = () => {
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
}
