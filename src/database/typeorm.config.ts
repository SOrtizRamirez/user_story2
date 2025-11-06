// src/database/typeorm.config.ts
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],       
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isProd = config.get('NODE_ENV') === 'production';
    return {
      type: 'postgres',
      host: config.get<string>('DB_HOST', 'localhost'),
      port: Number(config.get<string>('DB_PORT', '5432')),
      username: config.get<string>('DB_USERNAME', 'postgres'),
      password: config.get<string>('DB_PASSWORD', 'postgres'),
      database: config.get<string>('DB_NAME', 'riwi_sportsline'),
      entities: [User],
      synchronize: !isProd,   // true en dev, migraciones en prod
      logging: !isProd,
    } as DataSourceOptions;
  },
};
