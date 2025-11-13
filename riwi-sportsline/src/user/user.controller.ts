import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

//@UseFilters(HttpExceptionFilter) // ← se aplica solo a este controlador
@Controller('users')
export class UserController {
  //Inyectamos el servicio
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
