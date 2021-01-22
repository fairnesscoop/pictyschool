import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolType1611322354443 implements MigrationInterface {
    name = 'SchoolType1611322354443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "school_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c8a78eeac92045e39ce56d65641" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" ADD "schoolTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_39b4fab10c36555577f9612fda6" FOREIGN KEY ("schoolTypeId") REFERENCES "school_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('033397dc-77ed-408a-91a2-1cf91acbd85d', 'Maternelle')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('ef579604-f018-480f-87d2-bfa687f370a7', 'Primaire')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('3960dbaf-f729-45ac-b5a0-0dced9a090e6', 'Élémentaire')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('9e1bfca6-7632-4d9e-a553-d8b83f744f3a', 'Collège')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('1faca28f-dc58-48b7-86b9-1204973f25ca', 'Lycée')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('bf8fd142-7732-4cd7-8ce8-7e805a16552c', 'École privée')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_39b4fab10c36555577f9612fda6"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "schoolTypeId"`);
        await queryRunner.query(`DROP TABLE "school_type"`);
    }

}
