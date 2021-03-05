import {MigrationInterface, QueryRunner} from "typeorm";

export class InitModel1601321176320 implements MigrationInterface {
    name = 'InitModel1601321176320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photographer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "apiToken" character varying, "password" character varying NOT NULL, CONSTRAINT "UQ_95c7789c68ea255f207b9bc72d0" UNIQUE ("email"), CONSTRAINT "PK_cf07cb40402ffffa6c30c77dbb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "api-token" ON "photographer" ("apiToken") `);
        await queryRunner.query(`CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying NOT NULL, "name" character varying NOT NULL, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "photographerId" uuid, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "photo_type_enum" AS ENUM('unit', 'brothers_sisters', 'group')`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "photo_type_enum" NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "schoolId" uuid NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "photoId" uuid, CONSTRAINT "REL_45401994629a09ea806521d0bc" UNIQUE ("photoId"), CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_84c841ca1c567b900a15c71ac6b" FOREIGN KEY ("photographerId") REFERENCES "photographer"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_92a92cf6e76017c70a95170a540" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_45401994629a09ea806521d0bcc" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "photographer" VALUES('c5dc7188-cdf7-4439-a936-4379a79635de', 'John', 'Doe', 'john@doe.com', '$argon2i$v=19$m=4096,t=3,p=1$u7Jw1anFWyHcpfeOxjGYuQ$Ic4YheZZK9aF81q7CW8geSiG6Bsy+f52EnKTyzBlEXE', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A')`, undefined);
        await queryRunner.query(`INSERT INTO "photographer" VALUES('2c3fe36d-aed0-4860-b5d9-267f0669e425', 'Laurent', 'Mollard', 'laurent.mollard@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$eWFMREpiVUlwOWNXN1pjZA$Rbhkx+RhYXJJZV098PEdwOVH+1DmQLjo2A', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A')`, undefined);
        await queryRunner.query(`INSERT INTO "photographer" VALUES('bb6f752c-bcc7-4120-9a3e-391a4678f890', 'Floran', 'Roisin', 'floranroisinphotographe@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$YnR3amJZQ3FMU3E4YVVLcA$6KOc+hKrF7j4QxYrNfPB9wTD/qvfobJMQA', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_45401994629a09ea806521d0bcc"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_92a92cf6e76017c70a95170a540"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_84c841ca1c567b900a15c71ac6b"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TYPE "photo_type_enum"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP INDEX "api-token"`);
        await queryRunner.query(`DROP TABLE "photographer"`);
    }

}
