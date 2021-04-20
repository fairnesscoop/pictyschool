import {MigrationInterface, QueryRunner} from "typeorm";

export class Classroom1618934796684 implements MigrationInterface {
    name = 'Classroom1618934796684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_e4a158e221f64fd303021454b51"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "shootingId" TO "classroomId"`);
        await queryRunner.query(`CREATE TABLE "classroom" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "shootingId" uuid NOT NULL, CONSTRAINT "PK_729f896c8b7b96ddf10c341e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "classroom" ADD CONSTRAINT "FK_43477ae183519f09a40c2fd1250" FOREIGN KEY ("shootingId") REFERENCES "shooting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_b30092abccf18923f482de41f38" FOREIGN KEY ("classroomId") REFERENCES "classroom"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_b30092abccf18923f482de41f38"`);
        await queryRunner.query(`ALTER TABLE "classroom" DROP CONSTRAINT "FK_43477ae183519f09a40c2fd1250"`);
        await queryRunner.query(`DROP TABLE "classroom"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "classroomId" TO "shootingId"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_e4a158e221f64fd303021454b51" FOREIGN KEY ("shootingId") REFERENCES "shooting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
