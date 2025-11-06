import { DataSource } from "typeorm";
import { User } from "src/user/user.entity";

export async function seedUsers(dataSource: DataSource) {
    const userRepo = dataSource.getRepository(User);
    const count = await userRepo.count();
    if (count > 0) {
        console.log("⚠️ Ya existen usurios, seeder omitido.");
        return;
    }

    const users = userRepo.create([
        { name: 'Admin', email: 'admin@mail.com', password: '123456' },
        { name: 'Seller', email: 'seller@mail.com', password: '123456' },
    ]);

    await userRepo.save(users);
    console.log('✅ Usuarios insertados correctamente.')
}