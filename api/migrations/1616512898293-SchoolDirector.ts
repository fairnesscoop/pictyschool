import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolDirector1616512898293 implements MigrationInterface {
    name = 'SchoolDirector1616512898293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ADD "directorId" uuid`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789" FOREIGN KEY ("directorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "directorId"`);
    }

}
