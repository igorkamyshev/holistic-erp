import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@back/config/config.module'
import { DbModule } from '@back/db/db.module'
import { UtilsModule } from '@back/utils/utils.module'

import { AuthController } from './presentation/http/controller/AuthController'
import { InvalidCredentialsFilter } from './presentation/http/filter/InvalidCredentialsFilter'
import { JwtGuard } from './presentation/http/security/JwtGuard'

import { User } from './domain/User.entity'
import { UserRepository } from './domain/UserRepository'

import { JwtOptionsFactory } from './infrastructure/JwtOptionsFactory'

@Module({
  imports: [
    DbModule,
    UtilsModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtOptionsFactory,
    }),
  ],
  controllers: [AuthController],
  providers: [InvalidCredentialsFilter.provider(), UserRepository, JwtGuard],
  exports: [UserRepository, JwtGuard],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
