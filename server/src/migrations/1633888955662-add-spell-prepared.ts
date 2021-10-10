import {MigrationInterface, QueryRunner} from "typeorm";

export class addSpellPrepared1633888955662 implements MigrationInterface {
    name = 'addSpellPrepared1633888955662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`spell\` ADD \`prepared\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`spell\` DROP COLUMN \`prepared\``);
    }
}
