import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TelegramModule } from '&back/telegram/telegram.module'
import { UtilsModule } from '&back/utils/utils.module'
import { DbModule } from '&back/db/db.module'

import { TelegramChannel } from './domain/TelegramChannel.entity'
import { ChannelCreator } from './application/ChannelCreator'

@Module({
  imports: [
    DbModule,
    UtilsModule,
    TelegramModule,
    TypeOrmModule.forFeature([TelegramChannel]),
  ],
  controllers: [],
  providers: [ChannelCreator],
  exports: [ChannelCreator],
})
export class ChannelModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
