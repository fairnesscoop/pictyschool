import {MigrationInterface, QueryRunner} from "typeorm";

export class ShippingCost1622313088850 implements MigrationInterface {
    name = 'ShippingCost1622313088850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipping_cost" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grams" integer NOT NULL DEFAULT 0, "price" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_e8ef26e79db93005ff8dacdc7b2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipping_cost"`);
    }

}
