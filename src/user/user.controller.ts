import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, RbacGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles('Admin')
    @Permissions('Create')
    @Post()
    create(@Body() dto: RegisterDto) {
        return this.userService.create(dto);
    }

    @Roles('Admin')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Roles('Admin')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Roles('Admin')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(+id, dto);
    }

    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}