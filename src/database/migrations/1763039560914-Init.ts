import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1763039560914 implements MigrationInterface {
    name = 'Init1763039560914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "documentNumber" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d866e63d1c138ea2de12f4676e" ON "clients" ("documentNumber") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "sku" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "price" numeric(12,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c44ac33a05b144dd0d9ddcf932" ON "products" ("sku") `);
        await queryRunner.query(`CREATE TABLE "order_items" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "unitPrice" numeric(12,2) NOT NULL, "lineTotal" numeric(12,2) NOT NULL, "orderId" integer, "productId" integer, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Order" ("id" SERIAL NOT NULL, "total" numeric(12,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'customer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_cdb99c05982d5191ac8465ac010" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_9043e6216860099ac14958ed7ee" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_9043e6216860099ac14958ed7ee"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_cdb99c05982d5191ac8465ac010"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Order"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c44ac33a05b144dd0d9ddcf932"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d866e63d1c138ea2de12f4676e"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
