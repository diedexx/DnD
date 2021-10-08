import { MigrationInterface, QueryRunner } from "typeorm";

export class addCharacterModifiers1633716669572 implements MigrationInterface {
	name = "addCharacterModifiers1633716669572";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`baseArmorClass\` int NOT NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`baseInitiative\` int NOT NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` ADD \`baseSpeed\` int NOT NULL` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`baseSpeed\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`baseInitiative\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`character\` DROP COLUMN \`baseArmorClass\`` );
	}
}
