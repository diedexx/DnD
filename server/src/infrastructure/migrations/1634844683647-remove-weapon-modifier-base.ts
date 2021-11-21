import {MigrationInterface, QueryRunner} from "typeorm";

export class removeWeaponModifierBase1634844683647 implements MigrationInterface {
    name = 'removeWeaponModifierBase1634844683647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` DROP COLUMN \`attackRollModifierBase\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` ADD \`attackRollModifierBase\` int NOT NULL`);
    }

}
