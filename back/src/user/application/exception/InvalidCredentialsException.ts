export class InvalidCredentialsException extends Error {
  public constructor() {
    super('Invalid credentials')
  }
}
