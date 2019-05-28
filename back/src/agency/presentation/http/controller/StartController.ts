import { Controller, Post, Body } from '@nestjs/common'
import {
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'
import { CurrentUser } from '@back/user/presentation/http/decorator/CurrentUser'
import { TokenPayload } from '@back/user/application/TokenPayload'
import { OnlyForUsers } from '@back/user/presentation/http/security/OnlyForUsers'
import { StaffManager } from '@back/agency/application/StaffManager'

import { CreateAgencyRequest } from '../request/CreateAgencyRequest'
import { JoinAgencyRequest } from '../request/JoinAgencyRequest'
import { AgencyCreatedResponse } from '../reponse/AgencyCreatedResponse'

@Controller('agency/start')
@ApiUseTags('agency')
@OnlyForUsers()
@ApiBearerAuth()
export class StartController {
  public constructor(private readonly staffManager: StaffManager) {}

  @PostNoCreate('join')
  @ApiOperation({ title: 'Join to exist Agecny' })
  @ApiOkResponse({ description: 'Joined' })
  @ApiNotFoundResponse({
    description: 'Agency with the provided name not found',
  })
  @ApiForbiddenResponse({ description: 'Invalid token' })
  public async join(
    @CurrentUser() user: TokenPayload,
    @Body() request: JoinAgencyRequest,
  ): Promise<void> {
    await this.staffManager.joinToExistAgency(
      user.login,
      request.name,
      request.token,
    )
  }

  @Post('create')
  @ApiOperation({ title: 'Create new Agency' })
  @ApiOkResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Name already taken' })
  public async create(
    @CurrentUser() user: TokenPayload,
    @Body() request: CreateAgencyRequest,
  ): Promise<AgencyCreatedResponse> {
    const token = await this.staffManager.createNewAgency(
      user.login,
      request.name,
    )

    return {
      token,
    }
  }
}
