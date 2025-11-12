import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let mockRepository: Record<string, jest.Mock>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([{ id: 1, name: 'José', email: 'test@test.com', phone: '123', address: 'Calle 1' }]),
      findOneBy: jest.fn().mockResolvedValue({ id: 1, name: 'José', email: 'test@test.com', phone: '123', address: 'Calle 1' }),
      create: jest.fn().mockImplementation(dto => dto),
      save: jest.fn().mockImplementation(customer => Promise.resolve({ id: Date.now(), ...customer })),
      remove: jest.fn().mockResolvedValue({ id: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería retornar todos los clientes', async () => {
    const result = await service.findAll();
    expect(result).toHaveLength(1);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('debería retornar un cliente por ID', async () => {
    const result = await service.findById(1);
    expect(result).toHaveProperty('name', 'José');
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('debería lanzar un error si no encuentra el cliente', async () => {
    mockRepository.findOneBy.mockResolvedValueOnce(null);
    await expect(service.findById(999)).rejects.toThrow(NotFoundException);
  });

  it('debería crear un nuevo cliente', async () => {
    const dto = { name: 'Ana', email: 'ana@test.com', phone: '456', address: 'Calle 2' };
    const result = await service.create(dto);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id');
  });

  it('debería eliminar un cliente', async () => {
    const result = await service.remove(1);
    expect(result).toHaveProperty('id');
    expect(mockRepository.remove).toHaveBeenCalled();
  });
});
 