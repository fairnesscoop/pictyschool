import {MigrationInterface, QueryRunner} from "typeorm";

export class InitPhotoSchool1616317366353 implements MigrationInterface {
    name = 'InitPhotoSchool1616317366353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "unitPrice" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c8a78eeac92045e39ce56d65641" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "phoneNumber" character varying, "numberOfStudents" integer DEFAULT 0, "numberOfClasses" integer DEFAULT 0, "observation" text, "pdv" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "schoolTypeId" uuid, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "photo_type_enum" AS ENUM('unit', 'brothers_sisters', 'group')`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "photo_type_enum" NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "schoolId" uuid NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "photoId" uuid, CONSTRAINT "REL_45401994629a09ea806521d0bc" UNIQUE ("photoId"), CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parentUnitPrice" integer NOT NULL DEFAULT 0, "photographerUnitPrice" integer NOT NULL DEFAULT 0, "schoolId" uuid NOT NULL, "productId" uuid, CONSTRAINT "PK_94ee9cff4b4e6fbd8e6131e6782" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('photographer', 'director')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "apiToken" character varying, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_39b4fab10c36555577f9612fda6" FOREIGN KEY ("schoolTypeId") REFERENCES "school_type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_92a92cf6e76017c70a95170a540" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_45401994629a09ea806521d0bcc" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_19a92ea896b8e238db58505e88f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "user" VALUES('c5dc7188-cdf7-4439-a936-4379a79635de', 'John', 'Doe', 'john@doe.com', '$argon2i$v=19$m=4096,t=3,p=1$u7Jw1anFWyHcpfeOxjGYuQ$Ic4YheZZK9aF81q7CW8geSiG6Bsy+f52EnKTyzBlEXE', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A', 'photographer')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('033397dc-77ed-408a-91a2-1cf91acbd85d', 'Maternelle')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('ef579604-f018-480f-87d2-bfa687f370a7', 'Primaire')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('3960dbaf-f729-45ac-b5a0-0dced9a090e6', 'Élémentaire')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('9e1bfca6-7632-4d9e-a553-d8b83f744f3a', 'Collège')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('1faca28f-dc58-48b7-86b9-1204973f25ca', 'Lycée')`, undefined);
        await queryRunner.query(`INSERT INTO "school_type" VALUES('bf8fd142-7732-4cd7-8ce8-7e805a16552c', 'Privée')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_19a92ea896b8e238db58505e88f"`);
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e"`);
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_45401994629a09ea806521d0bcc"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_92a92cf6e76017c70a95170a540"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_39b4fab10c36555577f9612fda6"`);
        await queryRunner.query(`DROP INDEX "api-token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "school_product"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TYPE "photo_type_enum"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TABLE "school_type"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
