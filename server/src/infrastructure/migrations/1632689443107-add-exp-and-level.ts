import { MigrationInterface, QueryRunner } from "typeorm";

export class addExpAndLevel1632689443107 implements MigrationInterface {
	name = "addExpAndLevel1632689443107";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`level\` int NOT NULL DEFAULT '1'` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`experience\` int NOT NULL DEFAULT '0'` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`experience\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`level\`` );
	}
}
