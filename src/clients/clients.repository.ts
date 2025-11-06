import { Injectable } from '@nestjs/common';
import { Client } from './client.entity';
import { DataSource, EntityManager, ILike, Repository } from 'typeorm';

@Injectable()
export class ClientsRepository extends Repository<Client> {
  constructor(private readonly dataSource: DataSource) {
    super(Client, dataSource.createEntityManager());
  }

  withManager(manager: EntityManager): ClientsRepository {
    const repo = new ClientsRepository(this.dataSource);
    // @ts-ignore
    repo.manager = manager;
    return repo;
  }

  findPaginated(page = 1, limit = 10) {
    return this.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  findByDocument(documentNumber: string) {
    return this.findOne({ where: { documentNumber } });
  }

  search(term: string, page = 1, limit = 10) {
    return this.find({
      where: [
        { name: ILike(`%${term}%`) },
        { email: ILike(`%${term}%`) },
        { documentNumber: ILike(`%${term}%`) },
      ],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }
}
