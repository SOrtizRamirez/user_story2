import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}
    
    create(data: Partial<User>) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    findAll() {
        return this.userRepo.find();
    }
}

// HU3 - Tarea 1 - "Generar los módulos, controladores y servicios de usuario, producto y cliente." - LISTA.