import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../domain/User.entity'
import { UserRepository } from '../domain/UserRepository'
import { TokenPayload } from './TokenPayload'
import { InvalidTokenException } from './exception/InvalidTokenException'

@Injectable()
export class Authenticator {
  public constructor(
    private readonly userRepo: UserRepository,
    private readonly jwt: JwtService,
  ) {}

  public async decode(token: string): Promise<TokenPayload> {
    try {
      this.jwt.verify(token)

      return this.jwt.decode(token) as TokenPayload
    } catch (e) {
      // token is invalid
      throw new InvalidTokenException(token)
    }
  }

  public async getToken(login: string): Promise<string> {
    const user = await this.userRepo.get(login)

    const payload = this.createTokenPayload(user)
    const token = this.jwt.sign(payload)

    return token
  }

  private createTokenPayload(user: User): TokenPayload {
    return {
      login: user.login,
    }
  }
}
