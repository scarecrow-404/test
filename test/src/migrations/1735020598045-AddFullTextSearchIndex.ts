import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFullTextSearchIndex1735020598045 implements MigrationInterface {
  name = 'AddFullTextSearchIndex1735020598045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_b52c850cf5f49febff2ba9d374"`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_product_translations_name_fts" ON "product_translations" USING gin(to_tsvector('english', name))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_product_translations_name_fts"`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_b52c850cf5f49febff2ba9d374" ON "product_translations" ("name")`,
    );
  }
}
