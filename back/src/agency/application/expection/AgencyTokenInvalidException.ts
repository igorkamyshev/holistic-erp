export class AgencyTokenInvalidException extends Error {
  public constructor(
    public readonly token: string,
    public readonly agencyName: string,
  ) {
    super(`Token "${token}" invalid for ${agencyName}`)
  }
}
