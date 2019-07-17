import { Body, Controller } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger'

import { PostNoCreate } from '&back/utils/presentation/http/PostNoCreate'
import { TelegramAuthValidator } from '&back/telegram/application/TelegramAuthValidator'
import { Authenticator } from '&back/user/application/Authenticator'
import { UserCreator } from '&back/user/application/UserCreator'

import { TelegramAuthRequest } from '../request/TelegramAuthRequest'
import { TokenResponse } from '../response/TokenResponse'

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  public constructor(
    private readonly telegramAuthValidator: TelegramAuthValidator,
    private readonly authenticator: Authenticator,
    private readonly userCreator: UserCreator,
  ) {}

  @PostNoCreate('telegram')
  @ApiOperation({ title: 'Auth by Telegram' })
  @ApiOkResponse({ description: 'Ok', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  public async loginByTelegram(
    @Body() request: TelegramAuthRequest,
  ): Promise<TokenResponse> {
    const valid = this.telegramAuthValidator.validate(request)

    if (!valid) {
      throw new Error('LOL?')
    }

    const user = await this.userCreator.fromTelegram(request)

    const token = await this.authenticator.getToken(user.login)

    return {
      token,
    }
  }
}
