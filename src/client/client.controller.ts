import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientService.create(createClientDto);
    }
    
    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clientService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles('admin', 'seller')
    @Put(':id')
    update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.update(id, updateClientDto);
    }

    @UseGuards(RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.clientService.remove(id);
    }
}