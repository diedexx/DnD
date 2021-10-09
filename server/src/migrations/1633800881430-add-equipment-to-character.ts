import {MigrationInterface, QueryRunner} from "typeorm";

export class addEquipmentToCharacter1633800881430 implements MigrationInterface {
    name = 'addEquipmentToCharacter1633800881430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` ADD \`ownerId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` ADD CONSTRAINT \`FK_8c675a8a1fb7097c17e3280d1df\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` DROP FOREIGN KEY \`FK_8c675a8a1fb7097c17e3280d1df\``);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`equipment\` DROP COLUMN \`ownerId\``);
    }

}
