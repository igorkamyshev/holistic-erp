import { Injectable } from '@nestjs/common'

import { TelegramAuthPayload } from '@back/telegram/application/TelegramAuthPayload'
import { User } from '@back/user/domain/User.entity'
import { UserRepository } from '@back/user/domain/UserRepository'
import { EntitySaver } from '@back/db/EntitySaver'

@Injectable()
export class TelegramCreator {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async create(payload: TelegramAuthPayload): Promise<User> {
    const login = this.createLogin(payload.id)

    const existUserOption = await this.userRepo.find(login)

    if (existUserOption.nonEmpty()) {
      return this.editExistUser(existUserOption.get(), payload)
    }

    return this.createNewUser(payload)
  }

  private createLogin(id: number): string {
    return `telegram-${id}`
  }

  private createFullName(firstName: string, lastName: string): string {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`
    }

    if (firstName) {
      return firstName
    }

    if (lastName) {
      return lastName
    }

    return ''
  }

  private async editExistUser(
    user: User,
    payload: TelegramAuthPayload,
  ): Promise<User> {
    const fullName = this.createFullName(payload.first_name, payload.last_name)
    if (user.profile.name.isEmpty() && fullName) {
      user.profile.changeName(fullName)
    }

    // TODO: Save image to S3 and add new url
    // Do not use telegram url
    // if (user.profile.photo.isEmpty() && payload.photo_url) {
    //   user.profile.changePhoto(payload.photo_url)
    // }

    if (user.telegram.isEmpty()) {
      user.addTelegram(payload.id, payload.username)
    }

    await this.entitySaver.save(user)

    return user
  }

  private async createNewUser(payload: TelegramAuthPayload): Promise<User> {
    const login = this.createLogin(payload.id)
    const newUser = new User(login)

    return this.editExistUser(newUser, payload)
  }
}
