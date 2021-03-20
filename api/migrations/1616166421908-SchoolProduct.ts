import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolProduct1616166421908 implements MigrationInterface {
    name = 'SchoolProduct1616166421908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_product" DROP COLUMN "unitPrice"`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD "parentUnitPrice" integer NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD "photographerUnitPrice" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_product" DROP COLUMN "photographerUnitPrice"`);
        await queryRunner.query(`ALTER TABLE "school_product" DROP COLUMN "parentUnitPrice"`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD "unitPrice" integer NOT NULL DEFAULT 0`);
    }

}
