import {MigrationInterface, QueryRunner} from "typeorm";

export class ShootingNotice1622382189406 implements MigrationInterface {
    name = 'ShootingNotice1622382189406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooting" ADD "notice" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shooting" DROP COLUMN "notice"`);
    }

}
