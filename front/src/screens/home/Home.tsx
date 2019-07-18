import React from 'react'

import { LoginPassword } from './providers/login-password'
import { Telegram } from './providers/telegram'

export const Home = () => {
  return (
    <>
      <h1>Home page</h1>

      <LoginPassword />

      <Telegram />
    </>
  )
}
