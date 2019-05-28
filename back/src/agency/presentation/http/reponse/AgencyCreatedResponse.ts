import { ApiModelProperty } from '@nestjs/swagger'

export class AgencyCreatedResponse {
  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly token: string
}
