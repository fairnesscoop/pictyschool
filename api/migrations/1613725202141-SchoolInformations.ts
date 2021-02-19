import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolInformations1613725202141 implements MigrationInterface {
    name = 'SchoolInformations1613725202141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_84c841ca1c567b900a15c71ac6b"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "photographerId"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "phoneNumber" character varying`);
        await queryRunner.query(`ALTER TABLE "school" ADD "director" character varying`);
        await queryRunner.query(`CREATE TYPE "school_directorcivility_enum" AS ENUM('mr', 'mme')`);
        await queryRunner.query(`ALTER TABLE "school" ADD "directorCivility" "school_directorcivility_enum"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "school" ADD "numberOfStudents" integer DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "school" ADD "numberOfClasses" integer DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "school" ADD "observation" text`);
        await queryRunner.query(`ALTER TABLE "school" ADD "pdv" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "pdv"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "observation"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "numberOfClasses"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "numberOfStudents"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "directorCivility"`);
        await queryRunner.query(`DROP TYPE "school_directorcivility_enum"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "director"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "photographerId" uuid`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_84c841ca1c567b900a15c71ac6b" FOREIGN KEY ("photographerId") REFERENCES "photographer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
