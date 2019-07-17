import { Injectable } from '@nestjs/common'

import { UserRepository } from '&back/user/domain/UserRepository'
import { EntitySaver } from '&back/db/EntitySaver'

import { AgencyRepository } from '../domain/AgencyRepository'
import { Agency } from '../domain/Agency.entity'
import { TokenManager } from './TokenManager'
import { AgencyAlreadyExistException } from './expection/AgencyAlreadyExistException'
import { AgencyTokenInvalidException } from './expection/AgencyTokenInvalidException'

@Injectable()
export class StaffManager {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly agencyRepo: AgencyRepository,
    private readonly entitySaver: EntitySaver,
    private readonly tokenManager: TokenManager,
  ) {}

  public async createNewAgency(
    login: string,
    agencyName: string,
  ): Promise<string> {
    const [user, existAgency, { rawToken, encryptedToken }] = await Promise.all(
      [
        this.userRepo.get(login),
        this.agencyRepo.find(agencyName),
        this.tokenManager.get(),
      ],
    )

    if (existAgency.nonEmpty()) {
      throw new AgencyAlreadyExistException(agencyName)
    }

    const newAgency = new Agency(agencyName, encryptedToken)
    newAgency.addWorker(user)

    await this.entitySaver.save(newAgency)

    return rawToken
  }

  public async joinToExistAgency(
    login: string,
    agencyName: string,
    token: string,
  ): Promise<void> {
    const [user, agency] = await Promise.all([
      this.userRepo.get(login),
      this.agencyRepo.get(agencyName),
    ])

    const validToken = await this.tokenManager.validate(token, agency.token)

    if (!validToken) {
      throw new AgencyTokenInvalidException(token, agencyName)
    }

    agency.addWorker(user)

    await this.entitySaver.save(agency)
  }
}
