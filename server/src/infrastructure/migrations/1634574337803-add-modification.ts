import { MigrationInterface, QueryRunner } from "typeorm";

export class addModification1634574337803 implements MigrationInterface {
	name = "addModification1634574337803";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`sourceEquipmentId\` int NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`sourceWeaponId\` int NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`type\` enum ('Attack roll', 'Damage', 'Skill', 'Saving throw', 'Ability', 'Armor class', 'Speed', 'Initiative', 'Nothing') NOT NULL DEFAULT 'Nothing'` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`modifier\` int NOT NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`situational\` tinyint NOT NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD \`description\` varchar(255) NULL` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD CONSTRAINT \`FK_19e455fa2f6f98e41eef19f023b\` FOREIGN KEY (\`sourceEquipmentId\`) REFERENCES \`dnd\`.\`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` ADD CONSTRAINT \`FK_5ce0325c852ede7c59270d20fcd\` FOREIGN KEY (\`sourceWeaponId\`) REFERENCES \`dnd\`.\`weapon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP FOREIGN KEY \`FK_5ce0325c852ede7c59270d20fcd\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP FOREIGN KEY \`FK_19e455fa2f6f98e41eef19f023b\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`description\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`situational\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`modifier\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`type\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`sourceWeaponId\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`modification\` DROP COLUMN \`sourceEquipmentId\`` );
	}
}
