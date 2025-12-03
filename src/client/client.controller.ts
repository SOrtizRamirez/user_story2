import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Clientes')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ClientController {
    constructor(private readonly clientService: ClientService) {}
    
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
    @ApiBody({ type: CreateClientDto })
    @Roles('Admin', 'Seller')
    @Permissions('Create')
    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }
    
    @ApiOperation({ summary: 'Obtener todos los clientes' })
    @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente' })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.clientService.findAll();
    }
    
    @ApiOperation({ summary: 'Obtener un cliente por ID' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado' })
    @ApiParam({ name: 'id', description: 'ID del cliente' })
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clientService.findOne(id);
    }
    
    @ApiOperation({ summary: 'Actualizar un cliente' })
    @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del cliente a actualizar' })
    @ApiBody({ type: UpdateClientDto })
    @Roles('Admin', 'Seller')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }
    
    @ApiOperation({ summary: 'Eliminar un cliente' })
    @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
    @ApiParam({ name: 'id', description: 'ID del cliente a eliminar' })
    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.clientService.remove(id);
    }
}