// src/users/users.services.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto} from '../dtos/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(data: CreateUserDto) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    await this.repo.update({ id }, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.repo.delete({ id });
    return { message: `User with id ${id} deleted successfully` };
  }
}
