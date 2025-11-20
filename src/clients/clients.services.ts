import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { Client } from './client.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guards';

@UseGuards(JwtAuthGuard)  
@Injectable()
export class ClientsService {
  constructor(private readonly repo: ClientsRepository) {}

  async create(dto: Partial<Client>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(page = 1, limit = 10) {
    return this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const client = await this.repo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async update(id: number, dto: Partial<Client>) {
    await this.ensureExists(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.ensureExists(id);
    await this.repo.delete(id);
    return { ok: true };
  }

  private async ensureExists(id: number) {
    const exists = await this.repo.exist({ where: { id } });
    if (!exists) throw new NotFoundException('Client not found');
  }
}
