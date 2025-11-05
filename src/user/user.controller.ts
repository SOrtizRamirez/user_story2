import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() data: Partial<User>) {
        return this.userService.create(data);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }
}
