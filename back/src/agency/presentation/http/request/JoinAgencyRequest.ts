import { ApiModelProperty } from '@nestjs/swagger'

export class JoinAgencyRequest {
  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly name: string

  @ApiModelProperty({ example: '1234-5678-9012-3456' })
  public readonly token: string
}
