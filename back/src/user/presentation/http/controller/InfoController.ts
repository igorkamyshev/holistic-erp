import { Body, Controller, Get } from '@nestjs/common'
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

@Controller('user/info')
@OnlyForUsers()
@ApiUseTags('user')
@ApiBearerAuth()
export class InfoController {
  public constructor(private readonly userRepo: UserRepository) {}

  @Get('')
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
}
