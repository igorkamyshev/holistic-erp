import { ApiModelProperty } from '@nestjs/swagger'

import { Token } from '&shared/model/Token'

export class AgencyCreatedResponse implements Token {
  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly token: string
}
