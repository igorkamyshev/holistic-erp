import { Body, Controller, Get } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
  ApiForbiddenResponse,
} from '@nestjs/swagger'

import { InvalidCredentialsException } from '&back/user/application/exception/InvalidCredentialsException'
import { PostNoCreate } from '&back/utils/presentation/http/PostNoCreate'
import { TelegramAuthValidator } from '&back/telegram/application/TelegramAuthValidator'
import { PasswordEncoder } from '&back/utils/infrastructure/PasswordEncoder/PasswordEncoder'
import { Authenticator } from '&back/user/application/Authenticator'
import { UserCreator } from '&back/user/application/UserCreator'

import { TelegramAuthRequest } from '../request/TelegramAuthRequest'
import { TokenResponse } from '../response/TokenResponse'
import { LoginPasswordRequest } from '../request/LoginPasswordRequest'
import { OnlyForUsers } from '../security/OnlyForUsers'

@Controller('user/auth')
@ApiUseTags('user')
export class AuthController {
  public constructor(
    private readonly telegramAuthValidator: TelegramAuthValidator,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly authenticator: Authenticator,
    private readonly userCreator: UserCreator,
  ) {}

  @PostNoCreate('login')
  @ApiOperation({ title: 'Auth by Login and Password' })
  @ApiOkResponse({ description: 'Ok', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid password' })
  public async loginByPassword(
    @Body() request: LoginPasswordRequest,
  ): Promise<TokenResponse> {
    const user = await this.userCreator.fromLogin(request)

    const valid = await user.credentials.validatePassword(
      request.password,
      this.passwordEncoder,
    )

    if (!valid) {
      throw new InvalidCredentialsException()
    }

    const token = this.authenticator.getToken(user)

    return {
      token,
    }
  }

  @PostNoCreate('telegram')
  @ApiOperation({ title: 'Auth by Telegram' })
  @ApiOkResponse({ description: 'Ok', type: TokenResponse })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  public async loginByTelegram(
    @Body() request: TelegramAuthRequest,
  ): Promise<TokenResponse> {
    const valid = this.telegramAuthValidator.validate(request)

    if (!valid) {
      throw new InvalidCredentialsException()
    }

    const user = await this.userCreator.fromTelegram(request)

    const token = this.authenticator.getToken(user)

    return {
      token,
    }
  }

  @Get('check-token')
  @OnlyForUsers()
  @ApiOperation({ title: 'Check token' })
  @ApiOkResponse({ description: 'Token is valid' })
  @ApiForbiddenResponse({ description: 'Token is invalid' })
  public async checkToken() {
    // pass
  }
}
