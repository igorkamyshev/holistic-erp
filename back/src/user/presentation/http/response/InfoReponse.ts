import { ApiModelProperty } from '@nestjs/swagger'

import { UserInfo } from '&shared/model/UserInfo'

export class InfoReponse implements UserInfo {
  @ApiModelProperty({ example: ['Holitic SMM Agency'] })
  public readonly agencies: string[]
}
