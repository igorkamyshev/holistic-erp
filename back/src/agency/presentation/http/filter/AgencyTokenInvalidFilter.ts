import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AgencyAlreadyExistException } from '&back/agency/application/expection/AgencyAlreadyExistException'
import { AgencyTokenInvalidException } from '&back/agency/application/expection/AgencyTokenInvalidException'

const HTTP_STATUS = 400

@Catch(AgencyTokenInvalidException)
export class AgencyTokenInvalidFilter implements ExceptionFilter {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: AgencyTokenInvalidFilter,
    }
  }

  public catch(exception: AgencyTokenInvalidException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse()

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      agencyName: exception.agencyName,
      token: exception.token,
    })
  }
}
