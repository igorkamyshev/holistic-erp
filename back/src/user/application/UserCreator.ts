import { Injectable } from '@nestjs/common'

import { TelegramAuthPayload } from '&back/telegram/application/TelegramAuthPayload'

import { User } from '../domain/User.entity'
import { TelegramCreator } from './creators/TelegramCreator'

@Injectable()
export class UserCreator {
  constructor(private readonly telegramCreator: TelegramCreator) {}

  public async fromTelegram(payload: TelegramAuthPayload): Promise<User> {
    return this.telegramCreator.create(payload)
  }
}
