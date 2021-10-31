import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommand1635692823046 implements MigrationInterface {
    name = 'addCommand1635692823046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`command\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`data\` json NOT NULL, \`executedAt\` datetime NOT NULL, \`undone\` tinyint NOT NULL DEFAULT 0, \`characterId\` int NOT NULL, \`undoCommandId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`command\` ADD CONSTRAINT \`FK_f3cca12fe966d83b99646e256cb\` FOREIGN KEY (\`characterId\`) REFERENCES \`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`command\` DROP FOREIGN KEY \`FK_f3cca12fe966d83b99646e256cb\``);
        await queryRunner.query(`DROP TABLE \`command\``);
    }

}
