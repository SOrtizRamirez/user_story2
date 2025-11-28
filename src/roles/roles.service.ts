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
        const user = await this.userRepo.findOne({ where: { id }, relations: ["role"] });
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        const perms = new Set<string>();
        (user.role.permissions || []).forEach(p => perms.add(p.name));

        return Array.from(perms);
    }
}
