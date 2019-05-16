import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Option } from 'tsoption'

import { Profile } from './Profile.vo'
import { TelegramProfile } from './TelegramProfile.vo'

@Entity()
export class User {
  @PrimaryColumn()
  public readonly login: string

  @Column(type => Profile)
  public readonly profile: Profile

  public get telegram(): Option<TelegramProfile> {
    if (!this._telegram.id || this._telegram.username) {
      return Option.of(null)
    }

    return Option.of(this._telegram)
  }

  @Column(type => TelegramProfile)
  private _telegram: TelegramProfile

  constructor(login: string) {
    this.login = login

    this.profile = new Profile()
    this._telegram = new TelegramProfile()
  }

  public addTelegram(id: number, username: string = null) {
    this._telegram = new TelegramProfile(username, id)
  }
}
