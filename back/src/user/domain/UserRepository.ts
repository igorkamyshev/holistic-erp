import { Injectable } from '@nestjs/common'
import { InjectRepository, InjectConnection } from '@nestjs/typeorm'
import { Option } from 'nanoption'
import { Repository, Connection } from 'typeorm'
import { flatMap } from 'lodash'

import { makeGetFromFind } from '&back/utils/domain/makeGetFromFind'

import { User } from './User.entity'
import { Agency } from '&back/agency/domain/Agency.entity'

@Injectable()
class UserRepo {
  public constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectConnection()
    private readonly connection: Connection,
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

  public async getAgencyNames(login: string): Promise<string[]> {
    const result = await this.connection
      .createQueryBuilder(Agency, 'agency')
      .leftJoinAndSelect('agency._staff', 'staff')
      .where('staff.login = :login', { login })
      .select('agency.name')
      .getRawMany()

    return flatMap(result, Object.values)
  }

  public async getNamesByAgency(agency: string): Promise<string[]> {
    const result = await this.connection
      .createQueryBuilder(Agency, 'agency')
      .leftJoinAndSelect('agency._staff', 'staff')
      .where('agency.name = :agency', { agency })
      .getOne()

    return result.staff.map(user => user.profile.name.getOrElse(user.login))
  }

  public get = makeGetFromFind(User.name, this)
}

export const UserRepository = UserRepo
export type UserRepository = UserRepo
