// src/database/seeds/seed.ts
import 'reflect-metadata';
import dataSource from '../datasource';
import { User } from '../../users/user.entity';
import { Client } from '../../clients/client.entity';
import { Product } from '../../products/product.entity';
import { Order } from '../../orders/orders.entity';
import { OrderItem } from '../../orders/order-item.entity';
import { Role } from '../../common/enums/role.enum';
import * as bcrypt from 'bcrypt';

async function seedUsers() {
  const userRepo = dataSource.getRepository(User);

  const count = await userRepo.count();
  if (count > 0) {
    console.log('Users ya tienen datos, saltando...');
    return;
  }

  const passwordAdmin = await bcrypt.hash('Admin123*', 10);
  const passwordSeller = await bcrypt.hash('Seller123*', 10);
  const passwordCustomer = await bcrypt.hash('Customer123*', 10);

  const usersData = [
    {
      name: 'Admin Riwi',
      email: 'admin@riwisportsline.com',
      password: passwordAdmin,
      role: Role.ADMIN
    },
    {
      name: 'Vendedor 1',
      email: 'seller1@riwisportsline.com',
      password: passwordSeller,
      role: Role.SELLER
    },
    {
      name: 'Cliente Interno',
      email: 'customer1@riwisportsline.com',
      password: passwordCustomer,
      role: Role.CLIENT
    },
    {
      name: 'Usuario Google Test',
      email: 'googleuser@example.com',
      password: await bcrypt.hash('temp', 10),
      role: Role.CLIENT,
      provider: 'google',
      providerId: 'google_123456789',
      avatar: 'https://example.com/avatar.jpg'
    },
  ];

  const users = usersData.map((data) => userRepo.create(data));
  await userRepo.save(users);

  console.log('✅ Users sembrados');
}

async function seedClients() {
  const clientRepo = dataSource.getRepository(Client);

  const count = await clientRepo.count();
  if (count > 0) {
    console.log('Clients ya tienen datos, saltando...');
    return;
  }

  const clientsData = [
    {
      documentNumber: "123456789",
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+57 3001234567',
      address: 'Calle 10 # 20-30, Medellín',
    },
    {
      documentNumber: "987654321",
      name: 'María Gómez',
      email: 'maria.gomez@example.com',
      phone: '+57 3019876543',
      address: 'Carrera 45 # 50-60, Medellín',
    },
    {
      documentNumber: "1122334455",
      name: 'Equipo Atlético Medellín',
      email: 'contacto@atlmedellin.com',
      phone: '+57 3025556677',
      address: 'Estadio Atanasio Girardot, Medellín',
    },
  ];

  const clients = clientsData.map((data) => clientRepo.create(data));
  await clientRepo.save(clients);

  console.log('✅ Clients sembrados');
}

async function seedProducts() {
  const productRepo = dataSource.getRepository(Product);

  const count = await productRepo.count();
  if (count > 0) {
    console.log('Products ya tienen datos, saltando...');
    return;
  }

  const productsData = [
    {
      sku: 'CRP-001',
      name: 'Camiseta Running Pro',
      description: 'Camiseta deportiva ligera para running con tecnología dry-fit.',
      price: '120000',
      isActive: true
    },
    {
      sku: 'PTF-002',
      name: 'Pantaloneta Training Flex',
      description: 'Pantaloneta elástica para entrenamientos de alta intensidad.',
      price: '90000',
      isActive: true
    },
    {
      sku: 'BFR-003',
      name: 'Balón Fútbol Pro Riwi',
      description: 'Balón profesional tamaño 5 para césped natural.',
      price: '150000',
      category: 'Accesorios',
      isActive: true
    },
    {
      sku: 'TRU-004',
      name: 'Tenis Running UltraLight',
      description: 'Zapatillas para running con amortiguación avanzada.',
      price: '280000',
      stock: '25',
      isActive: true
    },
    {
      sku: 'GGG-005',
      name: 'Guantes Gym Grip',
      description: 'Guantes para levantamiento de pesas con agarre reforzado.',
      price: '60000',
      isActive: true
    },
  ];

  const products = productsData.map((data) => productRepo.create(data));
  await productRepo.save(products);

  console.log('✅ Products sembrados');
}

async function seedOrders() {
  const orderRepo = dataSource.getRepository(Order);
  const orderItemRepo = dataSource.getRepository(OrderItem);
  const clientRepo = dataSource.getRepository(Client);
  const userRepo = dataSource.getRepository(User);
  const productRepo = dataSource.getRepository(Product);

  const count = await orderRepo.count();
  if (count > 0) {
    console.log('Orders ya tienen datos, saltando...');
    return;
  }

  const clients = await clientRepo.find();
  const products = await productRepo.find();
  const seller = await userRepo.findOne({
    where: { role: Role.SELLER }, 
  });

  if (clients.length < 2 || products.length < 5 || !seller) {
    console.warn(
      'No hay suficientes datos para crear orders. Asegúrate de haber corrido seedUsers, seedClients y seedProducts primero.',
    );
    return;
  }

  const [client1, client2] = clients;

  const order1 = orderRepo.create({
    client: client1,
    user: seller,
    total: '0',
  });

  const order2 = orderRepo.create({
    client: client2,
    user: seller,
    total: '0',
  });

  await orderRepo.save([order1, order2]);

  const itemsData = [
    {
      quantity: 2,
      order: order1,
      product: products[0],
      unitPrice: products[0].price,
    },
    {
      quantity: 1,
      order: order1,
      product: products[2],
      unitPrice: products[2].price,
    },
    {
      quantity: 1,
      order: order2,
      product: products[3],
      unitPrice: products[3].price,
    },
    {
      quantity: 2,
      order: order2,
      product: products[4],
      unitPrice: products[4].price,
    },
  ];

  const orderItems = itemsData.map((data) =>
    orderItemRepo.create(data),
  );

  await orderItemRepo.save(orderItems);
  const ordersWithItems = await orderRepo.find(); // eager:true ya trae items

  for (const order of ordersWithItems) {
    const totalNumber = order.items.reduce((sum, item: any) => {
      const price = Number(item.price);
      const quantity = Number(item.quantity);
      return sum + price * quantity;
    }, 0);

    order.total = totalNumber.toFixed(2); // string con 2 decimales
    await orderRepo.save(order);
  }

  console.log('✅ Orders y OrderItems sembrados');
}

async function runSeed() {
  try {
    await dataSource.initialize();
    console.log('📦 Iniciando seed de Riwi SportsLine...');

    await seedUsers();
    await seedClients();
    await seedProducts();
    await seedOrders();

    console.log('🎉 Seeds completados correctamente');
  } catch (error) {
    console.error('❌ Error ejecutando seeds', error);
  } finally {
    await dataSource.destroy();
  }
}

runSeed();
