import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10); //10 = salta rondas
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
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
