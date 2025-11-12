// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { ProductService } from './product.service';
// import { Product } from './entities/product.entity';
// import { NotFoundException } from '@nestjs/common';

// describe('ProductService', () => {
//   let service: ProductService;
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
//         ProductService,
//         {
//           provide: getRepositoryToken(Product),
//           useValue: mockRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<ProductService>(ProductService);
//   });

//   it('debería estar definido', () => {
//     expect(service).toBeDefined();
//   });

//   it('debería retornar todos los productos', async () => {
//     const mockProducts = [
//       { id: 1, name: 'Laptop', price: 1000 },
//       { id: 2, name: 'Mouse', price: 50 },
//     ];
//     mockRepository.find.mockResolvedValue(mockProducts);

//     const result = await service.findAll();
//     expect(result).toEqual(mockProducts);
//     expect(mockRepository.find).toHaveBeenCalled();
//   });

//   it('debería retornar un producto por ID', async () => {
//     const mockProduct = { id: 1, name: 'Laptop', price: 1000 };
//     mockRepository.findOneBy.mockResolvedValue(mockProduct);

//     const result = await service.findById(1);
//     expect(result).toEqual(mockProduct);
//     expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
//   });

//   it('debería lanzar un error si el producto no existe', async () => {
//     mockRepository.findOneBy.mockResolvedValue(null);

//     await expect(service.findById(999)).rejects.toThrow(NotFoundException);
//   });

//   it('debería crear un producto', async () => {
//     const dto = { name: 'Teclado', price: 200 };
//     const mockCreated = { id: 1, ...dto };

//     mockRepository.create.mockReturnValue(dto);
//     mockRepository.save.mockResolvedValue(mockCreated);

//     const result = await service.create(dto);
//     expect(mockRepository.create).toHaveBeenCalledWith(dto);
//     expect(mockRepository.save).toHaveBeenCalledWith(dto);
//     expect(result).toEqual(mockCreated);
//   });

//   it('debería actualizar un producto existente', async () => {
//     const mockProduct = { id: 1, name: 'Laptop', price: 1000 };
//     const updatedData = { price: 1200 };
//     const updatedProduct = { ...mockProduct, ...updatedData };

//     jest.spyOn(service, 'findById').mockResolvedValue(mockProduct);
//     mockRepository.save.mockResolvedValue(updatedProduct);

//     const result = await service.update(1, updatedData);
//     expect(service.findById).toHaveBeenCalledWith(1);
//     expect(mockRepository.save).toHaveBeenCalledWith(updatedProduct);
//     expect(result).toEqual(updatedProduct);
//   });

//   it('debería eliminar un producto', async () => {
//     const mockProduct = { id: 1, name: 'Laptop', price: 1000 };

//     jest.spyOn(service, 'findById').mockResolvedValue(mockProduct);
//     mockRepository.remove.mockResolvedValue(mockProduct);

//     const result = await service.remove(1);
//     expect(service.findById).toHaveBeenCalledWith(1);
//     expect(mockRepository.remove).toHaveBeenCalledWith(mockProduct);
//     expect(result).toEqual(mockProduct);
//   });
// });
