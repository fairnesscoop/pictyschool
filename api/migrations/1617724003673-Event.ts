import {MigrationInterface, QueryRunner} from "typeorm";

export class Event1617724003673 implements MigrationInterface {
    name = 'Event1617724003673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "summary" character varying, "schoolId" uuid NOT NULL, "photographerId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e4d1b1384d9f0d65a116523f8bd" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_b433cf0b27b9d6ec873f07203dd" FOREIGN KEY ("photographerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_b433cf0b27b9d6ec873f07203dd"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e4d1b1384d9f0d65a116523f8bd"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
