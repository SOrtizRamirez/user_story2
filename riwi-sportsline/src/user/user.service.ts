import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Para trabajar con bases de datos
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)  // se conecta a la entidad
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async create(createUser: CreateUserDto): Promise<User> {
    if (createUser.password) {
      const hashedPassword = await bcrypt.hash(createUser.password, 10);
      createUser.password = hashedPassword;
    }
    const user = this.userRepository.create( createUser );
    
    return await this.userRepository.save(user);
  }

  async update(id: number, userUpdate: Partial<UpdateUserDto>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (userUpdate.password) {
      const hashedPassword = await bcrypt.hash(userUpdate.password, 10);
      userUpdate.password = hashedPassword;
    }
    Object.assign(user, userUpdate);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return await this.userRepository.remove(user);
  }
}
