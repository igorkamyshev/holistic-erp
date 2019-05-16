import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { addPayloadToRequest } from './helpers/addPayloadToRequest'
import { getToken } from './helpers/getToken'

@Injectable()
export class JwtGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = getToken(context)

    try {
      const payload = {} as any // TODO: fix it

      addPayloadToRequest(payload, context)

      return true
    } catch (e) {
      return false
    }
  }
}
