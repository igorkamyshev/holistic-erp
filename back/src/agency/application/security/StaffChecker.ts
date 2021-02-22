import { Injectable } from '@nestjs/common'

import { OnlyForStaffException } from './OnlyForStaffException'
import { UserRepository } from '&back/user/domain/UserRepository'

@Injectable()
export class StaffChecker {
  constructor(private readonly userRepo: UserRepository) {}

  async check(userLogin: string, agencyName: string) {
    const userAgencies = await this.userRepo.getAgencyNames(userLogin)

    if (!userAgencies.includes(agencyName)) {
      throw new OnlyForStaffException(agencyName, userLogin)
    }
  }
}
