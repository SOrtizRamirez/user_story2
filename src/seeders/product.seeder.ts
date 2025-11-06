import { DataSource } from "typeorm";
import { Product } from "src/product/product.entity";

export async function seedProducts(dataSource: DataSource) {
    const repo = dataSource.getRepository(Product);
    const count = await repo.count();
    if (count > 0) {
        console.log("⚠️  Productos ya existen, seeder omitido.");
        return;
    }

    const products = repo.create([
        { name: "Balón de fútbol", description: "Balón oficial tamaño 5", price: 100000, stock: 30 },
        { name: "Guantes de portero", description: "Talla M", price: 80000, stock: 20 },
        { name: "Camiseta deportiva", description: "Talla L", price: 50000, stock: 50 },
    ]);

    await repo.save(products);
    console.log("✅ Productos insertados correctamente.");
}