import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { IdGenerator } from './infrastructure/IdGenerator/IdGenerator'
import { NanoIdGenerator } from './infrastructure/IdGenerator/NanoIdGenerator'

@Module({
  providers: [
    {
      provide: IdGenerator,
      useClass: NanoIdGenerator,
    },
  ],
  exports: [IdGenerator],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
