import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepo: Repository<Role>,

        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async findAll(): Promise<Role[]> {
        return this.roleRepo.find({ relations: ['permissions'] });
    }

    async getUserPermissions(id: number): Promise<string[]> {
        const user = await this.userRepo.findOne({ where: { id }, relations: ["role", "role.permissions"] });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        if (!user.role) throw new NotFoundException(`User with id ${id} has no role`);

        return user.role.permissions?.map(p => p.name) || [];
    }
}
