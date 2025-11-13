import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard';

//@UseFilters(HttpExceptionFilter) // ← se aplica solo a este controlador
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  //Inyectamos el servicio
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin', 'user') // solo admin puede ver todos los clientes
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  @Roles('admin', 'user')
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  update(@Param('id') id: number, @Body() dto: CreateUserDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  delete(@Param('id') id: number): Promise<User> {
    return this.userService.remove(id);
  }
}
