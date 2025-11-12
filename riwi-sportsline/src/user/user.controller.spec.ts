// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { User } from './entities/user.entity';

// describe('UserController', () => {
//   let controller: UserController;
//   let service: UserService;

//   const mockUserService = {
//     findAll: jest.fn(),
//     findById: jest.fn(),
//     create: jest.fn(),
//     update: jest.fn(),
//     remove: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [{ provide: UserService, useValue: mockUserService }],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     service = module.get<UserService>(UserService);
//   });

//   it('debe retornar todos los usuarios', async () => {
//     const mockUsers = [{ id: 1, name: 'John' }] as User[];
//     mockUserService.findAll.mockResolvedValue(mockUsers);

//     const result = await controller.findAll();

//     expect(result).toEqual(mockUsers);
//     expect(service.findAll).toHaveBeenCalled();
//   });

//   it('debe retornar un usuario por id', async () => {
//     const mockUser = { id: 1, name: 'John' } as User;
//     mockUserService.findById.mockResolvedValue(mockUser);

//     const result = await controller.findById(1);

//     expect(result).toEqual(mockUser);
//     expect(service.findById).toHaveBeenCalledWith(1);
//   });

//   it('debe crear un usuario', async () => {
//     const dto = { name: 'John', email: 'john@mail.com', password: '1234', role: 'user' };
//     const mockUser = { id: 1, ...dto } as User;
//     mockUserService.create.mockResolvedValue(mockUser);

//     const result = await controller.create(dto);

//     expect(result).toEqual(mockUser);
//     expect(service.create).toHaveBeenCalledWith(dto);
//   });

//   it('debe actualizar un usuario', async () => {
//     const dto = { name: 'John Updated', password: '5678' };
//     const mockUser = { id: 1, ...dto } as User;
//     mockUserService.update.mockResolvedValue(mockUser);

//     const result = await controller.update(1, dto);

//     expect(result).toEqual(mockUser);
//     expect(service.update).toHaveBeenCalledWith(1, dto);
//   });

//   it('debe eliminar un usuario', async () => {
//     const mockUser = { id: 1, name: 'John' } as User;
//     mockUserService.remove.mockResolvedValue(mockUser);

//     const result = await controller.delete(1);

//     expect(result).toEqual(mockUser);
//     expect(service.remove).toHaveBeenCalledWith(1);
//   });
// });
