import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex
} from "typeorm";

export class createCategoriesTable1685412581922 implements MigrationInterface {
  name = 'createCategoriesTable1685412581922'
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true
          },
          {
            name: "parent_id",
            type: "int",
            default: null
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "depth",
            type: "int",
            default: 0
          },
          {
            name: "order",
            type: "int",
            default: 0
          },
          {
            name: "path",
            type: "json"
          },
          {
            name: "created_at",
            type: "datetime(6)",
            default: "CURRENT_TIMESTAMP(6)",
          },
          {
            name: "updated_at",
            type: "datetime(6)",
            default: 'CURRENT_TIMESTAMP(6)',
            onUpdate: 'CURRENT_TIMESTAMP(6)'
          },
          {
            name: "deleted_at",
            type: "datetime(6)",
            isNullable: true
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      "categories",
      new TableIndex({
        name: "parentIdx",
        columnNames: ["parent_id"],
      })
    );

    await queryRunner.createIndex(
      "categories",
      new TableIndex({
        name: "userIdx",
        columnNames: ["user_id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("categories", "parentIdx");
    await queryRunner.dropIndex("categories", "userIdx");
    await queryRunner.dropTable("categories");
  }

}
