  import { AppDataSource } from '../data-source';
  import { User } from '../user/entities/user.entity';
  import { Customer } from '../customer/entities/customer.entity';
  import { Product } from '../product/entities/product.entity';
  import { Order } from '../order/entities/order.entity';

  async function seedDatabase() {
    const dataSource = await AppDataSource.initialize();

    const userRepo = dataSource.getRepository(User);
    const customerRepo = dataSource.getRepository(Customer);
    const productRepo = dataSource.getRepository(Product);
    const orderRepo = dataSource.getRepository(Order);

    //  Usuario Admin
    const adminUser = userRepo.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: '123456',
      role: 'admin'
    });
    await userRepo.save(adminUser);

    //  Cliente
    const customer = customerRepo.create({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '3001234567',
      address: 'Calle 45 #10-20, Medellín',
    });
    await customerRepo.save(customer);

    // Productos
    const product1 = productRepo.create({
      name: 'Camiseta deportiva',
      price: 90000,
      description: 'Camiseta transpirable de alta calidad',
    });

    const product2 = productRepo.create({
      name: 'Balón de fútbol',
      price: 120000,
      description: 'Balón profesional tamaño 5',
    });

    await productRepo.save([product1, product2]);

    // Pedido
    const order = orderRepo.create({
      user: adminUser,
      customer: customer,
      products: [product1, product2],
      total: product1.price + product2.price,
    });
    await orderRepo.save(order);

    console.log(' Seed completado con éxito');
    await dataSource.destroy();
  }

  seedDatabase().catch((err) => {
    console.error(' Error al ejecutar el seeder:', err);
  });
