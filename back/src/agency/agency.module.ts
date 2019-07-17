import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '&back/user/user.module'
import { DbModule } from '&back/db/db.module'

import { StartController } from './presentation/http/controller/StartController'
import { StaffManager } from './application/StaffManager'
import { Agency } from './domain/Agency.entity'
import { AgencyRepository } from './domain/AgencyRepository'
import { UtilsModule } from '&back/utils/utils.module'
import { TokenManager } from './application/TokenManager'
import { AgencyAlreadyExistFilter } from './presentation/http/filter/AgencyAlreadyExistFilter'
import { AgencyTokenInvalidFilter } from './presentation/http/filter/AgencyTokenInvalidFilter'

@Module({
  imports: [
    DbModule,
    UtilsModule,
    UserModule,
    TypeOrmModule.forFeature([Agency]),
  ],
  controllers: [StartController],
  providers: [
    StaffManager,
    TokenManager,
    AgencyRepository,
    AgencyAlreadyExistFilter.provider(),
    AgencyTokenInvalidFilter.provider(),
  ],
})
export class AgencyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
