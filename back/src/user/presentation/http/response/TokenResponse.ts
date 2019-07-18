import { ApiModelProperty } from '@nestjs/swagger'

import { Token } from '&shared/model/Token'

export class TokenResponse implements Token {
  @ApiModelProperty({ example: 'token-string-with-signature' })
  public readonly token: string
}
