import React, { useRef, useCallback } from 'react'
import { observer } from 'mobx-react'

import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { userStore } from '&front/store/userStore'

import { useTelegramWidget } from './useTelegramWidget'

export const Telegram = observer(() => {
  const container = useRef<HTMLDivElement>(null)

  const handleLogin = useCallback(async (userData: TelegramAuthPayload) => {
    await userStore.telegramSignIn(userData)
  }, [])

  useTelegramWidget(container, handleLogin)

  return (
    <>
      <div ref={container} />
      <p>{userStore.token}</p>
    </>
  )
})
