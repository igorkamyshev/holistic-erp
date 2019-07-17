import { Column, Entity, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'

import { User } from '&back/user/domain/User.entity'

@Entity()
export class Agency {
  @PrimaryColumn()
  public readonly name: string

  @Column()
  public readonly token: string

  public get staff(): ReadonlyArray<User> {
    return this._staff || []
  }

  @ManyToMany(type => User, { eager: true })
  @JoinTable()
  private _staff: User[] | undefined

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
}
