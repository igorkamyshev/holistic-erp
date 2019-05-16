const nanoid = require('nanoid')

import { IdGenerator } from './IdGenerator'

export class NanoIdGenerator implements IdGenerator {
  public async getId(): Promise<string> {
    return nanoid()
  }
}
