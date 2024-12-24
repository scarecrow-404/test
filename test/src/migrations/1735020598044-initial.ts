import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1735020598044 implements MigrationInterface {
    name = 'Initial1735020598044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_translations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "language" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, CONSTRAINT "PK_38feaa5884a6a0171d067cc9d15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b52c850cf5f49febff2ba9d374" ON "product_translations" ("name") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_translations" ADD CONSTRAINT "FK_397d78efed9161e89701dbc125d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_translations" DROP CONSTRAINT "FK_397d78efed9161e89701dbc125d"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b52c850cf5f49febff2ba9d374"`);
        await queryRunner.query(`DROP TABLE "product_translations"`);
    }

}
