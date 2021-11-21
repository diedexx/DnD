import {MigrationInterface, QueryRunner} from "typeorm";

export class addEquippedToWeapon1633803590498 implements MigrationInterface {
    name = 'addEquippedToWeapon1633803590498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` ADD \`equipped\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`weapon\` DROP COLUMN \`equipped\``);
    }

}
