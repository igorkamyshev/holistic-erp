import { ApiModelProperty } from '@nestjs/swagger'

import { TelegramAuthPayload } from '&back/telegram/application/TelegramAuthPayload'

export class TelegramAuthRequest implements TelegramAuthPayload {
  @ApiModelProperty({ example: 65400792 })
  public readonly id: number

  @ApiModelProperty({ example: 'Igor' })
  public readonly first_name: string

  @ApiModelProperty({ example: 'Kamyshev' })
  public readonly last_name: string

  @ApiModelProperty({ example: 'igorkamyshev' })
  public readonly username: string

  @ApiModelProperty({ example: 'https://t.me/i/userpic/320/igorkamyshev.jpg' })
  public readonly photo_url: string

  @ApiModelProperty({ example: 1557951994 })
  public readonly auth_date: number

  @ApiModelProperty({
    example: '716c60eda387442be92cd6146bffbecc22032b3b5636374e60a1af86dfaa5f00',
  })
  public readonly hash: string
}
