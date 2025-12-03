import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard, RbacGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiBody({ type: RegisterDto })
    @Roles('Admin')
    @Permissions('Create')
    @Post()
    create(@Body() dto: RegisterDto) {
        return this.userService.create(dto);
    }

    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
    @Roles('Admin')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: Number })
    @Roles('Admin')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @ApiOperation({ summary: 'Actualizar un usuario existente' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del usuario a actualizar', type: Number })
    @ApiBody({ type: UpdateUserDto })
    @Roles('Admin')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @ApiOperation({ summary: 'Eliminar un usuario' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del usuario a eliminar', type: Number })
    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}