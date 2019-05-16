import { Column } from 'typeorm'

export class TelegramProfile {
  @Column({ nullable: true })
  public readonly username: string

  @Column({ nullable: true })
  public readonly id: number

  public constructor(username?: string, id?: number) {
    this.username = username
    this.id = id
  }
}
