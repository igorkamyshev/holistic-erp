import { useEffect, RefObject } from 'react'

import { getConfig } from '&front/utils/getConfig'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'

const handlerKey = '__handler__telegram'

const { telegramBotName } = getConfig()

export const useTelegramWidget = (
  ref: RefObject<HTMLDivElement>,
  handleLogin: (data: TelegramAuthPayload) => any,
) => {
  useEffect(() => {
    if (ref.current) {
      ;(window as any)[handlerKey] = handleLogin
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?5'
      script.setAttribute('data-telegram-login', telegramBotName)
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-onauth', `window.${handlerKey}(user)`)
      script.async = true
      ref.current.appendChild(script)
    }
  }, [handleLogin, telegramBotName])
}
