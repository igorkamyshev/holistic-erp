import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

import { IdGenerator } from './infrastructure/IdGenerator/IdGenerator'
import { NanoIdGenerator } from './infrastructure/IdGenerator/NanoIdGenerator'
import { BcryptPasswordEncoder } from './infrastructure/PasswordEncoder/BcryptPasswordEncoder'
import { PasswordEncoder } from './infrastructure/PasswordEncoder/PasswordEncoder'

@Module({
  providers: [
    {
      provide: IdGenerator,
      useClass: NanoIdGenerator,
    },
    {
      provide: PasswordEncoder,
      useClass: BcryptPasswordEncoder,
    },
  ],
  exports: [IdGenerator, PasswordEncoder],
})
export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
