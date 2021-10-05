import { MigrationInterface, QueryRunner } from "typeorm";

export class addWeapons1633373433265 implements MigrationInterface {
	name = "addWeapons1633373433265";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `CREATE TABLE \`dnd\`.\`weapon\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`attackRollModifierBase\` int NOT NULL, \`damageRoll\` varchar(255) NOT NULL COMMENT 'Example: 2d8 +3 Piercing', \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`weapon\` ADD CONSTRAINT \`FK_6cf0304c2df8e5cd6dc394daf8e\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`weapon\` DROP FOREIGN KEY \`FK_6cf0304c2df8e5cd6dc394daf8e\`` );
		await queryRunner.query( `DROP TABLE \`dnd\`.\`weapon\`` );
	}
}
