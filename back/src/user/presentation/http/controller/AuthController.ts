import { Body, Controller } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { PostNoCreate } from '@back/utils/presentation/http/PostNoCreate'

import { TelegramAuthRequest } from '../request/TelegramAuthRequest'
import { TokenResponse } from '../response/TokenResponse'

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  public constructor() {}

  @PostNoCreate('telegram')
  @ApiOperation({ title: 'Auth by Telegram' })
  @ApiOkResponse({ description: 'Ok', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  public async signIn(
    @Body() request: TelegramAuthRequest,
  ): Promise<TokenResponse> {
    return {
      token: '',
    }
  }
}
