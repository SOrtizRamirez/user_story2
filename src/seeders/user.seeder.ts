import { DataSource } from "typeorm";
import { User } from "src/user/user.entity";
import * as bcrypt from 'bcrypt';

export async function seedUsers(dataSource: DataSource) {
    const userRepo = dataSource.getRepository(User);
    const count = await userRepo.count();
    if (count > 0) {
        console.log("⚠️ Ya existen usurios, seeder omitido.");
        return;
    }

    const pass = '123456'
    const password = await bcrypt.hash(pass, 10)

    const users = userRepo.create([
        { name: 'Admin', email: 'admin@mail.com', password, role: 'admin' },
        { name: 'Seller', email: 'seller@mail.com', password, role: 'seller' },
    ]);

    await userRepo.save(users);
    console.log('✅ Usuarios insertados correctamente.')
}