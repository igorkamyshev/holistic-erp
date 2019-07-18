import { Injectable } from '@nestjs/common'

import { TelegramAuthPayload } from '&shared/model/TelegramAuthPayload'
import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'

import { User } from '../domain/User.entity'
import { TelegramCreator } from './creators/TelegramCreator'
import { InternalCreator } from './creators/InternalCreator'

@Injectable()
export class UserCreator {
  constructor(
    private readonly telegramCreator: TelegramCreator,
    private readonly internalCreator: InternalCreator,
  ) {}

  public async fromTelegram(payload: TelegramAuthPayload): Promise<User> {
    return this.telegramCreator.create(payload)
  }

  async fromLogin(credentials: LoginPasswordCredentials): Promise<User> {
    return this.internalCreator.create(credentials)
  }
}
