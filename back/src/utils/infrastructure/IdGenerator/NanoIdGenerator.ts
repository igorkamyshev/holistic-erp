const nanoid = require('nanoid/async')
const generate = require('nanoid/async/generate')
import { range } from 'lodash'

import { IdGenerator } from './IdGenerator'

export class NanoIdGenerator implements IdGenerator {
  public async getId(): Promise<string> {
    return nanoid()
  }

  public async getNumeric(
    length: number,
    sections: number = 1,
  ): Promise<string> {
    const NUMERIC_ALPHABET = '0123456789'

    const pieces = await Promise.all(
      range(0, sections + 1).map(() => generate(NUMERIC_ALPHABET, length)),
    )

    return pieces.join('-')
  }
}
