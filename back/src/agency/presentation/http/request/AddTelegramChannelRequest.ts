import { ApiModelProperty } from '@nestjs/swagger'

export class AddTelegramChannelRequest {
  @ApiModelProperty({ example: '@code_for' })
  public readonly channelLink: string

  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly agencyName: string
}
