export abstract class IdGenerator {
  public abstract getId(): Promise<string>

  public abstract getNumeric(length: number, sections?: number): Promise<string>
}
