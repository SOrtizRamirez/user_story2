import { DataSource } from "typeorm";
import { Permission } from "src/roles/entities/permission.entity";


export async function seedPermissions(dataSource: DataSource) {
    const permissionRepo = dataSource.getRepository(Permission);
    const count = await permissionRepo.count();
    if (count > 0) {
        console.log("⚠️ Ya existen permisos, seeder omitido.");
        return;
    }

    const permissions = permissionRepo.create([
        { name: 'Create' },
        { name: 'Read' },
        { name: 'Update' },
        { name: 'Delete' },
    ]);

    await permissionRepo.save(permissions);
    console.log('✅ Permisos insertados correctamente.')
}
