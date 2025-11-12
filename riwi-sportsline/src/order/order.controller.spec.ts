import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrder = { id: 1, customerName: 'José', total: 500 };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findById: jest.fn().mockResolvedValue(mockOrder),
    create: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue(mockOrder),
    remove: jest.fn().mockResolvedValue(mockOrder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todas las órdenes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockOrder]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería retornar una orden por ID', async () => {
    const result = await controller.findById(1);
    expect(result).toEqual(mockOrder);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('debería crear una orden', async () => {
    const dto: CreateOrderDto = { customerName: 'Ana', total: 700 } as any;
    const result = await controller.create(dto);
    expect(result).toEqual(mockOrder);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería actualizar una orden', async () => {
    const dto: UpdateOrderDto = { total: 900 };
    const result = await controller.update(1, dto);
    expect(result).toEqual(mockOrder);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('debería eliminar una orden', async () => {
    const result = await controller.delete(1);
    expect(result).toEqual(mockOrder);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
