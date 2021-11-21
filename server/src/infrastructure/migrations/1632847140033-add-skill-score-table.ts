import { MigrationInterface, QueryRunner } from "typeorm";

export class addSkillScoreTable1632847140033 implements MigrationInterface {
	name = "addSkillScoreTable1632847140033";

	public async up( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `CREATE TABLE \`dnd\`.\`skill_score\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`isProficient\` tinyint NOT NULL DEFAULT 0, \`skillId\` int NOT NULL, \`characterId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`skill_score\` ADD CONSTRAINT \`FK_5a6850be8498087529d776cc285\` FOREIGN KEY (\`skillId\`) REFERENCES \`dnd\`.\`skill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`skill_score\` ADD CONSTRAINT \`FK_05c73a1ea50896688c94a773108\` FOREIGN KEY (\`characterId\`) REFERENCES \`dnd\`.\`character\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION` );
	}

	public async down( queryRunner: QueryRunner ): Promise<void> {
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`skill_score\` DROP FOREIGN KEY \`FK_05c73a1ea50896688c94a773108\`` );
		await queryRunner.query( `ALTER TABLE \`dnd\`.\`skill_score\` DROP FOREIGN KEY \`FK_5a6850be8498087529d776cc285\`` );
		await queryRunner.query( `DROP TABLE \`dnd\`.\`skill_score\`` );
	}
}
