import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomer = { id: 1, name: 'José', email: 'test@test.com', phone: '123', address: 'Calle 1' };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockCustomer]),
    findById: jest.fn().mockResolvedValue(mockCustomer),
    create: jest.fn().mockResolvedValue(mockCustomer),
    update: jest.fn().mockResolvedValue(mockCustomer),
    remove: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los clientes', async () => {
    expect(await controller.findAll()).toEqual([mockCustomer]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería retornar un cliente por ID', async () => {
    expect(await controller.findById(1)).toEqual(mockCustomer);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('debería crear un cliente', async () => {
    const dto: CreateCustomerDto = {
      name: 'Ana',
      email: 'ana@test.com',
      phone: '456',
      address: 'Calle 2',
    };
    expect(await controller.create(dto)).toEqual(mockCustomer);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería actualizar un cliente', async () => {
    const dto: UpdateCustomerDto = { name: 'José modificado' };
    expect(await controller.update(1, dto)).toEqual(mockCustomer);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('debería eliminar un cliente', async () => {
    expect(await controller.delete(1)).toEqual(mockCustomer);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
