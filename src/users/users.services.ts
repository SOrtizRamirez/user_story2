// src/users/users.services.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';             
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/create-user.dto';
import { DeepPartial } from 'typeorm';
import { Role } from '../common/enums/role.enum';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) { }

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

  async findById(id: number) {
    return this.findOne(id);
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.repo.create({
      ...dto,
      password: hashedPassword,
    });

    return this.repo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { message: 'User deleted' };
  }

  async createFromOAuth(data: {
    email: string;
    name?: string;
    provider: string;      // 'google'
    providerId: string;    // id de Google
    avatar?: string;       // si luego lo quieres usar
  }): Promise<User> {
    const { email, name, provider, providerId } = data;

    const existing = await this.findByEmail(email);
    if (existing) {
      return existing;
    }

    const rawPassword = `oauth_${provider}_${providerId}_${Date.now()}`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const userData: DeepPartial<User> = {
      name: name || '',
      email,
      password: hashedPassword,  // 🔥 nunca null
      role: Role.CLIENT
    };

    const user = this.repo.create(userData);
    return this.repo.save(user);
  }


  async updateRefreshToken(
    userId: number,
    token: string | null,
  ): Promise<void> {
    await this.repo.update(
      { id: userId },
      { refreshTokenHash: token }
    );
  }
}
