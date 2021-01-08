import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolProduct1610110860036 implements MigrationInterface {
    name = 'SchoolProduct1610110860036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "school_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "unitPrice" integer NOT NULL DEFAULT 0, "schoolId" uuid NOT NULL, "productId" uuid, CONSTRAINT "PK_94ee9cff4b4e6fbd8e6131e6782" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school_product" ADD CONSTRAINT "FK_19a92ea896b8e238db58505e88f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_19a92ea896b8e238db58505e88f"`);
        await queryRunner.query(`ALTER TABLE "school_product" DROP CONSTRAINT "FK_bbb74619bf321e08ac3d5ead46e"`);
        await queryRunner.query(`DROP TABLE "school_product"`);
    }

}
