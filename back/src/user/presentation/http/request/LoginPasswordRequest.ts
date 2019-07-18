import { ApiModelProperty } from '@nestjs/swagger'
import { LoginPasswordCredentials } from '&shared/model/LoginPasswordCredentials'

export class LoginPasswordRequest implements LoginPasswordCredentials {
  @ApiModelProperty({ example: 'igor@kamyshev.me' })
  public readonly login: string

  @ApiModelProperty({ example: 'fdsfd' })
  public readonly password: string
}
