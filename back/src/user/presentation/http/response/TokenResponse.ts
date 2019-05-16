import { ApiModelProperty } from '@nestjs/swagger'

export class TokenResponse {
  @ApiModelProperty({ example: 'token-string-with-signature' })
  public readonly token: string
}
