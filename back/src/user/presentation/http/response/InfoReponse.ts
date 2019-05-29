import { ApiModelProperty } from '@nestjs/swagger'

export class InfoReponse {
  @ApiModelProperty({ example: ['Holitic SMM Agency'] })
  public readonly agencies: string[]
}
