import React, { useRef, useCallback } from 'react'

import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { store } from '&front/store'

import { useTelegramWidget } from './useTelegramWidget'

export const Telegram = () => {
  const { userStore } = store
  const container = useRef<HTMLDivElement>(null)

  const handleLogin = useCallback(async (userData: TelegramAuthPayload) => {
    await userStore.telegramSignIn(userData)
  }, [])

  useTelegramWidget(container, handleLogin)

  return (
    <>
      <div ref={container} />
    </>
  )
}
