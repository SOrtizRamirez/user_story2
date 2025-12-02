import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { RbacGuard } from 'src/common/guards/rbac.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RolesController],
  providers: [RolesService, RbacGuard],
  exports: [RolesService, RbacGuard],
})
export class RolesModule {}
