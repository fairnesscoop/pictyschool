import {MigrationInterface, QueryRunner} from "typeorm";

export class Ingestion1620379228495 implements MigrationInterface {
    name = 'Ingestion1620379228495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "ingestion_state_enum" AS ENUM('init', 'upload_started', 'upload_cancelled', 'upload_finished', 'failed')`);
        await queryRunner.query(`CREATE TABLE "ingestion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" "ingestion_state_enum" NOT NULL DEFAULT 'init', "schoolId" uuid NOT NULL, CONSTRAINT "PK_c318c071e868a0a37153cabf606" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingestion" ADD CONSTRAINT "FK_bedba27d2f82d30b329ca7248f1" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingestion" DROP CONSTRAINT "FK_bedba27d2f82d30b329ca7248f1"`);
        await queryRunner.query(`DROP TABLE "ingestion"`);
        await queryRunner.query(`DROP TYPE "ingestion_state_enum"`);
    }

}
