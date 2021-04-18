import {MigrationInterface, QueryRunner} from "typeorm";

export class Discount1618750529200 implements MigrationInterface {
    name = 'Discount1618750529200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "discount" integer NOT NULL, "schoolId" uuid NOT NULL, CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "discount" ADD CONSTRAINT "FK_79a9c79cacf939151554c454e96" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" DROP CONSTRAINT "FK_79a9c79cacf939151554c454e96"`);
        await queryRunner.query(`DROP TABLE "discount"`);
    }

}
