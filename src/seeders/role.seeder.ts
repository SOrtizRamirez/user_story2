import { DataSource } from "typeorm";
import { Role } from "src/roles/entities/role.entity";

export async function seedRoles(dataSource: DataSource) {
    const roleRepo = dataSource.getRepository(Role);
    const count = await roleRepo.count();
    if (count > 0) {
        console.log("⚠️ Ya existen roles, seeder omitido.");
        return;
    }

    const roles = roleRepo.create([
        { name: 'Admin' },
        { name: 'Seller' },
    ]);

    await roleRepo.save(roles);
    console.log('✅ Roles insertados correctamente.')
}