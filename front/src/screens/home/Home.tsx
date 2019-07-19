import React from 'react'

import { LoginPassword } from './providers/login-password'
import { Telegram } from './providers/telegram'
import s from './Home.css'

export const Home = () => {
  return (
    <section className={s.container}>
      <h1 className={s.header}>Home page</h1>

      <section className={s.main}>
        <LoginPassword />
      </section>

      <section className={s.aside}>
        <Telegram />
      </section>
    </section>
  )
}
