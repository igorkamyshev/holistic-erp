import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Option } from 'nanoption'
import { Repository } from 'typeorm'

import { User } from './User.entity'
import { EntityNotFoundException } from '@back/utils/domain/EntityNotFoundException'
import { makeGetFromFind } from '@back/utils/domain/makeGetFromFind'

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

  public get = makeGetFromFind(User.name, this)
}

export const UserRepository = UserRepo
export type UserRepository = UserRepo
