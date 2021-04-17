import {MigrationInterface, QueryRunner} from "typeorm";

export class Shooting1618659343512 implements MigrationInterface {
    name = 'Shooting1618659343512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_92a92cf6e76017c70a95170a540"`);
        await queryRunner.query(`CREATE TYPE "shooting_status_enum" AS ENUM('enabled', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "shooting" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "shoointingDate" date NOT NULL, "closingDate" date NOT NULL, "status" "shooting_status_enum" NOT NULL DEFAULT 'disabled', "schoolId" uuid NOT NULL, CONSTRAINT "PK_f41f1588cd6d69dca794f93c8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "pdv"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "schoolId"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "shootingId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shooting" ADD CONSTRAINT "FK_35765c057b260a030d29b812281" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_e4a158e221f64fd303021454b51" FOREIGN KEY ("shootingId") REFERENCES "shooting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "access_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_e4a158e221f64fd303021454b51"`);
        await queryRunner.query(`ALTER TABLE "shooting" DROP CONSTRAINT "FK_35765c057b260a030d29b812281"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "shootingId"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "schoolId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ADD "pdv" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "shooting"`);
        await queryRunner.query(`DROP TYPE "shooting_status_enum"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_92a92cf6e76017c70a95170a540" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
