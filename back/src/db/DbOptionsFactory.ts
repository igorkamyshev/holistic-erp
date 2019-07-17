import { Inject } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { TlsOptions } from 'tls'

import { Configuration } from '&back/config/Configuration'

export class DbOptionsFactory implements TypeOrmOptionsFactory {
  public constructor(
    @Inject(Configuration) private readonly config: Configuration,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const certPath = join(
      dirname(process.cwd()),
      '.secure',
      'ca-certificate.txt',
    )

    const createSslConfig: () => boolean | TlsOptions = this.config.isProd()
      ? () => ({ ca: readFileSync(certPath) })
      : () => false

    return {
      type: 'postgres',
      host: this.config.getStringOrElse('DB_HOST', '127.0.0.1'),
      port: this.config.getNumberOrElse('DB_PORT', 5432),
      username: this.config.getStringOrElse('DB_USER', 'admin'),
      password: this.config.getStringOrElse('DB_PASSWORD', 'admin'),
      database: this.config.getStringOrElse('DB_NAME', 'holistic'),
      entities: [join(__dirname, '/../**/*.{entity,vo}.{ts,js}')],
      synchronize: !this.config.getBooleanOrElse('PRODUCTION_READY', true),
      ssl: createSslConfig(),
    }
  }
}
