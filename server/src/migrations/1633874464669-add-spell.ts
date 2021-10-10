import {MigrationInterface, QueryRunner} from "typeorm";

export class addSpell1633874464669 implements MigrationInterface {
    name = 'addSpell1633874464669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`dnd\`.\`spell\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`spellLevel\` int NOT NULL, \`unlockLevel\` int NOT NULL, \`damage\` varchar(255) NOT NULL COMMENT 'Example: 2d8 +3 Fire', \`ownerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`spell\` ADD CONSTRAINT \`FK_c6ae1cc38522a093228b2a1b3ed\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dnd\`.\`spell\` DROP FOREIGN KEY \`FK_c6ae1cc38522a093228b2a1b3ed\``);
        await queryRunner.query(`DROP TABLE \`dnd\`.\`spell\``);
    }

}
