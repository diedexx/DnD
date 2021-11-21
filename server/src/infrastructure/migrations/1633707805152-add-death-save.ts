import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeathSave1633707805152 implements MigrationInterface {
    name = 'addDeathSave1633707805152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`deathSave\` varchar(50) NOT NULL COMMENT 'The amount of successful and failed death saves formatted like success|failures (2|1)' DEFAULT '0|0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`deathSave\``);
    }
}
