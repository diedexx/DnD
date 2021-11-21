import { MigrationInterface, QueryRunner } from "typeorm";

export class addCharacterHitDice1633713525399 implements MigrationInterface {
	name = "addCharacterHitDice1633713525399";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`hitDice\` varchar(255) NOT NULL` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`hitDice\`` );
	}
}
