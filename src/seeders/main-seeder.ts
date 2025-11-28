import { AppDataSource } from "data-source";
import { seedUsers } from "./user.seeder";
import { seedClients } from "./client.seeder";
import { seedProducts } from "./product.seeder";
import { seedOrders } from "./order.seeder";
import { seedOrderDetails } from "./order-detail.seeder";
import { seedRoles } from "./role.seeder";
import { seedPermissions } from "./permission.seeder";

async function runSeeders() {
    await AppDataSource.initialize();
    console.log("✅ Conectado a la base de datos");

    await seedUsers(AppDataSource);
    await seedClients(AppDataSource);
    await seedProducts(AppDataSource);
    await seedOrders(AppDataSource);
    await seedOrderDetails(AppDataSource);
    await seedRoles(AppDataSource);
    await seedPermissions(AppDataSource);

    await AppDataSource.destroy();
    console.log("🌱 Seeders ejecutados correctamente.");
}


runSeeders().catch((err) => {
  console.error("❌ Error ejecutando seeders:", err);
  AppDataSource.destroy();
});
