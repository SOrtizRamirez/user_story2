import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}
    
    async create(dto: RegisterDto): Promise<User> {
        const user = this.userRepo.create(dto);
        return this.userRepo.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepo.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepo.findOne({ where: { email }});;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return this.userRepo.save(user);
    }

    async remove(id: number): Promise<void> {
        const result = await this.userRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User #${id} not found`);
        }
    }

    // guarda un nuevo hash del refresh token
    async updateRefreshTokenHash(id: number, refreshToken: string): Promise<void> {
        const hash = await bcrypt.hash(refreshToken, 10);
        await this.userRepo.update(id, { refreshToken: hash });
    }

    /** Devuelve el hash almacenado del refresh token */
    async getRefreshTokenHash(id: number): Promise<string | null> {
        const user = await this.findOne(id);
        return user.refreshToken ?? null; 
    }
}