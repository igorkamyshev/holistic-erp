import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Option } from 'nanoption'
import { Repository } from 'typeorm'

import { User } from './User.entity'
import { EntityNotFoundException } from '@back/utils/domain/EntityNotFoundException'

@Injectable()
class UserRepo {
  public constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  public async find(login: string): Promise<Option<User>> {
    const user = await this.userRepo.findOne({
      login,
    })

    return Option.of(user)
  }

  public async findByTelegram(id: number): Promise<Option<User>> {
    const user = await this.userRepo
      .createQueryBuilder()
      .where({
        TelegramId: id,
      })
      .getOne()

    return Option.of(user)
  }

  public async get(login: string): Promise<User> {
    const user = await this.find(login)

    if (user.nonEmpty()) {
      return user.get()
    }

    throw new EntityNotFoundException(User.name, { login })
  }
}

export const UserRepository = UserRepo
export type UserRepository = UserRepo
