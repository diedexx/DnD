import {MigrationInterface, QueryRunner} from "typeorm";

export class extraCharacterFields1632255282481 implements MigrationInterface {
    name = 'extraCharacterFields1632255282481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`personalityTraits\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`ideals\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`bonds\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` ADD \`flaws\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`flaws\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`bonds\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`ideals\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`personalityTraits\``);
    }

}
