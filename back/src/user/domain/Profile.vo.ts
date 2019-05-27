import { Option } from 'nanoption'
import { Column } from 'typeorm'

export class Profile {
  public get name(): Option<string> {
    return Option.of(this._name)
  }

  public get photo(): Option<string> {
    return Option.of(this._photo)
  }

  @Column({ nullable: true })
  private _name?: string

  @Column({ nullable: true })
  private _photo?: string

  public constructor(name?: string, photo?: string) {
    this._name = name
    this._photo = name
  }

  public changeName(newName: string) {
    if (newName.length > 0) {
      this._name = newName
    }
  }

  public changePhoto(newPhoto: string) {
    if (newPhoto.length > 0) {
      this._photo = newPhoto
    }
  }
}
