import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolAddress1609056073740 implements MigrationInterface {
    name = 'SchoolAddress1609056073740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "address"`);
    }

}
