// src/users/users.services.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from '../dtos/create-user.dto'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  // para el controlador (PATCH /users/:id)
  async updateFromDto(id: number, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.findById(id);
  }

  // para uso interno (auth, refresh token, etc.)
  async update(id: number, data: Partial<User>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}

