import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex
  } from "typeorm";

export class createProductsTable1685435427002 implements MigrationInterface {
    name = 'createProductsTable1685435427002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'products',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
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
                name: "price",
                type: 'decimal',
                precision: 10,
                scale: 2,
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

        await queryRunner.query(`DROP INDEX \`parentIdx\` ON \`categories\``);
        await queryRunner.query(`DROP INDEX \`userIdx\` ON \`categories\``);
        // await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_products_products\` (\`categoriesId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_dcbd028e554a81deb0a89cc3e8\` (\`categoriesId\`), INDEX \`IDX_b5a4476a30f188bf0d672b985b\` (\`productsId\`), PRIMARY KEY (\`categoriesId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_176b502c5ebd6e72cafbd9d6f70\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_88cea2dc9c31951d06437879b40\` FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories_products_products\` ADD CONSTRAINT \`FK_dcbd028e554a81deb0a89cc3e8a\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`categories_products_products\` ADD CONSTRAINT \`FK_b5a4476a30f188bf0d672b985b7\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories_products_products\` DROP FOREIGN KEY \`FK_b5a4476a30f188bf0d672b985b7\``);
        await queryRunner.query(`ALTER TABLE \`categories_products_products\` DROP FOREIGN KEY \`FK_dcbd028e554a81deb0a89cc3e8a\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_88cea2dc9c31951d06437879b40\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_176b502c5ebd6e72cafbd9d6f70\``);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_b5a4476a30f188bf0d672b985b\` ON \`categories_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_dcbd028e554a81deb0a89cc3e8\` ON \`categories_products_products\``);
        await queryRunner.query(`DROP TABLE \`categories_products_products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`CREATE INDEX \`userIdx\` ON \`categories\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`parentIdx\` ON \`categories\` (\`parent_id\`)`);
    }

}
