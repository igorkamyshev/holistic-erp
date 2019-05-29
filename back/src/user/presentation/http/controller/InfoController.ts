import { Controller, Get } from '@nestjs/common'
import { zip } from 'lodash'
import {
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger'

import { UserRepository } from '@back/user/domain/UserRepository'
import { TokenPayload } from '@back/user/application/TokenPayload'

import { InfoReponse } from '../response/InfoReponse'
import { OnlyForUsers } from '../security/OnlyForUsers'
import { CurrentUser } from '../decorator/CurrentUser'
import { TeamReponse } from '../response/TeamReponse'

@Controller('user/info')
@OnlyForUsers()
@ApiUseTags('user')
@ApiBearerAuth()
export class InfoController {
  public constructor(private readonly userRepo: UserRepository) {}

  @Get('main')
  @ApiOperation({ title: 'Fetch info about user' })
  @ApiOkResponse({ description: 'Fetched', type: InfoReponse })
  public async fetchInfo(
    @CurrentUser() user: TokenPayload,
  ): Promise<InfoReponse> {
    const agencies = await this.userRepo.getAgencyNames(user.login)

    return {
      agencies,
    }
  }

  @Get('team')
  @ApiOperation({ title: 'Fetch teams with user' })
  @ApiOkResponse({ description: 'Fetched', type: TeamReponse, isArray: true })
  public async fetchTeam(
    @CurrentUser() user: TokenPayload,
  ): Promise<TeamReponse[]> {
    const agencies = await this.userRepo.getAgencyNames(user.login)

    const names = await Promise.all(
      agencies.map(agency => this.userRepo.getNamesByAgency(agency)),
    )

    return zip(agencies, names).map(([name, members]) => ({
      name,
      members,
    }))
  }
}
