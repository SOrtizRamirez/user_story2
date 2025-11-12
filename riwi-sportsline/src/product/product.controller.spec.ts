import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProduct = { id: 1, name: 'Laptop', price: 1000 };

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findById: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los productos', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockProduct]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería retornar un producto por ID', async () => {
    const result = await controller.findById(1);
    expect(result).toEqual(mockProduct);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('debería crear un producto', async () => {
    const dto: CreateProductDto = { name: 'Mouse', price: 50 } as any;
    const result = await controller.create(dto);
    expect(result).toEqual(mockProduct);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería actualizar un producto', async () => {
    const dto: UpdateProductDto = { price: 1200 };
    const result = await controller.update(1, dto);
    expect(result).toEqual(mockProduct);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('debería eliminar un producto', async () => {
    const result = await controller.delete(1);
    expect(result).toEqual(mockProduct);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
