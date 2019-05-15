import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [UserModule, ConfigModule, DbModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
