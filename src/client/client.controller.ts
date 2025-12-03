import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RbacGuard } from 'src/common/guards/rbac.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('clients')
@UseGuards(JwtAuthGuard, RbacGuard)
export class ClientController {
    constructor(private readonly clientService: ClientService) {}
    
    @Roles('Admin', 'Seller')
    @Permissions('Create')
    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }
    
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get()
    findAll() {
        return this.clientService.findAll();
    }
    
    @Roles('Admin', 'Seller')
    @Permissions('Read')
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clientService.findOne(id);
    }
    
    @Roles('Admin', 'Seller')
    @Permissions('Update')
    @Put(':id')
    update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }
    
    @Roles('Admin')
    @Permissions('Delete')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.clientService.remove(id);
    }
}