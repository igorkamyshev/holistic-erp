import { Injectable } from '@nestjs/common'

import { User } from '&back/user/domain/User.entity'
import { UserRepository } from '&back/user/domain/UserRepository'
import { EntitySaver } from '&back/db/EntitySaver'
import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'
import { PasswordEncoder } from '&back/utils/infrastructure/PasswordEncoder/PasswordEncoder'

@Injectable()
export class InternalCreator {
  constructor(
    private readonly passwordEncoder: PasswordEncoder,
    private readonly userRepo: UserRepository,
    private readonly entitySaver: EntitySaver,
  ) {}

  public async create(payload: LoginPasswordCredentials): Promise<User> {
    const existUserOption = await this.userRepo.find(payload.login)

    if (existUserOption.nonEmpty()) {
      return existUserOption.get()
    }

    return this.createNewUser(payload)
  }

  private async createNewUser(
    payload: LoginPasswordCredentials,
  ): Promise<User> {
    const newUser = new User(payload.login)

    await newUser.credentials.changePassword(
      payload.password,
      this.passwordEncoder,
    )

    await this.entitySaver.save(newUser)

    return newUser
  }
}
