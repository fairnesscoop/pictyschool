import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductWeight1622379534005 implements MigrationInterface {
    name = 'ProductWeight1622379534005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping_cost" RENAME COLUMN "grams" TO "weight"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "weight" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "shipping_cost" RENAME COLUMN "weight" TO "grams"`);
    }

}
