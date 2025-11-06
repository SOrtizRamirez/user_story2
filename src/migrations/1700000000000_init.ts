import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1700000000000 implements MigrationInterface {
  name = 'Init1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'seller'
      );
      CREATE TABLE clients (
        id SERIAL PRIMARY KEY,
        documentNumber VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50)
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(12,2) NOT NULL,
        isActive BOOLEAN NOT NULL DEFAULT TRUE
      );
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        clientId INT NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
        userId INT REFERENCES users(id) ON DELETE SET NULL,
        total NUMERIC(12,2) NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now()
      );
      CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        "orderId" INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        "productId" INT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
        quantity INT NOT NULL,
        "unitPrice" NUMERIC(12,2) NOT NULL,
        "lineTotal" NUMERIC(12,2) NOT NULL
      );
      CREATE INDEX idx_products_sku ON products(sku);
      CREATE INDEX idx_clients_document ON clients(documentNumber);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS clients;
      DROP TABLE IF EXISTS users;
    `);
  }
}
