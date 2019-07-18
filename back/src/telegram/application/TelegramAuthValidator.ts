import { Injectable } from '@nestjs/common'
const TelegramLogin = require('node-telegram-login')

import { Configuration } from '&back/config/Configuration'
import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'

@Injectable()
export class TelegramAuthValidator {
  public readonly validate: (payload: TelegramAuthPayload) => boolean

  public constructor(config: Configuration) {
    const token = config.getStringOrThrow('TELEGRAM_BOT_TOKEN')
    const login = new TelegramLogin(token)
    this.validate = login.checkLoginData.bind(login)
  }
}
