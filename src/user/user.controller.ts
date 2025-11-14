import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @UseGuards(RolesGuard)
    @Roles('admin')
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(+id, dto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}