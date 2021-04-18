import {MigrationInterface, QueryRunner} from "typeorm";

export class DiscountType1618768550317 implements MigrationInterface {
    name = 'DiscountType1618768550317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "discount"`);
        await queryRunner.query(`CREATE TYPE "discount_type_enum" AS ENUM('percent', 'amount')`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "type" "discount_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "value" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "discount_type_enum"`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "discount" integer NOT NULL`);
    }

}
