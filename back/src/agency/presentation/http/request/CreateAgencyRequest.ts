import { ApiModelProperty } from '@nestjs/swagger'

export class CreateAgencyRequest {
  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly name: string
}
