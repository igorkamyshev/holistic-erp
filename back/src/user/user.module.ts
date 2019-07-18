import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '&back/config/config.module'
import { DbModule } from '&back/db/db.module'
import { UtilsModule } from '&back/utils/utils.module'
import { TelegramModule } from '&back/telegram/telegram.module'

import { AuthController } from './presentation/http/controller/AuthController'
import { InvalidCredentialsFilter } from './presentation/http/filter/InvalidCredentialsFilter'
import { JwtGuard } from './presentation/http/security/JwtGuard'
import { User } from './domain/User.entity'
import { UserRepository } from './domain/UserRepository'
import { JwtOptionsFactory } from './infrastructure/JwtOptionsFactory'
import { Authenticator } from './application/Authenticator'
import { UserCreator } from './application/UserCreator'
import { TelegramCreator } from './application/creators/TelegramCreator'
import { InfoController } from './presentation/http/controller/InfoController'
import { InternalCreator } from './application/creators/InternalCreator'

@Module({
  imports: [
    DbModule,
    UtilsModule,
    TelegramModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtOptionsFactory,
    }),
  ],
  controllers: [AuthController, InfoController],
  providers: [
    InvalidCredentialsFilter.provider(),
    UserRepository,
    JwtGuard,
    Authenticator,
    UserCreator,
    TelegramCreator,
    InternalCreator,
  ],
  exports: [UserRepository, JwtGuard, Authenticator],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
