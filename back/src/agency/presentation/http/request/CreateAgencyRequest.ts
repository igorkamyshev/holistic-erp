import { ApiModelProperty } from '@nestjs/swagger'

import { CreateAgency } from '&shared/model/CreateAgency'

export class CreateAgencyRequest implements CreateAgency {
  @ApiModelProperty({ example: 'Holistic SMM Agency' })
  public readonly name: string
}
