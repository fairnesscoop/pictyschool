import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1617110247430 implements MigrationInterface {
    name = 'Init1617110247430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "lead_status_enum" AS ENUM('private', 'public')`);
        await queryRunner.query(`CREATE TYPE "lead_type_enum" AS ENUM('kindergarten', 'primary', 'elementary', 'middle_school', 'high_school')`);
        await queryRunner.query(`CREATE TABLE "lead" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "status" "lead_status_enum" NOT NULL, "type" "lead_type_enum" NOT NULL, "phoneNumber" character varying, "numberOfStudents" integer DEFAULT 0, "numberOfClasses" integer DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "email" character varying NOT NULL, CONSTRAINT "PK_ca96c1888f7dcfccab72b72fffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "unitPrice" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('photographer', 'director')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "apiToken" character varying, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `);
        await queryRunner.query(`CREATE TYPE "school_status_enum" AS ENUM('private', 'public')`);
        await queryRunner.query(`CREATE TYPE "school_type_enum" AS ENUM('kindergarten', 'primary', 'elementary', 'middle_school', 'high_school')`);
        await queryRunner.query(`CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reference" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "zipCode" character varying NOT NULL, "city" character varying NOT NULL, "status" "school_status_enum" NOT NULL, "type" "school_type_enum" NOT NULL, "phoneNumber" character varying, "numberOfStudents" integer DEFAULT 0, "numberOfClasses" integer DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "observation" text, "pdv" TIMESTAMP, "directorId" uuid, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "photo_type_enum" AS ENUM('unit', 'brothers_sisters', 'group')`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "photo_type_enum" NOT NULL, "name" character varying NOT NULL, "path" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "schoolId" uuid NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL, "photoId" uuid, CONSTRAINT "REL_45401994629a09ea806521d0bc" UNIQUE ("photoId"), CONSTRAINT "PK_f20f028607b2603deabd8182d12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parentUnitPrice" integer NOT NULL DEFAULT 0, "photographerUnitPrice" integer NOT NULL DEFAULT 0, "schoolId" uuid NOT NULL, "productId" uuid, CONSTRAINT "PK_94ee9cff4b4e6fbd8e6131e6782" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789" FOREIGN KEY ("directorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_92a92cf6e76017c70a95170a540" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_token" ADD CONSTRAINT "FK_45401994629a09ea806521d0bcc" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_19a92ea896b8e238db58505e88f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "user" VALUES('c5dc7188-cdf7-4439-a936-4379a79635de', 'John', 'Doe', 'john@doe.com', '$argon2i$v=19$m=4096,t=3,p=1$u7Jw1anFWyHcpfeOxjGYuQ$Ic4YheZZK9aF81q7CW8geSiG6Bsy+f52EnKTyzBlEXE', '$argon2i$v=19$m=4096,t=3,p=1$slHh/xhoh8SvIjApBHSZnA$hqsry11DeWbNYsFnzADPkYOP2WQrf0yqDXGC3xjSX9A', 'photographer')`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_19a92ea896b8e238db58505e88f"`);
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e"`);
        await queryRunner.query(`ALTER TABLE "access_token" DROP CONSTRAINT "FK_45401994629a09ea806521d0bcc"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_92a92cf6e76017c70a95170a540"`);
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_bbfa0c35398b642f1e3903e9789"`);
        await queryRunner.query(`DROP TABLE "school_product"`);
        await queryRunner.query(`DROP TABLE "access_token"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TYPE "photo_type_enum"`);
        await queryRunner.query(`DROP TABLE "school"`);
        await queryRunner.query(`DROP TYPE "school_type_enum"`);
        await queryRunner.query(`DROP TYPE "school_status_enum"`);
        await queryRunner.query(`DROP INDEX "api-token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "lead"`);
        await queryRunner.query(`DROP TYPE "lead_type_enum"`);
        await queryRunner.query(`DROP TYPE "lead_status_enum"`);
    }

}
