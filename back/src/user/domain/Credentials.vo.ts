import { Column } from 'typeorm'
import { PasswordEncoder } from '&back/utils/infrastructure/PasswordEncoder/PasswordEncoder'

export class Credentials {
  @Column({ nullable: true })
  private password: string

  async changePassword(
    rawPassword: string,
    encoder: PasswordEncoder,
  ): Promise<void> {
    this.password = await encoder.encodePassword(rawPassword)
  }

  async validatePassword(
    rawPassword: string,
    encoder: PasswordEncoder,
  ): Promise<boolean> {
    const valid = await encoder.isPasswordValid(this.password, rawPassword)

    return valid
  }
}
