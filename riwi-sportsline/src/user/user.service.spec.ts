// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { NotFoundException } from '@nestjs/common';

// // Simulación (mock) del repositorio
// const mockUserRepository = () => ({
//   find: jest.fn(),
//   findOneBy: jest.fn(),
//   create: jest.fn(),
//   save: jest.fn(),
//   remove: jest.fn(),
// });

// describe('UserService', () => {
//   let service: UserService;
//   let repository: jest.Mocked<Repository<User>>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         UserService,
//         {
//           provide: getRepositoryToken(User),
//           useFactory: mockUserRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<UserService>(UserService);
//     repository = module.get(getRepositoryToken(User));
//   });

//   // 🧩 Test: findAll
//   it('debe retornar todos los usuarios', async () => {
//     const mockUsers = [{ id: 1, name: 'John' }] as User[];
//     repository.find.mockResolvedValue(mockUsers);

//     const result = await service.findAll();

//     expect(result).toEqual(mockUsers);
//     expect(repository.find).toHaveBeenCalled();
//   });

//   // 🧩 Test: findById (usuario encontrado)
//   it('debe retornar un usuario por id', async () => {
//     const mockUser = { id: 1, name: 'John' } as User;
//     repository.findOneBy.mockResolvedValue(mockUser);

//     const result = await service.findById(1);

//     expect(result).toEqual(mockUser);
//     expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
//   });

//   // 🧩 Test: findById (usuario no encontrado)
//   it('debe lanzar NotFoundException si no existe', async () => {
//     repository.findOneBy.mockResolvedValue(null);

//     await expect(service.findById(1)).rejects.toThrow(NotFoundException);
//   });

//   // 🧩 Test: create
//   it('debe crear un nuevo usuario con contraseña encriptada', async () => {
//     const dto = { name: 'John', email: 'test@mail.com', password: '1234', role: 'user' };
//     const hashedPassword = 'hashed';
//     const mockUser = { id: 1, ...dto, password: hashedPassword } as User;

//     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
//     repository.create.mockReturnValue(mockUser);
//     repository.save.mockResolvedValue(mockUser);

//     const result = await service.create(dto);

//     expect(bcrypt.hash).toHaveBeenCalledWith('1234', 10);
//     expect(repository.create).toHaveBeenCalled();
//     expect(repository.save).toHaveBeenCalledWith(mockUser);
//     expect(result).toEqual(mockUser);
//   });

//   // 🧩 Test: update
//   it('debe actualizar un usuario existente', async () => {
//     const existingUser = { id: 1, name: 'John', password: 'old' } as User;
//     const dto = { name: 'New John', password: 'new' };
//     const hashedPassword = 'hashedNew';
//     const updatedUser = { ...existingUser, ...dto, password: hashedPassword };

//     repository.findOneBy.mockResolvedValue(existingUser);
//     jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
//     repository.save.mockResolvedValue(updatedUser);

//     const result = await service.update(1, dto);

//     expect(result).toEqual(updatedUser);
//     expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ name: 'New John' }));
//   });

//   // 🧩 Test: remove
//   it('debe eliminar un usuario existente', async () => {
//     const mockUser = { id: 1, name: 'John' } as User;
//     repository.findOneBy.mockResolvedValue(mockUser);
//     repository.remove.mockResolvedValue(mockUser);

//     const result = await service.remove(1);

//     expect(result).toEqual(mockUser);
//     expect(repository.remove).toHaveBeenCalledWith(mockUser);
//   });
// });
