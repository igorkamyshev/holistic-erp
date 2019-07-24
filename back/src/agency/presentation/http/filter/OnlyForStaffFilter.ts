import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { OnlyForStaffException } from '&back/agency/application/security/OnlyForStaffException'

const HTTP_STATUS = 403

@Catch(OnlyForStaffException)
export class OnlyForStaffFilter implements ExceptionFilter {
  public static provider() {
    return {
      provide: APP_FILTER,
      useClass: OnlyForStaffFilter,
    }
  }

  public catch(exception: OnlyForStaffException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse()

    res.status(HTTP_STATUS).json({
      status: HTTP_STATUS,
      message: exception.message,
      agencyName: exception.agencyName,
      userLogin: exception.userLogin,
    })
  }
}
