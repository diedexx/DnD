import { MigrationInterface, QueryRunner } from "typeorm";

export class healthsize1632407386398 implements MigrationInterface {
    name = 'healthsize1632407386398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`health\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`health\` varchar(50) NOT NULL COMMENT 'The current and total health formatted like current/total (9/10)'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`health\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`health\` varchar(255) NOT NULL COMMENT 'The current and total health formatted like current/total (9/10)'`);
    }

}
