import { DataSource } from "typeorm";
import { Client } from "src/client/client.entity";

export async function seedClients(dataSource: DataSource) {
    const repo = dataSource.getRepository(Client);
    const count = await repo.count();
    if (count > 0) {
        console.log('⚠️ Ya existen clientes, seeder omitido.');
        return;
    }

    const clients = repo.create([
        { name: "Carlos Pérez", email: "carlos@mail.com", password: "123456" },
        { name: "María López", email: "maria@mail.com", password: "123456" },
    ]);

    await repo.save(clients);
    console.log('✅ Clientes insertados correctamente.')
}