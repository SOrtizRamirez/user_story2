// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { OrderService } from './order.service';
// import { Order } from './entities/order.entity';
// import { NotFoundException } from '@nestjs/common';

// describe('OrderService', () => {
//   let service: OrderService;
//   let mockRepository: Record<string, jest.Mock>;

//   beforeEach(async () => {
//     mockRepository = {
//       find: jest.fn(),
//       findOneBy: jest.fn(),
//       create: jest.fn(),
//       save: jest.fn(),
//       remove: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         OrderService,
//         {
//           provide: getRepositoryToken(Order),
//           useValue: mockRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<OrderService>(OrderService);
//   });

//   it('debería estar definido', () => {
//     expect(service).toBeDefined();
//   });

//   it('debería retornar todas las órdenes', async () => {
//     const mockOrders = [
//       { id: 1, customerName: 'José', total: 500 },
//       { id: 2, customerName: 'Ana', total: 200 },
//     ];
//     mockRepository.find.mockResolvedValue(mockOrders);

//     const result = await service.findAll();
//     expect(result).toEqual(mockOrders);
//     expect(mockRepository.find).toHaveBeenCalled();
//   });

//   it('debería retornar una orden por ID', async () => {
//     const mockOrder = { id: 1, customerName: 'José', total: 500 };
//     mockRepository.findOneBy.mockResolvedValue(mockOrder);

//     const result = await service.findById(1);
//     expect(result).toEqual(mockOrder);
//     expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
//   });

//   it('debería lanzar un error si no encuentra la orden', async () => {
//     mockRepository.findOneBy.mockResolvedValue(null);

//     await expect(service.findById(999)).rejects.toThrow(NotFoundException);
//   });

//   it('debería crear una nueva orden', async () => {
//     const dto = { customerName: 'Ana', total: 200 };
//     const mockCreated = { id: 1, ...dto };

//     mockRepository.create.mockReturnValue(dto);
//     mockRepository.save.mockResolvedValue(mockCreated);

//     const result = await service.create(dto);
//     expect(mockRepository.create).toHaveBeenCalledWith(dto);
//     expect(mockRepository.save).toHaveBeenCalledWith(dto);
//     expect(result).toEqual(mockCreated);
//   });

//   it('debería actualizar una orden existente', async () => {
//     const mockOrder = { id: 1, customerName: 'José', total: 500 };
//     const updatedData = { total: 700 };
//     const updatedOrder = { ...mockOrder, ...updatedData };

//     jest.spyOn(service, 'findById').mockResolvedValue(mockOrder);
//     mockRepository.save.mockResolvedValue(updatedOrder);

//     const result = await service.update(1, updatedData);
//     expect(service.findById).toHaveBeenCalledWith(1);
//     expect(mockRepository.save).toHaveBeenCalledWith(updatedOrder);
//     expect(result).toEqual(updatedOrder);
//   });

//   it('debería eliminar una orden', async () => {
//     const mockOrder = { id: 1, customerName: 'José', total: 500 };

//     jest.spyOn(service, 'findById').mockResolvedValue(mockOrder);
//     mockRepository.remove.mockResolvedValue(mockOrder);

//     const result = await service.remove(1);
//     expect(service.findById).toHaveBeenCalledWith(1);
//     expect(mockRepository.remove).toHaveBeenCalledWith(mockOrder);
//     expect(result).toEqual(mockOrder);
//   });
// });
