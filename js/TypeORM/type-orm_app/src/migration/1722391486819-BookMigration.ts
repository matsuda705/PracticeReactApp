import { MigrationInterface, QueryRunner } from "typeorm";

export class BookMigration1722391486819 implements MigrationInterface {
    name = 'BookMigration1722391486819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` smallint UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', \`auther\` varchar(255) NOT NULL COMMENT '著者名', \`memo\` varchar(255) NOT NULL COMMENT '備考', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`books\``);
    }

}
