import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1763478765279 implements MigrationInterface {
    name = 'Init1763478765279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshTokenHash" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'client', 'seller')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'client'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "providerId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "provider" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshTokenHash"`);
    }

}
