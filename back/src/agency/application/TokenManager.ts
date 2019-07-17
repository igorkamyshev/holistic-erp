import { IdGenerator } from '&back/utils/infrastructure/IdGenerator/IdGenerator'
import { Injectable } from '@nestjs/common'
import { PasswordEncoder } from '&back/utils/infrastructure/PasswordEncoder/PasswordEncoder'

@Injectable()
export class TokenManager {
  public constructor(
    private readonly idGenerator: IdGenerator,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  public async get() {
    const rawToken = await this.idGenerator.getNumeric(4, 3)
    const encryptedToken = await this.passwordEncoder.encodePassword(rawToken)

    return {
      rawToken,
      encryptedToken,
    }
  }

  public async validate(raw: string, encoded: string) {
    return this.passwordEncoder.isPasswordValid(encoded, raw)
  }
}
