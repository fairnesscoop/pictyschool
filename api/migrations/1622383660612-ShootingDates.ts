import {MigrationInterface, QueryRunner} from "typeorm";

export class ShootingDates1622383660612 implements MigrationInterface {
    name = 'ShootingDates1622383660612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooting" DROP COLUMN "closingDate"`);
        await queryRunner.query(`ALTER TABLE "shooting" ADD "groupClosingDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shooting" ADD "individualClosingDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooting" DROP COLUMN "individualClosingDate"`);
        await queryRunner.query(`ALTER TABLE "shooting" DROP COLUMN "groupClosingDate"`);
        await queryRunner.query(`ALTER TABLE "shooting" ADD "closingDate" date NOT NULL`);
    }

}
