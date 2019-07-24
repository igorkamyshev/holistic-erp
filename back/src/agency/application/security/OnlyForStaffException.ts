export class OnlyForStaffException extends Error {
  constructor(
    public readonly agencyName: string,
    public readonly userLogin: string,
  ) {
    super(`User "${userLogin}" is not a part of "${agencyName}" staff`)
  }
}
