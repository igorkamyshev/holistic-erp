import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { ConfigModule } from '&back/config/config.module'

import { TelegramAuthValidator } from './application/TelegramAuthValidator'

@Module({
  imports: [ConfigModule],
  providers: [TelegramAuthValidator],
  exports: [TelegramAuthValidator],
})
export class TelegramModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
