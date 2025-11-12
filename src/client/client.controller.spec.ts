import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  const mockCustomer = { id: 1, name: 'José', email: 'test@test.com', password: '123' };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findById: jest.fn().mockResolvedValue(mockCustomer),
    create: jest.fn().mockResolvedValue(mockCustomer),
    update: jest.fn().mockResolvedValue(mockCustomer),
    remove: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los clientes', async () => {
    expect(await controller.findAll()).toEqual([mockCustomer]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería retornar un cliente por ID', async () => {
    expect(await controller.findOne(1)).toEqual(mockCustomer);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('debería crear un cliente', async () => {
    const dto: CreateClientDto = {
      name: 'Ana',
      email: 'ana@test.com',
      password: '123',
    };
    expect(await controller.create(dto)).toEqual(mockCustomer);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería actualizar un cliente', async () => {
    const dto: UpdateClientDto = { name: 'José modificado' };
    expect(await controller.update(1, dto)).toEqual(mockCustomer);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('debería eliminar un cliente', async () => {
    expect(await controller.remove(1)).toEqual(mockCustomer);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});