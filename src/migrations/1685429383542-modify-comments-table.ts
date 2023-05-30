import { MigrationInterface, QueryRunner } from "typeorm";

export class modifyCommentsTable1685429383542 implements MigrationInterface {
    name = 'modifyCommentsTable1685429383542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` MODIFY \`id\` int NOT NULL AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
