export class AgencyAlreadyExistException extends Error {
  public constructor(public readonly name: string) {
    super(`Agency "${name}" already exist`)
  }
}
