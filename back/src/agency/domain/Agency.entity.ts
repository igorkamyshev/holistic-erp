import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'

import { User } from '&back/user/domain/User.entity'
import { TelegramChannel } from '&back/channel/domain/TelegramChannel.entity'

@Entity()
export class Agency {
  @PrimaryColumn()
  public readonly name: string

  @Column()
  public readonly token: string

  public get staff(): ReadonlyArray<User> {
    return this._staff || []
  }

  public get telegramChannels(): ReadonlyArray<TelegramChannel> {
    return this._telegramChannels || []
  }

  @ManyToMany(type => User, { eager: true })
  @JoinTable()
  private _staff: User[] | undefined

  @ManyToMany(type => TelegramChannel, { eager: true })
  @JoinTable()
  private _telegramChannels: TelegramChannel[] | undefined

  constructor(name: string, token: string) {
    this.name = name
    this.token = token
  }

  public addWorker(worker: User): void {
    const newStaff = [
      ...this.staff.filter(user => user.login !== worker.login),
      worker,
    ]

    this._staff = newStaff
  }

  public attachTelegramChannel(channel: TelegramChannel): void {
    const newChannels = [
      ...this.telegramChannels.filter(({ name }) => name !== channel.name),
      channel,
    ]

    this._telegramChannels = newChannels
  }
}
