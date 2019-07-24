import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from '&back/config/config.module'

import { TelegramAuthValidator } from './application/TelegramAuthValidator'
import { TelegramInformator } from './infrastructure/TelegramInformator'

@Module({
  imports: [ConfigModule],
  providers: [TelegramAuthValidator, TelegramInformator],
  exports: [TelegramAuthValidator, TelegramInformator],
})
export class TelegramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
