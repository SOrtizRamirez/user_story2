import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.services';
import { UsersController } from './users.controller';
import { ApiKeyModule } from '../api-key/api-key.module'; 
@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ApiKeyModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
