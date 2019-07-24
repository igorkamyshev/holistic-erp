import { Controller, Post, Body } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

import { CurrentUser } from '&back/user/presentation/http/decorator/CurrentUser'
import { TokenPayload } from '&back/user/application/TokenPayload'
import { StaffChecker } from '&back/agency/application/security/StaffChecker'
import { OnlyForUsers } from '&back/user/presentation/http/security/OnlyForUsers'
import { AgencyRepository } from '&back/agency/domain/AgencyRepository'
import { ChannelCreator } from '&back/channel/application/ChannelCreator'

import { AddTelegramChannelRequest } from '../request/AddTelegramChannelRequest'

@Controller('agency/resource')
@OnlyForUsers()
@ApiUseTags('agency')
@ApiBearerAuth()
export class ResourceController {
  constructor(
    private readonly staffChecker: StaffChecker,
    private readonly agencyRepo: AgencyRepository,
    private readonly channelCreator: ChannelCreator,
  ) {}

  @Post('telegram')
  @ApiOperation({ title: 'Add new telegram channel to this agency' })
  @ApiOkResponse({ description: 'Added' })
  @ApiNotFoundResponse({
    description: 'Agency with the provided name not found',
  })
  @ApiForbiddenResponse({ description: 'Only for staff' })
  public async addTelegramChannel(
    @CurrentUser() { login }: TokenPayload,
    @Body() { agencyName, channelLink }: AddTelegramChannelRequest,
  ): Promise<void> {
    await this.staffChecker.check(login, agencyName)

    const agency = await this.agencyRepo.get(agencyName)

    await this.channelCreator.createTelegramChannel(agency, channelLink)
  }
}
