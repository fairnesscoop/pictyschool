import {MigrationInterface, QueryRunner} from "typeorm";

export class Voucher1617438352492 implements MigrationInterface {
    name = 'Voucher1617438352492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voucher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "schoolId" uuid NOT NULL, CONSTRAINT "PK_677ae75f380e81c2f103a57ffaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "voucher" ADD CONSTRAINT "FK_c837a392c774db4d54bc8d8484c" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voucher" DROP CONSTRAINT "FK_c837a392c774db4d54bc8d8484c"`);
        await queryRunner.query(`DROP TABLE "voucher"`);
    }

}
