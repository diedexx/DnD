import { MigrationInterface, QueryRunner } from "typeorm";

export class addWallet1633707164253 implements MigrationInterface {
	name = "addWallet1633707164253";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `CREATE TABLE \`dnd\`.\`wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`copper\` float NOT NULL DEFAULT '0', \`silver\` float NOT NULL DEFAULT '0', \`electrum\` float NOT NULL DEFAULT '0', \`gold\` float NOT NULL DEFAULT '0', \`platinum\` float NOT NULL DEFAULT '0', \`ownerId\` int NOT NULL, UNIQUE INDEX \`REL_9bf56f7989a7e5717c92221cce\` (\`ownerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`walletId\` int NOT NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`wallet\` ADD CONSTRAINT \`FK_9bf56f7989a7e5717c92221cce0\` FOREIGN KEY (\`ownerId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`wallet\` DROP FOREIGN KEY \`FK_9bf56f7989a7e5717c92221cce0\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`walletId\`` );
		await queryRunner.query( `DROP INDEX \`REL_9bf56f7989a7e5717c92221cce\` ON \`dnd\`.\`wallet\`` );
		await queryRunner.query( `DROP TABLE \`dnd\`.\`wallet\`` );
	}
}
