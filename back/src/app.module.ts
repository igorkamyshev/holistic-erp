import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
import { TelegramModule } from './telegram/telegram.module'
import { AgencyModule } from './agency/agency.module'
import { ChannelModule } from './channel/channel.module'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    DbModule,
    TelegramModule,
    AgencyModule,
    ChannelModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
