import { ApiModelProperty } from '@nestjs/swagger'

export class TeamReponse {
  @ApiModelProperty({ example: 'Holitic SMM Agency' })
  public readonly name: string

  @ApiModelProperty({ example: ['Igor Kamyshev', 'Maria Goroshko'] })
  public readonly members: string[]
}
