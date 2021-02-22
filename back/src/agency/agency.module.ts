import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserModule } from '&back/user/user.module'
import { DbModule } from '&back/db/db.module'
import { UtilsModule } from '&back/utils/utils.module'
import { ChannelModule } from '&back/channel/channel.module'

import { StartController } from './presentation/http/controller/StartController'
import { StaffManager } from './application/StaffManager'
import { Agency } from './domain/Agency.entity'
import { AgencyRepository } from './domain/AgencyRepository'
import { TokenManager } from './application/TokenManager'
import { AgencyAlreadyExistFilter } from './presentation/http/filter/AgencyAlreadyExistFilter'
import { AgencyTokenInvalidFilter } from './presentation/http/filter/AgencyTokenInvalidFilter'
import { ResourceController } from './presentation/http/controller/ResourceController'
import { StaffChecker } from './application/security/StaffChecker'
import { OnlyForStaffFilter } from './presentation/http/filter/OnlyForStaffFilter'

@Module({
  imports: [
    DbModule,
    UtilsModule,
    UserModule,
    ChannelModule,
    TypeOrmModule.forFeature([Agency]),
  ],
  controllers: [StartController, ResourceController],
  providers: [
    StaffManager,
    StaffChecker,
    TokenManager,
    AgencyRepository,
    AgencyAlreadyExistFilter.provider(),
    AgencyTokenInvalidFilter.provider(),
    OnlyForStaffFilter.provider(),
  ],
})
export class AgencyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
