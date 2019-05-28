import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Option } from 'nanoption'
import { Repository } from 'typeorm'

import { Agency } from './Agency.entity'
import { makeGetFromFind } from '@back/utils/domain/makeGetFromFind'

@Injectable()
class AgecnyRepo {
  public constructor(
    @InjectRepository(Agency)
    private readonly agencyRepo: Repository<Agency>,
  ) {}

  public async find(name: string): Promise<Option<Agency>> {
    const agency = await this.agencyRepo.findOne({
      name,
    })

    return Option.of(agency)
  }

  public get = makeGetFromFind(Agency.name, this)

  public async getNamesByLogin(login: string): Promise<string[]> {
    return []
  }
}

export const AgencyRepository = AgecnyRepo
export type AgencyRepository = AgecnyRepo
