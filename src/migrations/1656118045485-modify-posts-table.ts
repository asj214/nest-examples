import { MigrationInterface, QueryRunner } from "typeorm"

export class modifyPostsTable1656118045485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`ALTER TABLE \`posts\` MODIFY \`user_id\` INT DEFAULT NULL AFTER \`id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD INDEX post_user (\`user_id\`);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP INDEX \`post_user\`;`);
    }

}
