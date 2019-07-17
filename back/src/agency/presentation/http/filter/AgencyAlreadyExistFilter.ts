import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { AgencyAlreadyExistException } from '&back/agency/application/expection/AgencyAlreadyExistException'

const HTTP_STATUS = 400

@Catch(AgencyAlreadyExistException)
export class AgencyAlreadyExistFilter implements ExceptionFilter {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: AgencyAlreadyExistFilter,
    }
  }

  public catch(exception: AgencyAlreadyExistException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse()

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      name: exception.name,
    })
  }
}
