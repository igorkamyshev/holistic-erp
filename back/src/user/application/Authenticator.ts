import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../domain/User.entity'
import { TokenPayload } from './TokenPayload'
import { InvalidTokenException } from './exception/InvalidTokenException'

@Injectable()
export class Authenticator {
  public constructor(private readonly jwt: JwtService) {}

  public decode(token: string): TokenPayload {
    try {
      this.jwt.verify(token)

      return this.jwt.decode(token) as TokenPayload
    } catch (e) {
      // token is invalid
      throw new InvalidTokenException(token)
    }
  }

  public getToken(user: User): string {
    const payload: TokenPayload = {
      login: user.login,
    }

    const token = this.jwt.sign(payload)

    return token
  }
}
