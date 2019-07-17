import { ExecutionContext } from '@nestjs/common'

import { TokenPayload } from '&back/user/application/TokenPayload'

export const addPayloadToRequest = (
  payload: TokenPayload,
  executionContext: ExecutionContext,
): void => {
  executionContext.switchToHttp().getRequest().user = payload
}
