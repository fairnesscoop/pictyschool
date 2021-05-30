import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolUsers1617268818418 implements MigrationInterface {
    name = 'SchoolUsers1617268818418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789"`);
        await queryRunner.query(`ALTER TABLE "school" RENAME COLUMN "directorId" TO "email"`);
        await queryRunner.query(`CREATE TABLE "school_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "schoolId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_b75c78082d7ea9dff30f9aba409" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "school_user" ADD CONSTRAINT "FK_414383e1bc95a2c691ddfd7a49f" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_user" ADD CONSTRAINT "FK_85a63063b7de70a37efc967c156" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_user" DROP CONSTRAINT "FK_85a63063b7de70a37efc967c156"`);
        await queryRunner.query(`ALTER TABLE "school_user" DROP CONSTRAINT "FK_414383e1bc95a2c691ddfd7a49f"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "email" uuid`);
        await queryRunner.query(`DROP TABLE "school_user"`);
        await queryRunner.query(`ALTER TABLE "school" RENAME COLUMN "email" TO "directorId"`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789" FOREIGN KEY ("directorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
