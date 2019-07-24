import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class TelegramChannel {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public link: string

  @Column({ nullable: true })
  public name: string | null

  constructor(id: string, link: string) {
    this.id = id
    this.link = link
  }
}
